
from datetime import datetime
from models import db

class Contacto(db.Model):
    __tablename__ = 'contactos'

    id_contacto = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id_usuario'), nullable=False)
    asunto = db.Column(db.String(150), nullable=False)
    mensaje = db.Column(db.Text, nullable=False)
    fecha_envio = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    estado = db.Column(db.Enum('Pendiente', 'Respondido', name='estado_enum'), default='Pendiente')

    usuario = db.relationship('Usuario', backref=db.backref('contactos', lazy=True))
