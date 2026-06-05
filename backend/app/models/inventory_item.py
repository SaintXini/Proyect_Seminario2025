from app import db
from datetime import datetime


class InventoryItem(db.Model):
    """Modelo de Item de Inventario"""
    __tablename__ = 'inventory_items'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(100))  # 'Cámaras', 'Iluminación', 'Audio', 'Accesorios', 'Consumibles'
    status = db.Column(db.String(50), default='Disponible')  # 'Disponible', 'En uso', 'Mantenimiento', 'Stock bajo'
    quantity = db.Column(db.Integer, default=1)
    borrower = db.Column(db.String(100))  # Quién está usando el item
    last_maintenance = db.Column(db.DateTime)
    expected_return = db.Column(db.DateTime)  # Cuándo se espera que se devuelva
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convertir a diccionario"""
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'status': self.status,
            'quantity': self.quantity,
            'borrower': self.borrower,
            'lastMaintenance': self.last_maintenance.isoformat() if self.last_maintenance else None,
            'expectedReturn': self.expected_return.isoformat() if self.expected_return else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<InventoryItem {self.name}>'
