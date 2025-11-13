
from models import db
class Paquete(db.Model):
    __tablename__ = 'paquetes'

    id_paquete = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    precio = db.Column(db.Numeric(10, 2), nullable=False)
    duracion = db.Column(db.Integer, nullable=False)  # duración en horas o días
    estado = db.Column(db.Enum('Activo', 'Inactivo'), default='Activo')
