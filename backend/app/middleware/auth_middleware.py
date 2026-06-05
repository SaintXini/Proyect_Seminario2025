from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt, get_jwt_identity
from functools import wraps
from app.models.user import User
import sys


def token_required(fn):
    """Decorador para verificar que el usuario tenga un token válido"""
    @wraps(fn)
    def decorated(*args, **kwargs):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            if not user_id:
                return {'error': 'User ID not found in token'}, 401
            
            # Convertir user_id a int
            user_id = int(user_id)
            user = User.query.get(user_id)
            if not user:
                return {'error': 'Usuario no encontrado'}, 401
            if not user.is_active:
                return {'error': 'Usuario inactivo'}, 401
            
            return fn(*args, **kwargs)
        except Exception as e:
            print(f"Token validation error: {str(e)}", file=sys.stderr)
            return {'error': 'Token inválido o expirado', 'details': str(e)}, 401
    return decorated


def admin_required(fn):
    """Decorador para verificar que el usuario sea administrador"""
    @wraps(fn)
    def decorated(*args, **kwargs):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            if not user_id:
                return {'error': 'User ID not found in token'}, 401
            
            # Convertir user_id a int
            user_id = int(user_id)
            user = User.query.get(user_id)
            
            if not user:
                return {'error': 'Usuario no encontrado'}, 401
            if not user.is_active:
                return {'error': 'Usuario inactivo'}, 401
            if user.role != 'admin':
                return {'error': 'Acceso denegado. Se requiere rol de administrador'}, 403
            
            return fn(*args, **kwargs)
        except Exception as e:
            print(f"Admin validation error: {str(e)}", file=sys.stderr)
            return {'error': 'Token inválido o expirado'}, 401
    return decorated


def client_or_admin_required(fn):
    """Decorador para verificar que el usuario sea cliente o administrador"""
    @wraps(fn)
    def decorated(*args, **kwargs):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            if not user_id:
                return {'error': 'User ID not found in token'}, 401
            
            # Convertir user_id a int
            user_id = int(user_id)
            user = User.query.get(user_id)
            
            if not user:
                return {'error': 'Usuario no encontrado'}, 401
            if not user.is_active:
                return {'error': 'Usuario inactivo'}, 401
            if user.role not in ['admin', 'client']:
                return {'error': 'Acceso denegado'}, 403
            
            return fn(*args, **kwargs)
        except Exception as e:
            print(f"Client/Admin validation error: {str(e)}", file=sys.stderr)
            return {'error': 'Token inválido o expirado'}, 401
    return decorated


def role_required(required_role):
    """Decorador flexible para verificar roles específicos"""
    def decorator(fn):
        @wraps(fn)
        def decorated(*args, **kwargs):
            try:
                verify_jwt_in_request()
                user_id = get_jwt_identity()
                if not user_id:
                    return {'error': 'User ID not found in token'}, 401
                
                # Convertir user_id a int
                user_id = int(user_id)
                user = User.query.get(user_id)
                
                if not user:
                    return {'error': 'Usuario no encontrado'}, 401
                if not user.is_active:
                    return {'error': 'Usuario inactivo'}, 401
                
                if isinstance(required_role, list):
                    if user.role not in required_role:
                        return {'error': 'Acceso denegado'}, 403
                else:
                    if user.role != required_role:
                        return {'error': 'Acceso denegado'}, 403
                
                return fn(*args, **kwargs)
            except Exception as e:
                print(f"Role validation error: {str(e)}", file=sys.stderr)
                return {'error': 'Token inválido o expirado'}, 401
        return decorated
    return decorator
