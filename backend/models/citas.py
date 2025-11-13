from models import db  # Asumo que tienes `db = SQLAlchemy()` en tu archivo principal
from datetime import date,datetime




class usr(db.Model):
    __tablename__ = 'usr'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    correo = db.Column(db.String(255), unique=True, nullable=False)
    telefono = db.Column(db.String(15))
    tipo_usuario = db.Column(db.Enum('cliente', 'administrador', 'empleado'), nullable=False)
    contraseña = db.Column(db.String(255), nullable=False)
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)

class Servicio(db.Model):
    __tablename__ = 'serviciosusr'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    duracion = db.Column(db.Integer)
    precio = db.Column(db.Numeric(10, 2))
    descripcion = db.Column(db.Text)

class Cita(db.Model):
    __tablename__ = 'citas'
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usr.id', ondelete='CASCADE'), nullable=False)
    fecha_hora = db.Column(db.DateTime, nullable=False)
    duracion = db.Column(db.Integer)
    servicio = db.Column(db.String(255), nullable=False)
    estado = db.Column(db.Enum('pendiente', 'confirmada', 'cancelada', 'realizada'), default='pendiente')
    id_empleado = db.Column(db.Integer, db.ForeignKey('usr.id', ondelete='SET NULL'))
    usuario = db.relationship('usr', foreign_keys=[id_usuario])
    empleado = db.relationship('usr', foreign_keys=[id_empleado])

    __table_args__ = (db.UniqueConstraint('fecha_hora', 'id_empleado', name='unique_cita'),)

class Notificacion(db.Model):
    __tablename__ = 'notificaciones'
    id = db.Column(db.Integer, primary_key=True)
    id_cita = db.Column(db.Integer, db.ForeignKey('citas.id', ondelete='CASCADE'), nullable=False)
    tipo = db.Column(db.Enum('recordatorio', 'confirmacion', 'cancelacion'), nullable=False)
    fecha_envio = db.Column(db.DateTime, default=datetime.utcnow)
    mensaje = db.Column(db.Text, nullable=False)
    estado = db.Column(db.Enum('enviado', 'fallido'), default='enviado')
    cita = db.relationship('Cita')

class Log(db.Model):
    __tablename__ = 'logsusr'
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usr.id'))
    tipo_accion = db.Column(db.Enum('creación', 'modificación', 'cancelación'), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    fecha = db.Column(db.DateTime, default=datetime.utcnow)
    usuario = db.relationship('usr')
