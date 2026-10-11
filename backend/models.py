
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

db = SQLAlchemy()

class Enquiry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(150))
    phone = db.Column(db.String(20), nullable=False)
    business_type = db.Column(db.String(100), nullable=False)
    service = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(150), nullable=False)
    capacity = db.Column(db.String(50))
    message = db.Column(db.Text)
    status = db.Column(db.String(30), default="Pending")
    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )
