import os
import re
import threading
import time
from collections import defaultdict, deque

from flask import Flask, jsonify, request
from models import db, Enquiry
from email_notifications import send_enquiry_notification
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "sqlite:///enquiries.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

production = (
    os.environ.get("VERCEL", "").lower() in {"1", "true"}
    or os.environ.get("FLASK_ENV", "").lower() == "production"
)
if production and app.config["SQLALCHEMY_DATABASE_URI"].lower().startswith("sqlite:"):
    raise RuntimeError("A non-SQLite DATABASE_URL is required in production.")

db.init_app(app)

with app.app_context():
    db.create_all()

LOCAL_REACT_ORIGINS = {
    'http://localhost:5173',
    'http://localhost:5174',
}
RATE_LIMIT_WINDOW_SECONDS = 15 * 60
RATE_LIMIT_MAX_REQUESTS = 10
request_times = defaultdict(deque)
rate_limit_lock = threading.Lock()


@app.errorhandler(413)
def request_too_large(_error):
    return jsonify({
        'ok': False,
        'message': 'Request body is too large.',
    }), 413


def is_rate_limited(client_ip):
    now = time.monotonic()
    with rate_limit_lock:
        expired_clients = [
            ip for ip, timestamps in request_times.items()
            if not timestamps or now - timestamps[-1] >= RATE_LIMIT_WINDOW_SECONDS
        ]
        for ip in expired_clients:
            del request_times[ip]
        timestamps = request_times[client_ip]
        while timestamps and now - timestamps[0] >= RATE_LIMIT_WINDOW_SECONDS:
            timestamps.popleft()
        if len(timestamps) >= RATE_LIMIT_MAX_REQUESTS:
            return True
        timestamps.append(now)
        return False


def add_local_development_cors_headers(response):
    origin = request.headers.get('Origin')
    if request.path == '/api/enquiry' and origin in LOCAL_REACT_ORIGINS:
        response.headers['Access-Control-Allow-Origin'] = origin
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Vary'] = 'Origin'
    return response


@app.after_request
def add_local_development_cors(response):
    return add_local_development_cors_headers(response)


@app.get('/')
def home():
    return jsonify({
        'status': 'ok',
        'service': 'Power Tech Diesel Services',
        'message': 'Generator service enquiry backend is running.',
        'endpoints': [
            '/health',
            '/api/enquiry',
        ],
    })


@app.get('/health')
def health():
    return jsonify({'status': 'ok'})


@app.route('/api/enquiry', methods=['POST', 'OPTIONS'])
def enquiry():
    if request.method == 'OPTIONS':
        response = app.response_class('', status=204)
        return add_local_development_cors_headers(response)

    if is_rate_limited(request.remote_addr or 'unknown'):
        return jsonify({
            'ok': False,
            'message': 'Too many enquiries. Please try again later.',
        }), 429

    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({
            'ok': False,
            'message': 'Request body must be a JSON object.',
        }), 400

    required_fields = ['name', 'phone', 'businessType', 'service', 'location']
    missing = []
    for field in required_fields:
        value = payload.get(field)
        if not isinstance(value, str) or not value.strip():
            missing.append(field)

    if missing:
        return jsonify({
            'ok': False,
            'message': 'Missing required enquiry details.',
            'missing': missing,
        }), 400

    message_value = payload.get('message', payload.get('requirements', ''))
    field_limits = {
        'name': 100,
        'company': 150,
        'phone': 20,
        'businessType': 100,
        'service': 100,
        'location': 150,
        'capacity': 50,
        'generatorBrand': 100,
        'message': 2000,
    }
    invalid_fields = []
    for field, limit in field_limits.items():
        value = message_value if field == 'message' else payload.get(field, '')
        if not isinstance(value, str):
            invalid_fields.append(field)
        elif len(value.strip()) > limit:
            invalid_fields.append(field)

    if invalid_fields:
        return jsonify({
            'ok': False,
            'message': 'One or more enquiry fields are invalid or too long.',
            'invalid': invalid_fields,
        }), 400

    phone = payload['phone'].strip()
    if not re.fullmatch(r'[+()\d\s-]{7,20}', phone) or sum(character.isdigit() for character in phone) < 7:
        return jsonify({
            'ok': False,
            'message': 'Enter a valid contact number.',
            'invalid': ['phone'],
        }), 400

    capacity = payload.get('capacity', '').strip()
    if capacity and (
        not re.fullmatch(r'(?:\d+(?:\.\d*)?|\.\d+)', capacity)
        or float(capacity) <= 0
    ):
        return jsonify({
            'ok': False,
            'message': 'Generator capacity must be a positive number.',
            'invalid': ['capacity'],
        }), 400

    enquiry_data = {
        'name': payload['name'].strip(),
        'company': payload.get('company', '').strip(),
        'phone': phone,
        'businessType': payload['businessType'].strip(),
        'service': payload['service'].strip(),
        'location': payload['location'].strip(),
        'capacity': capacity,
        'generatorBrand': payload.get('generatorBrand', '').strip(),
        'message': message_value.strip(),
    }

    saved_message = '\n'.join(
        part for part in (
            f"Generator brand: {enquiry_data['generatorBrand']}" if enquiry_data['generatorBrand'] else '',
            enquiry_data['message'],
        ) if part
    )

    new_enquiry = Enquiry(
        name=enquiry_data['name'],
        company=enquiry_data['company'],
        phone=enquiry_data['phone'],
        business_type=enquiry_data['businessType'],
        service=enquiry_data['service'],
        location=enquiry_data['location'],
        capacity=enquiry_data['capacity'],
        message=saved_message
    )

    try:
        db.session.add(new_enquiry)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        app.logger.error("Failed to save enquiry (%s).", type(error).__name__)
        return jsonify({
            'ok': False,
            'message': 'Unable to save enquiry.'
        }), 500

    try:
        send_enquiry_notification(new_enquiry, enquiry_data['generatorBrand'])
    except Exception as error:
        app.logger.error("Enquiry email notification failed (%s).", type(error).__name__)

    return jsonify({
        'ok': True,
        'message': 'Enquiry saved successfully.',
        'enquiryId': new_enquiry.id
    }), 201



if __name__ == '__main__':
    debug = os.environ.get('FLASK_DEBUG', '').lower() == 'true' and not production
    app.run(host='127.0.0.1', port=5000, debug=debug)
