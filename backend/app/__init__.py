from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from app.config import config
import os

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()


def create_app(config_name=None):
    """Factory function para crear la aplicación Flask"""
    
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'production')
    
    app = Flask(__name__)
    
    # Cargar configuración
    app.config.from_object(config.get(config_name, config['production']))
    
    # Inicializar extensiones
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app, origins="*", supports_credentials=True)
    
    # Registrar blueprints
    with app.app_context():
        from app.routes import auth_routes, project_routes, client_routes, \
                               inventory_routes, investment_routes, \
                               calendar_routes, notification_routes, \
                               finance_routes, meetings_routes, recommendation_routes
        
        app.register_blueprint(auth_routes.bp)
        app.register_blueprint(project_routes.bp)
        app.register_blueprint(client_routes.bp)
        app.register_blueprint(inventory_routes.bp)
        app.register_blueprint(investment_routes.bp)
        app.register_blueprint(calendar_routes.bp)
        app.register_blueprint(notification_routes.bp)
        app.register_blueprint(finance_routes.bp)
        app.register_blueprint(meetings_routes.bp)
        app.register_blueprint(recommendation_routes.bp)
        
        # Health check
        @app.route('/api/health', methods=['GET'])
        def health_check():
            return {'status': 'OK', 'message': 'Backend funcionando correctamente'}, 200
        
        # Crear tablas
        db.create_all()
    
    return app
