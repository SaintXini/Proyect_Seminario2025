from app import db
from app.models.user import User
from app.models.notification import Notification
from flask_jwt_extended import create_access_token, create_refresh_token
from datetime import datetime


class UserService:
    """Servicio para operaciones de usuario"""
    
    @staticmethod
    def register(data):
        """Registrar un nuevo usuario"""
        # Verificar si el usuario ya existe
        existing_user = User.query.filter_by(email=data.get('email')).first()
        if existing_user:
            return {'error': 'El correo ya está registrado'}, 400
        
        try:
            new_user = User(
                name=data.get('name'),
                email=data.get('email'),
                telefono=data.get('telefono'),
                company=data.get('company'),
                role=data.get('role', 'client')
            )
            new_user.set_password(data.get('password'))
            
            db.session.add(new_user)
            db.session.commit()
            
            return {'message': 'Usuario registrado exitosamente', 'user': new_user.to_dict()}, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def login(email, password):
        """Autenticar usuario"""
        user = User.query.filter_by(email=email).first()
        
        if not user or not user.check_password(password):
            return {'error': 'Credenciales inválidas'}, 401
        
        if not user.is_active:
            return {'error': 'Usuario inactivo'}, 401
        
        try:
            access_token = create_access_token(identity=str(user.id))
            refresh_token = create_refresh_token(identity=str(user.id))
            
            return {
                'message': 'Login exitoso',
                'access_token': access_token,
                'refresh_token': refresh_token,
                'user': user.to_dict()
            }, 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def refresh_access_token(user_id):
        """Crear nuevo access token usando refresh token"""
        try:
            access_token = create_access_token(identity=str(user_id))
            return {'access_token': access_token}, 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_user(user_id):
        """Obtener usuario por ID"""
        user = User.query.get(user_id)
        if not user:
            return {'error': 'Usuario no encontrado'}, 404
        return {'user': user.to_dict()}, 200
    
    @staticmethod
    def update_user(user_id, data):
        """Actualizar información del usuario"""
        user = User.query.get(user_id)
        if not user:
            return {'error': 'Usuario no encontrado'}, 404
        
        try:
            user.name = data.get('name', user.name)
            user.telefono = data.get('telefono', user.telefono)
            user.company = data.get('company', user.company)
            
            if 'password' in data and data.get('password'):
                user.set_password(data.get('password'))
            
            user.updated_at = datetime.utcnow()
            db.session.commit()
            
            return {'message': 'Usuario actualizado', 'user': user.to_dict()}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_all_users():
        """Obtener todos los usuarios"""
        try:
            users = User.query.all()
            return {'users': [u.to_dict() for u in users]}, 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def delete_user(user_id):
        """Eliminar usuario"""
        user = User.query.get(user_id)
        if not user:
            return {'error': 'Usuario no encontrado'}, 404
        
        try:
            db.session.delete(user)
            db.session.commit()
            return {'message': 'Usuario eliminado'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
