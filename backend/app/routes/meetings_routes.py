from flask import Blueprint
from app.controllers.meeting_controller import MeetingController
from app.middleware.auth_middleware import admin_required, token_required

bp = Blueprint('meetings', __name__, url_prefix='/api/meetings')


@bp.route('', methods=['GET'])
@token_required
def get_all():
    """Obtener todas las reuniones"""
    return MeetingController.get_all()


@bp.route('/user/<int:user_id>', methods=['GET'])
@token_required
def get_by_user(user_id):
    """Obtener reuniones de un usuario"""
    return MeetingController.get_by_user(user_id)


@bp.route('/<int:meeting_id>', methods=['GET'])
@token_required
def get(meeting_id):
    """Obtener reunión por ID"""
    return MeetingController.get(meeting_id)


@bp.route('', methods=['POST'])
@token_required
def create():
    """Crear reunión"""
    return MeetingController.create()


@bp.route('/<int:meeting_id>', methods=['PUT'])
@token_required
def update(meeting_id):
    """Actualizar reunión"""
    return MeetingController.update(meeting_id)


@bp.route('/<int:meeting_id>', methods=['DELETE'])
@admin_required
def delete(meeting_id):
    """Eliminar reunión (solo admin)"""
    return MeetingController.delete(meeting_id)
