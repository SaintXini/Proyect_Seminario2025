from flask import Blueprint
from app.controllers.inventory_controller import InventoryController
from app.middleware.auth_middleware import admin_required, token_required

bp = Blueprint('inventory', __name__, url_prefix='/api/inventory')


@bp.route('', methods=['GET'])
@token_required
def get_all():
    """Obtener todos los items"""
    return InventoryController.get_all()


@bp.route('', methods=['POST'])
@admin_required
def create():
    """Crear item (solo admin)"""
    return InventoryController.create()


@bp.route('/<int:item_id>', methods=['GET'])
@token_required
def get(item_id):
    """Obtener item por ID"""
    return InventoryController.get(item_id)


@bp.route('/<int:item_id>', methods=['PUT'])
@admin_required
def update(item_id):
    """Actualizar item (solo admin)"""
    return InventoryController.update(item_id)


@bp.route('/<int:item_id>', methods=['DELETE'])
@admin_required
def delete(item_id):
    """Eliminar item (solo admin)"""
    return InventoryController.delete(item_id)


@bp.route('/category/<category>', methods=['GET'])
@token_required
def get_by_category(category):
    """Obtener items por categoría"""
    return InventoryController.get_by_category(category)


@bp.route('/status/<status>', methods=['GET'])
@token_required
def get_by_status(status):
    """Obtener items por estado"""
    return InventoryController.get_by_status(status)
