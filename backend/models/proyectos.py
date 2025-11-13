
from models import db

class Proyecto(db.Model):
    __tablename__ = 'proyectos'

    id_proyecto = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(150), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    fecha = db.Column(db.Date, nullable=False)
    id_categoria = db.Column(db.Integer, db.ForeignKey('categorias_portafolio.id_categoria'), nullable=False)
    url_media = db.Column(db.String(255), nullable=True)

    categoria = db.relationship('CategoriaPortafolio', backref=db.backref('proyectos', lazy=True))
