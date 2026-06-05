import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Configuración base de la aplicación"""

    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

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
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=5)


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': ProductionConfig
}