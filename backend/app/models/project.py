from app import db
from datetime import datetime


class Project(db.Model):
    """Modelo de Proyecto"""
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    client = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), default='En progreso')  # 'En progreso', 'Completado', 'Cancelado', etc.
    progress = db.Column(db.Integer, default=0)  # 0-100
    budget = db.Column(db.Float, default=0)
    description = db.Column(db.Text)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'name': self.name,
            'client': self.client,
            'status': self.status,
            'progress': self.progress,
            'budget': self.budget,
            'description': self.description,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Project {self.name}>'
