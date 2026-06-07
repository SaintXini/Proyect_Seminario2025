import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()


def get_database_url():
    """Obtiene el DATABASE_URL, corrige prefijo y agrega SSL"""
    db_url = os.getenv('DATABASE_URL', '')
    
    if not db_url:
        return db_url
    
    # Fix para SQLAlchemy moderno (no acepta postgres://)
    if db_url.startswith('postgres://'):
        db_url = db_url.replace('postgres://', 'postgresql://', 1)
    
    # Agregar SSL si no está presente (aplica a Render, Supabase, etc.)
    if 'sslmode' not in db_url:
        db_url += '?sslmode=require'
    
    return db_url


class Config:
    """Configuración base de la aplicación"""

    # Database
    SQLALCHEMY_DATABASE_URI = get_database_url()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,
        'connect_args': {'sslmode': 'require'}
    }

    # Secret Key
    SECRET_KEY = os.getenv('SECRET_KEY')

    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    JWT_ALGORITHM = 'HS256'

    # Flask
    DEBUG = os.getenv('FLASK_DEBUG', 'False') == 'True'
    ENV = os.getenv('FLASK_ENV', 'production')

    # Server
    PORT = int(os.getenv('PORT', 5000))
    HOST = os.getenv('HOST', '0.0.0.0')

    @staticmethod
    def validate():
        """Valida que las variables de entorno críticas estén definidas"""
        required = ['DATABASE_URL', 'SECRET_KEY', 'JWT_SECRET_KEY']
        missing = [var for var in required if not os.getenv(var)]
        if missing:
            raise EnvironmentError(
                f"Faltan variables de entorno requeridas: {', '.join(missing)}\n"
                f"Copia .env.example a .env y completa los valores."
            )


class DevelopmentConfig(Config):
    """Configuración para desarrollo"""
    DEBUG = True
    ENV = 'development'


class ProductionConfig(Config):
    """Configuración para producción"""
    DEBUG = False
    ENV = 'production'


class TestingConfig(Config):
    """Configuración para testing"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_ENGINE_OPTIONS = {}
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=5)


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': ProductionConfig
}
