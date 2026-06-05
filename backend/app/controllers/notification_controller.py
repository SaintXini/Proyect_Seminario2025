from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from app.services.notification_service import NotificationService


class NotificationController:
    """Controlador para notificaciones"""
    
    @staticmethod
    def create():
        """Crear notificación"""
        data = request.get_json()
        return NotificationService.create_notification(data)
    
    @staticmethod
    def get_all():
        """Obtener notificaciones"""
        user_id = request.args.get('user_id', type=int)
        return NotificationService.get_notifications(user_id)
    
    @staticmethod
    def get_current_user_notifications():
        """Obtener notificaciones del usuario actual"""
        user_id = get_jwt_identity()
        return NotificationService.get_notifications(user_id)
    
    @staticmethod
    def get_unread():
        """Obtener notificaciones no leídas"""
        user_id = get_jwt_identity()
        return NotificationService.get_unread_notifications(user_id)
    
    @staticmethod
    def get(notification_id):
        """Obtener notificación por ID"""
        return NotificationService.get_notification(notification_id)
    
    @staticmethod
    def mark_as_read(notification_id):
        """Marcar notificación como leída"""
        return NotificationService.mark_as_read(notification_id)
    
    @staticmethod
    def mark_all_as_read():
        """Marcar todas como leídas"""
        user_id = get_jwt_identity()
        return NotificationService.mark_all_as_read(user_id)
    
    @staticmethod
    def delete(notification_id):
        """Eliminar notificación"""
        return NotificationService.delete_notification(notification_id)
