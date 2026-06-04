from flask import request, jsonify
from app.services.inventory_service import InventoryService


class InventoryController:
    """Controlador para inventario"""
    
    @staticmethod
    def create():
        """Crear item de inventario"""
        data = request.get_json()
        return InventoryService.create_item(data)
    
    @staticmethod
    def get_all():
        """Obtener todos los items"""
        return InventoryService.get_all_items()
    
    @staticmethod
    def get(item_id):
        """Obtener item por ID"""
        return InventoryService.get_item(item_id)
    
    @staticmethod
    def update(item_id):
        """Actualizar item"""
        data = request.get_json()
        return InventoryService.update_item(item_id, data)
    
    @staticmethod
    def delete(item_id):
        """Eliminar item"""
        return InventoryService.delete_item(item_id)
    
    @staticmethod
    def get_by_category(category):
        """Obtener items por categoría"""
        return InventoryService.get_items_by_category(category)
    
    @staticmethod
    def get_by_status(status):
        """Obtener items por estado"""
        return InventoryService.get_items_by_status(status)
