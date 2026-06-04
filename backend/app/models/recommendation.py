from app import db
from datetime import datetime


class Recommendation(db.Model):
    """Modelo de Recomendaciones"""
    __tablename__ = 'recommendations'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(50), nullable=False)  # 'mejora', 'advertencia', 'sugerencia', 'alerta'
    priority = db.Column(db.String(20), default='media')  # 'alta', 'media', 'baja'
    status = db.Column(db.String(20), default='activa')  # 'activa', 'completada', 'rechazada'
    category = db.Column(db.String(50))  # 'operación', 'presupuesto', 'equipo', 'personal'
    related_entity = db.Column(db.String(100))  # 'proyecto', 'cliente', etc.
    related_id = db.Column(db.Integer)  # ID de la entidad relacionada
    icon = db.Column(db.String(50))  # nombre del icono
    action_required = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'type': self.type,
            'priority': self.priority,
            'status': self.status,
            'category': self.category,
            'related_entity': self.related_entity,
            'related_id': self.related_id,
            'icon': self.icon,
            'action_required': self.action_required,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Recommendation {self.title}>'
