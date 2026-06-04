from flask import Blueprint
from app.controllers.recommendation_controller import RecommendationController
from app.middleware.auth_middleware import admin_required, token_required

bp = Blueprint('recommendations', __name__, url_prefix='/api/recommendations')


@bp.route('', methods=['GET'])
@token_required
def get_all():
    """Obtener todas las recomendaciones"""
    return RecommendationController.get_all()


@bp.route('/active', methods=['GET'])
@token_required
def get_active():
    """Obtener recomendaciones activas"""
    return RecommendationController.get_active()


@bp.route('/<int:recommendation_id>', methods=['GET'])
@token_required
def get(recommendation_id):
    """Obtener recomendación por ID"""
    return RecommendationController.get(recommendation_id)


@bp.route('', methods=['POST'])
@admin_required
def create():
    """Crear recomendación (solo admin)"""
    return RecommendationController.create()


@bp.route('/<int:recommendation_id>', methods=['PUT'])
@admin_required
def update(recommendation_id):
    """Actualizar recomendación (solo admin)"""
    return RecommendationController.update(recommendation_id)


@bp.route('/<int:recommendation_id>', methods=['DELETE'])
@admin_required
def delete(recommendation_id):
    """Eliminar recomendación (solo admin)"""
    return RecommendationController.delete(recommendation_id)
