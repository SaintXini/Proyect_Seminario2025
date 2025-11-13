
from datetime import datetime
from models import db

class Finanza(db.Model):
    __tablename__ = 'finanzas'

    id_finanza = db.Column(db.Integer, primary_key=True)
    id_contratacion = db.Column(db.Integer, db.ForeignKey('contrataciones.id_contratacion'), nullable=False)
    monto = db.Column(db.Numeric(10, 2), nullable=False)
    tipo = db.Column(db.Enum('Ingreso', 'Egreso', name='tipo_enum'), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    contratacion = db.relationship('Contratacion', backref=db.backref('finanzas', lazy=True))
