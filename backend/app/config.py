import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Configuración base de la aplicación"""
    
    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        'postgresql://martin:hLhe9bUCCjR6ybcPJAf6P3falLL0WI4a@dpg-d4bvc7ogjchc73d1j6eg-a.oregon-postgres.render.com/thegreatone_db_u58j'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Secret Key
    SECRET_KEY = os.getenv('SECRET_KEY', 'tu-clave-secreta-super-segura-cambiar-en-produccion')
    
    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'tu-jwt-secret-key-super-segura')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    JWT_ALGORITHM = 'HS256'
    
    # Flask
    DEBUG = os.getenv('FLASK_DEBUG', 'False') == 'True'
    ENV = os.getenv('FLASK_ENV', 'production')
    
    # Server
    PORT = int(os.getenv('PORT', 5000))
    HOST = os.getenv('HOST', '0.0.0.0')


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
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=5)


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': ProductionConfig
}
