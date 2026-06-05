from app import db
from app.models.inventory_item import InventoryItem
from datetime import datetime


class InventoryService:
    """Servicio para operaciones de inventario"""
    
    @staticmethod
    def create_item(data):
        """Crear nuevo item de inventario"""
        try:
            new_item = InventoryItem(
                name=data.get('name'),
                category=data.get('category'),
                status=data.get('status', 'Disponible'),
                quantity=data.get('quantity', 1),
                borrower=data.get('borrower'),
                last_maintenance=datetime.fromisoformat(data['lastMaintenance']) if 'lastMaintenance' in data else None,
                expected_return=datetime.fromisoformat(data['expectedReturn']) if 'expectedReturn' in data else None
            )
            db.session.add(new_item)
            db.session.commit()
            return {'message': 'Item creado', 'item': new_item.to_dict()}, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_all_items():
        """Obtener todos los items"""
        try:
            items = InventoryItem.query.all()
            return {'items': [i.to_dict() for i in items]}, 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_item(item_id):
        """Obtener item por ID"""
        item = InventoryItem.query.get(item_id)
        if not item:
            return {'error': 'Item no encontrado'}, 404
        return {'item': item.to_dict()}, 200
    
    @staticmethod
    def update_item(item_id, data):
        """Actualizar item"""
        item = InventoryItem.query.get(item_id)
        if not item:
            return {'error': 'Item no encontrado'}, 404
        
        try:
            item.name = data.get('name', item.name)
            item.category = data.get('category', item.category)
            item.status = data.get('status', item.status)
            item.quantity = data.get('quantity', item.quantity)
            item.borrower = data.get('borrower', item.borrower)
            
            if 'lastMaintenance' in data:
                item.last_maintenance = datetime.fromisoformat(data['lastMaintenance']) if data['lastMaintenance'] else None
            if 'expectedReturn' in data:
                item.expected_return = datetime.fromisoformat(data['expectedReturn']) if data['expectedReturn'] else None
            
            item.updated_at = datetime.utcnow()
            db.session.commit()
            
            return {'message': 'Item actualizado', 'item': item.to_dict()}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def delete_item(item_id):
        """Eliminar item"""
        item = InventoryItem.query.get(item_id)
        if not item:
            return {'error': 'Item no encontrado'}, 404
        
        try:
            db.session.delete(item)
            db.session.commit()
            return {'message': 'Item eliminado'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_items_by_category(category):
        """Obtener items por categoría"""
        try:
            items = InventoryItem.query.filter_by(category=category).all()
            return {'items': [i.to_dict() for i in items]}, 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_items_by_status(status):
        """Obtener items por estado"""
        try:
            items = InventoryItem.query.filter_by(status=status).all()
            return {'items': [i.to_dict() for i in items]}, 200
        except Exception as e:
            return {'error': str(e)}, 500
