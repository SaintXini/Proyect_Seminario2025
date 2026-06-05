from flask import Blueprint
from app.controllers.finance_controller import FinanceController
from app.middleware.auth_middleware import admin_required, token_required

bp = Blueprint('finance', __name__, url_prefix='/api/finance')


@bp.route('', methods=['GET'])
@token_required
def get_all():
    """Obtener todos los registros financieros"""
    return FinanceController.get_all()


@bp.route('/summary', methods=['GET'])
@token_required
def get_summary():
    """Obtener resumen financiero"""
    return FinanceController.get_summary()


@bp.route('/<int:finance_id>', methods=['GET'])
@token_required
def get(finance_id):
    """Obtener registro financiero por ID"""
    return FinanceController.get(finance_id)


@bp.route('', methods=['POST'])
@admin_required
def create():
    """Crear registro financiero (solo admin)"""
    return FinanceController.create()


@bp.route('/<int:finance_id>', methods=['PUT'])
@admin_required
def update(finance_id):
    """Actualizar registro financiero (solo admin)"""
    return FinanceController.update(finance_id)


@bp.route('/<int:finance_id>', methods=['DELETE'])
@admin_required
def delete(finance_id):
    """Eliminar registro financiero (solo admin)"""
    return FinanceController.delete(finance_id)
