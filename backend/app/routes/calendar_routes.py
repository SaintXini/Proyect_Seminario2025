from flask import Blueprint
from app.controllers.calendar_controller import CalendarController
from app.middleware.auth_middleware import admin_required, token_required

bp = Blueprint('calendar', __name__, url_prefix='/api/calendar/events')


@bp.route('', methods=['GET'])
@token_required
def get_all():
    """Obtener eventos de calendario"""
    return CalendarController.get_all()


@bp.route('', methods=['POST'])
@admin_required
def create():
    """Crear evento (solo admin)"""
    return CalendarController.create()


@bp.route('/<int:event_id>', methods=['GET'])
@token_required
def get(event_id):
    """Obtener evento por ID"""
    return CalendarController.get(event_id)


@bp.route('/<int:event_id>', methods=['PUT'])
@admin_required
def update(event_id):
    """Actualizar evento (solo admin)"""
    return CalendarController.update(event_id)


@bp.route('/<int:event_id>', methods=['DELETE'])
@admin_required
def delete(event_id):
    """Eliminar evento (solo admin)"""
    return CalendarController.delete(event_id)
