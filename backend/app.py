from flask import Flask, jsonify, request

import os
from models import db, Enquiry


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "sqlite:///enquiries.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()
LOCAL_REACT_ORIGIN = 'http://localhost:5173'
@app.after_request
def add_local_development_cors(response):
    origin = request.headers.get('Origin')
    if request.path == '/api/enquiry' and origin == LOCAL_REACT_ORIGIN:
        response.headers['Access-Control-Allow-Origin'] = LOCAL_REACT_ORIGIN
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Vary'] = 'Origin'
    return response


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
        return '', 204

    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({
            'ok': False,
            'message': 'Request body must be a JSON object.',
        }), 400

    required_fields = ['name', 'phone', 'businessType', 'service', 'location']
    missing = []
    for field in required_fields:
        value = payload.get(field, '')
        if not isinstance(value, str):
            value = str(value or '')
        if not value.strip():
            missing.append(field)

    if missing:
        return jsonify({
            'ok': False,
            'message': 'Missing required enquiry details.',
            'missing': missing,
        }), 400

    enquiry_data = {
        'name': str(payload.get('name', '')).strip(),
        'company': str(payload.get('company', '')).strip(),
        'phone': str(payload.get('phone', '')).strip(),
        'businessType': str(payload.get('businessType', '')).strip(),
        'service': str(payload.get('service', '')).strip(),
        'location': str(payload.get('location', '')).strip(),
        'capacity': str(payload.get('capacity', '')).strip(),
        'message': str(payload.get('message', payload.get('requirements', ''))).strip(),
    }

    
    new_enquiry = Enquiry(
        name=enquiry_data['name'],
        company=enquiry_data['company'],
        phone=enquiry_data['phone'],
        business_type=enquiry_data['businessType'],
        service=enquiry_data['service'],
        location=enquiry_data['location'],
        capacity=enquiry_data['capacity'],
        message=enquiry_data['message']
    )

    try:
        db.session.add(new_enquiry)
        db.session.commit()
    except Exception:
        db.session.rollback()
        app.logger.exception("Failed to save enquiry")
        return jsonify({
            'ok': False,
            'message': 'Unable to save enquiry.'
        }), 500

    return jsonify({
        'ok': True,
        'message': 'Enquiry saved successfully.',
        'enquiryId': new_enquiry.id
    }), 201



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
