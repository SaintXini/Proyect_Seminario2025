from app import db
from app.models.notification import Notification
from datetime import datetime


class NotificationService:
    """Servicio para operaciones de notificaciones"""
    
    @staticmethod
    def create_notification(data):
        """Crear notificación"""
        try:
            new_notification = Notification(
                user_id=data.get('user_id'),
                message=data.get('message'),
                notification_type=data.get('type', 'info'),
                link=data.get('link'),
                is_read=data.get('is_read', False)
            )
            db.session.add(new_notification)
            db.session.commit()
            return {'message': 'Notificación creada', 'notification': new_notification.to_dict()}, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_notifications(user_id=None):
        """Obtener notificaciones"""
        try:
            query = Notification.query
            
            if user_id:
                query = query.filter_by(user_id=user_id)
            
            notifications = query.order_by(Notification.created_at.desc()).all()
            return {'notifications': [n.to_dict() for n in notifications]}, 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_unread_notifications(user_id):
        """Obtener notificaciones no leídas"""
        try:
            notifications = Notification.query.filter_by(user_id=user_id, is_read=False).all()
            return {'notifications': [n.to_dict() for n in notifications]}, 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_notification(notification_id):
        """Obtener notificación por ID"""
        notification = Notification.query.get(notification_id)
        if not notification:
            return {'error': 'Notificación no encontrada'}, 404
        return {'notification': notification.to_dict()}, 200
    
    @staticmethod
    def mark_as_read(notification_id):
        """Marcar notificación como leída"""
        notification = Notification.query.get(notification_id)
        if not notification:
            return {'error': 'Notificación no encontrada'}, 404
        
        try:
            notification.is_read = True
            db.session.commit()
            return {'message': 'Notificación marcada como leída', 'notification': notification.to_dict()}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def mark_all_as_read(user_id):
        """Marcar todas las notificaciones de un usuario como leídas"""
        try:
            Notification.query.filter_by(user_id=user_id, is_read=False).update({'is_read': True})
            db.session.commit()
            return {'message': 'Todas las notificaciones marcadas como leídas'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def delete_notification(notification_id):
        """Eliminar notificación"""
        notification = Notification.query.get(notification_id)
        if not notification:
            return {'error': 'Notificación no encontrada'}, 404
        
        try:
            db.session.delete(notification)
            db.session.commit()
            return {'message': 'Notificación eliminada'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
