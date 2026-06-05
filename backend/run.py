import os
from app import create_app, db

# Crear la aplicación
app = create_app(os.getenv('FLASK_ENV', 'production'))

# Crear tablas al iniciar (funciona con gunicorn y python run.py)
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    # Ejecutar la aplicación
    port = int(os.getenv('PORT', 5000))
    app.run(
        host=os.getenv('HOST', '0.0.0.0'),
        port=port,
        debug=os.getenv('FLASK_DEBUG', 'False') == 'True'
    )