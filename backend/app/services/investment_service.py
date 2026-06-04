from app import db
from app.models.investment import Investment
from datetime import datetime


class InvestmentService:
    """Servicio para operaciones de inversión"""
    
    @staticmethod
    def create_investment(data):
        """Crear nueva solicitud de inversión"""
        try:
            new_investment = Investment(
                item=data.get('item'),
                priority=data.get('priority', 'Media'),
                estimated=data.get('estimated', 0),
                notes=data.get('notes'),
                status=data.get('status', 'Pendiente')
            )
            db.session.add(new_investment)
            db.session.commit()
            return {'message': 'Inversión creada', 'investment': new_investment.to_dict()}, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_all_investments():
        """Obtener todas las inversiones"""
        try:
            investments = Investment.query.all()
            return {'investments': [i.to_dict() for i in investments]}, 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_investment(investment_id):
        """Obtener inversión por ID"""
        investment = Investment.query.get(investment_id)
        if not investment:
            return {'error': 'Inversión no encontrada'}, 404
        return {'investment': investment.to_dict()}, 200
    
    @staticmethod
    def update_investment(investment_id, data):
        """Actualizar inversión"""
        investment = Investment.query.get(investment_id)
        if not investment:
            return {'error': 'Inversión no encontrada'}, 404
        
        try:
            investment.item = data.get('item', investment.item)
            investment.priority = data.get('priority', investment.priority)
            investment.estimated = data.get('estimated', investment.estimated)
            investment.notes = data.get('notes', investment.notes)
            investment.status = data.get('status', investment.status)
            
            investment.updated_at = datetime.utcnow()
            db.session.commit()
            
            return {'message': 'Inversión actualizada', 'investment': investment.to_dict()}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def delete_investment(investment_id):
        """Eliminar inversión"""
        investment = Investment.query.get(investment_id)
        if not investment:
            return {'error': 'Inversión no encontrada'}, 404
        
        try:
            db.session.delete(investment)
            db.session.commit()
            return {'message': 'Inversión eliminada'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_investments_by_priority(priority):
        """Obtener inversiones por prioridad"""
        try:
            investments = Investment.query.filter_by(priority=priority).all()
            return {'investments': [i.to_dict() for i in investments]}, 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @staticmethod
    def get_investments_by_status(status):
        """Obtener inversiones por estado"""
        try:
            investments = Investment.query.filter_by(status=status).all()
            return {'investments': [i.to_dict() for i in investments]}, 200
        except Exception as e:
            return {'error': str(e)}, 500
