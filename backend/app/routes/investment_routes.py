from flask import Blueprint
from app.controllers.investment_controller import InvestmentController
from app.middleware.auth_middleware import admin_required, token_required

bp = Blueprint('investments', __name__, url_prefix='/api/investments')


@bp.route('', methods=['GET'])
@token_required
def get_all():
    """Obtener todas las inversiones"""
    return InvestmentController.get_all()


@bp.route('', methods=['POST'])
@token_required
def create():
    """Crear inversión"""
    return InvestmentController.create()


@bp.route('/<int:investment_id>', methods=['GET'])
@token_required
def get(investment_id):
    """Obtener inversión por ID"""
    return InvestmentController.get(investment_id)


@bp.route('/<int:investment_id>', methods=['PUT'])
@admin_required
def update(investment_id):
    """Actualizar inversión (solo admin)"""
    return InvestmentController.update(investment_id)


@bp.route('/<int:investment_id>', methods=['DELETE'])
@admin_required
def delete(investment_id):
    """Eliminar inversión (solo admin)"""
    return InvestmentController.delete(investment_id)


@bp.route('/priority/<priority>', methods=['GET'])
@token_required
def get_by_priority(priority):
    """Obtener inversiones por prioridad"""
    return InvestmentController.get_by_priority(priority)


@bp.route('/status/<status>', methods=['GET'])
@token_required
def get_by_status(status):
    """Obtener inversiones por estado"""
    return InvestmentController.get_by_status(status)
