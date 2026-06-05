from flask import Blueprint
from app.controllers.client_controller import ClientController
from app.middleware.auth_middleware import admin_required, token_required

bp = Blueprint('clients', __name__, url_prefix='/api/clients')


@bp.route('', methods=['GET'])
@token_required
def get_all():
    """Obtener todos los clientes"""
    return ClientController.get_all()


@bp.route('', methods=['POST'])
@admin_required
def create():
    """Crear cliente (solo admin)"""
    return ClientController.create()


@bp.route('/<int:client_id>', methods=['GET'])
@token_required
def get(client_id):
    """Obtener cliente por ID"""
    return ClientController.get(client_id)


@bp.route('/<int:client_id>', methods=['PUT'])
@admin_required
def update(client_id):
    """Actualizar cliente (solo admin)"""
    return ClientController.update(client_id)


@bp.route('/<int:client_id>', methods=['DELETE'])
@admin_required
def delete(client_id):
    """Eliminar cliente (solo admin)"""
    return ClientController.delete(client_id)
