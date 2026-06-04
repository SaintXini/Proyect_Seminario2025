from flask import Blueprint
from app.controllers.project_controller import ProjectController
from app.middleware.auth_middleware import admin_required, token_required, client_or_admin_required

bp = Blueprint('projects', __name__, url_prefix='/api/projects')


@bp.route('', methods=['GET'])
@token_required
def get_all():
    """Obtener todos los proyectos"""
    return ProjectController.get_all()


@bp.route('', methods=['POST'])
@client_or_admin_required
def create():
    """Crear proyecto (admin o cliente)"""
    return ProjectController.create()


@bp.route('/<int:project_id>', methods=['GET'])
@token_required
def get(project_id):
    """Obtener proyecto por ID"""
    return ProjectController.get(project_id)


@bp.route('/<int:project_id>', methods=['PUT'])
@client_or_admin_required
def update(project_id):
    """Actualizar proyecto (admin o cliente propietario)"""
    return ProjectController.update(project_id)


@bp.route('/<int:project_id>', methods=['DELETE'])
@admin_required
def delete(project_id):
    """Eliminar proyecto (solo admin)"""
    return ProjectController.delete(project_id)


@bp.route('/client/<client_name>', methods=['GET'])
@token_required
def get_by_client(client_name):
    """Obtener proyectos de un cliente"""
    return ProjectController.get_by_client(client_name)
