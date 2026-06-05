from app import db
from datetime import datetime


class Finance(db.Model):
    """Modelo de Finanzas - Ingresos y Gastos"""
    __tablename__ = 'finances'
    
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    type = db.Column(db.String(20), nullable=False)  # 'ingreso', 'gasto', 'presupuesto'
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50))  # 'producción', 'equipo', 'personal', etc.
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'project_id': self.project_id,
            'type': self.type,
            'amount': self.amount,
            'description': self.description,
            'category': self.category,
            'date': self.date.isoformat() if self.date else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Finance {self.type} - Q{self.amount}>'
