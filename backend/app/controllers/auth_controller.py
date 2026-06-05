from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity, create_access_token, decode_token
from app.services.user_service import UserService


class AuthController:
    """Controlador para autenticación"""
    
    @staticmethod
    def register():
        """Registrar nuevo usuario"""
        data = request.get_json()
        return UserService.register(data)
    
    @staticmethod
    def login():
        """Autenticar usuario"""
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        return UserService.login(email, password)
    
    @staticmethod
    def refresh():
        """Renovar access token"""
        from flask import request
        from flask_jwt_extended import decode_token
        import os
        
        # Obtener el token del header
        token = None
        if request.headers.get('Authorization'):
            token = request.headers.get('Authorization').split(' ')[1]
        
        if not token:
            return {'error': 'No token provided'}, 401
        
        try:
            # Decodificar el refresh token
            jwt_secret = os.getenv('JWT_SECRET_KEY', 'tu-jwt-secret-key-super-segura')
            decoded = decode_token(token, allow_expired=False)
            user_id = decoded.get('sub')
            
            if not user_id:
                return {'error': 'Invalid token'}, 401
            
            # Crear nuevo access token
            access_token = create_access_token(identity=str(user_id))
            return {'access_token': access_token}, 200
        except Exception as e:
            return {'error': f'Token inválido: {str(e)}'}, 401
    
    @staticmethod
    def get_current_user():
        """Obtener usuario actual"""
        user_id = get_jwt_identity()
        return UserService.get_user(user_id)
    
    @staticmethod
    def update_profile():
        """Actualizar perfil del usuario"""
        user_id = get_jwt_identity()
        data = request.get_json()
        return UserService.update_user(user_id, data)
