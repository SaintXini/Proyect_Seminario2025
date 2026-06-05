from flask import request, jsonify
from app.services.investment_service import InvestmentService


class InvestmentController:
    """Controlador para inversiones"""
    
    @staticmethod
    def create():
        """Crear inversión"""
        data = request.get_json()
        return InvestmentService.create_investment(data)
    
    @staticmethod
    def get_all():
        """Obtener todas las inversiones"""
        return InvestmentService.get_all_investments()
    
    @staticmethod
    def get(investment_id):
        """Obtener inversión por ID"""
        return InvestmentService.get_investment(investment_id)
    
    @staticmethod
    def update(investment_id):
        """Actualizar inversión"""
        data = request.get_json()
        return InvestmentService.update_investment(investment_id, data)
    
    @staticmethod
    def delete(investment_id):
        """Eliminar inversión"""
        return InvestmentService.delete_investment(investment_id)
    
    @staticmethod
    def get_by_priority(priority):
        """Obtener inversiones por prioridad"""
        return InvestmentService.get_investments_by_priority(priority)
    
    @staticmethod
    def get_by_status(status):
        """Obtener inversiones por estado"""
        return InvestmentService.get_investments_by_status(status)
