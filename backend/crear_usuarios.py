from werkzeug.security import generate_password_hash
from app import db, User, app

def create_default_users():
    with app.app_context():

        # Crear admin si no existe
        if not User.query.filter_by(email='admin@admin.com').first():
            admin = User(
                name='Administrador',
                email='admin@admin.com',
                password=generate_password_hash('admin123'),
                telefono='00000000',
                company='TheGreatOne',
                rol='admin'
            )
            db.session.add(admin)
            db.session.commit()
            print("✔ Admin creado: admin@admin.com / admin123")
        else:
            print("✔ Admin ya existe")

        # Crear cliente si no existe
        if not User.query.filter_by(email='cliente@correo.com').first():
            client = User(
                name='Cliente Demo',
                email='cliente@correo.com',
                password=generate_password_hash('cliente123'),
                telefono='12345678',
                company='Empresa Cliente',
                rol='client'
            )
            db.session.add(client)
            db.session.commit()
            print("✔ Cliente creado: cliente@correo.com / cliente123")
        else:
            print("✔ Cliente ya existe")


if __name__ == "__main__":
    create_default_users()
