from app import db
from datetime import datetime


class Meeting(db.Model):
    """Modelo de Reuniones"""
    __tablename__ = 'meetings'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    admin_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    meeting_date = db.Column(db.DateTime, nullable=False)
    duration_minutes = db.Column(db.Integer, default=60)  # Duración en minutos
    status = db.Column(db.String(20), default='pendiente')  # 'pendiente', 'confirmada', 'cancelada', 'completada'
    meeting_type = db.Column(db.String(50))  # 'reunión', 'revisión', 'seguimiento', etc.
    location = db.Column(db.String(200))  # Lugar o plataforma
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    client = db.relationship('User', foreign_keys=[client_id])
    admin = db.relationship('User', foreign_keys=[admin_id])
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'client_id': self.client_id,
            'client_name': self.client.name if self.client else None,
            'admin_id': self.admin_id,
            'admin_name': self.admin.name if self.admin else None,
            'meeting_date': self.meeting_date.isoformat() if self.meeting_date else None,
            'duration_minutes': self.duration_minutes,
            'status': self.status,
            'meeting_type': self.meeting_type,
            'location': self.location,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Meeting {self.title} - {self.meeting_date}>'
