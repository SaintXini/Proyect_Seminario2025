from app import db
from datetime import datetime


class CalendarEvent(db.Model):
    """Modelo de Evento de Calendario"""
    __tablename__ = 'calendar_events'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    date = db.Column(db.Integer, nullable=False)  # Día del mes (1-31)
    month = db.Column(db.Integer, nullable=False)  # Mes (1-12)
    year = db.Column(db.Integer, nullable=False)  # Año (YYYY)
    event_type = db.Column(db.String(50), default='production')  # 'production', 'recording', 'meeting', 'deadline', 'training', 'maintenance', 'planning'
    calendar_type = db.Column(db.String(20), nullable=False)  # 'clients' o 'company'
    client = db.Column(db.String(100))  # Cliente asociado (si aplica)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'title': self.title,
            'date': self.date,
            'month': self.month,
            'year': self.year,
            'type': self.event_type,
            'calendar_type': self.calendar_type,
            'client': self.client,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<CalendarEvent {self.title}>'
