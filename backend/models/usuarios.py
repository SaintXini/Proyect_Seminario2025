

from models import db
class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    correo = db.Column(db.String(150), unique=True, nullable=False)
    telefono = db.Column(db.String(20))
    rol = db.Column(db.Enum('Administrador', 'Cliente', 'Empleado'), default='Cliente')
    password = db.Column(db.String(255), nullable=False)
    estado = db.Column(db.Enum('Activo', 'Inactivo'), default='Activo')
    fecha_registro = db.Column(db.DateTime)

    def __repr__(self):
        return f'<Usuario {self.nombre}>'
