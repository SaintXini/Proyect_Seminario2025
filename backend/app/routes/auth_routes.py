from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.controllers.auth_controller import AuthController
from app.middleware.auth_middleware import token_required

bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/register', methods=['POST'])
def register():
    """Registro de usuario"""
    return AuthController.register()


@bp.route('/login', methods=['POST'])
def login():
    """Login de usuario"""
    return AuthController.login()


@bp.route('/refresh', methods=['POST'])
def refresh():
    """Renovar access token"""
    return AuthController.refresh()


@bp.route('/me', methods=['GET'])
@token_required
def get_current_user():
    """Obtener usuario actual"""
    return AuthController.get_current_user()


@bp.route('/profile', methods=['PUT'])
@token_required
def update_profile():
    """Actualizar perfil"""
    return AuthController.update_profile()
