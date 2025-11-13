from models import db


class CategoriaPortafolio(db.Model):
    __tablename__ = 'categorias_portafolio'

    id_categoria = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
