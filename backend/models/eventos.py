
from datetime import datetime
from models import db

class Evento(db.Model):
    __tablename__ = 'eventos'

    id_evento = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(150), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    fecha_inicio = db.Column(db.DateTime, nullable=False)
    fecha_fin = db.Column(db.DateTime, nullable=False)
    ubicacion = db.Column(db.String(200), nullable=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id_usuario'), nullable=False)

    usuario = db.relationship('Usuario', backref=db.backref('eventos', lazy=True))
