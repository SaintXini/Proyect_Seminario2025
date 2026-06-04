from app import db
from datetime import datetime


class Notification(db.Model):
    """Modelo de Notificación"""
    __tablename__ = 'notifications'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String(500), nullable=False)
    notification_type = db.Column(db.String(50), default='info')  # 'info', 'warning', 'error', 'success'
    is_read = db.Column(db.Boolean, default=False)
    link = db.Column(db.String(200))  # URL relacionada (opcional)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'message': self.message,
            'type': self.notification_type,
            'is_read': self.is_read,
            'link': self.link,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Notification {self.id}>'
