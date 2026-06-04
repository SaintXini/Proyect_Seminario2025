from flask import Blueprint
from app.controllers.notification_controller import NotificationController
from app.middleware.auth_middleware import admin_required, token_required

bp = Blueprint('notifications', __name__, url_prefix='/api/notifications')


@bp.route('', methods=['GET'])
@token_required
def get_all():
    """Obtener notificaciones"""
    return NotificationController.get_all()


@bp.route('', methods=['POST'])
@admin_required
def create():
    """Crear notificación (solo admin)"""
    return NotificationController.create()


@bp.route('/me', methods=['GET'])
@token_required
def get_current_user_notifications():
    """Obtener notificaciones del usuario actual"""
    return NotificationController.get_current_user_notifications()


@bp.route('/me/unread', methods=['GET'])
@token_required
def get_unread():
    """Obtener notificaciones no leídas"""
    return NotificationController.get_unread()


@bp.route('/<int:notification_id>', methods=['GET'])
@token_required
def get(notification_id):
    """Obtener notificación por ID"""
    return NotificationController.get(notification_id)


@bp.route('/<int:notification_id>/read', methods=['PUT'])
@token_required
def mark_as_read(notification_id):
    """Marcar notificación como leída"""
    return NotificationController.mark_as_read(notification_id)


@bp.route('/mark-all-read', methods=['PUT'])
@token_required
def mark_all_as_read():
    """Marcar todas como leídas"""
    return NotificationController.mark_all_as_read()


@bp.route('/<int:notification_id>', methods=['DELETE'])
@token_required
def delete(notification_id):
    """Eliminar notificación"""
    return NotificationController.delete(notification_id)
