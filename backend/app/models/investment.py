from app import db
from datetime import datetime


class Investment(db.Model):
    """Modelo de Inversión/Solicitud de Equipo"""
    __tablename__ = 'investments'
    
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(200), nullable=False)
    priority = db.Column(db.String(20), default='Media')  # 'Alta', 'Media', 'Baja'
    estimated = db.Column(db.Float, default=0)  # Presupuesto estimado
    notes = db.Column(db.Text)
    status = db.Column(db.String(20), default='Pendiente')  # 'Pendiente', 'Aprobada', 'Rechazada', 'Completada'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'item': self.item,
            'priority': self.priority,
            'estimated': self.estimated,
            'notes': self.notes,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Investment {self.item}>'
