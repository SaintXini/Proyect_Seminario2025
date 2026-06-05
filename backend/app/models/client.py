from app import db
from datetime import datetime


class Client(db.Model):
    """Modelo de Cliente"""
    __tablename__ = 'clients'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    contact = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    phone = db.Column(db.String(20))
    status = db.Column(db.String(20), default='Activo')  # 'Activo', 'Inactivo'
    since = db.Column(db.String(20))  # 'YYYY-MM' formato
    projects_count = db.Column(db.Integer, default=0)
    total_budget = db.Column(db.Float, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'name': self.name,
            'contact': self.contact,
            'email': self.email,
            'phone': self.phone,
            'status': self.status,
            'since': self.since,
            'projectsCount': self.projects_count,
            'totalBudget': self.total_budget,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Client {self.name}>'
