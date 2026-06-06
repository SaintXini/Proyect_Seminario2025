from flask import request, jsonify
from app import db
from app.models.finance import Finance
from datetime import datetime
from sqlalchemy import and_


class FinanceController:
    """Controlador de Finanzas"""

    @staticmethod
    def get_all():
        """Obtener todos los registros financieros"""
        try:
            finances = Finance.query.all()
            return jsonify([f.to_dict() for f in finances]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def get_summary():
        """Obtener resumen financiero"""
        try:
            total_ingresos = db.session.query(db.func.sum(Finance.amount))\
                .filter_by(type='ingreso').scalar() or 0
            total_gastos = db.session.query(db.func.sum(Finance.amount))\
                .filter_by(type='gasto').scalar() or 0
        
            from sqlalchemy import func
            gastos_por_mes = db.session.query(
                func.to_char(Finance.date, 'YYYY-MM'),
                func.sum(Finance.amount)
            ).filter_by(type='gasto').group_by(
                func.to_char(Finance.date, 'YYYY-MM')
            ).all()
            
            ingresos_por_mes = db.session.query(
                func.to_char(Finance.date, 'YYYY-MM'),
                func.sum(Finance.amount)
            ).filter_by(type='ingreso').group_by(
                func.to_char(Finance.date, 'YYYY-MM')
            ).all()
        
            return jsonify({
                'total_ingresos': total_ingresos,
                'total_gastos': total_gastos,
                'balance': total_ingresos - total_gastos,
                'gastos_por_mes': [{'mes': m, 'total': t} for m, t in gastos_por_mes],
                'ingresos_por_mes': [{'mes': m, 'total': t} for m, t in ingresos_por_mes]
            }), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def get(finance_id):
        """Obtener registro financiero por ID"""
        try:
            finance = Finance.query.get(finance_id)
            if not finance:
                return jsonify({'error': 'No encontrado'}), 404
            return jsonify(finance.to_dict()), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def create():
        """Crear registro financiero"""
        try:
            data = request.get_json()
            if not data or not data.get('type') or not data.get('amount'):
                return jsonify({'error': 'Datos incompletos'}), 400
            
            finance = Finance(
                project_id=data.get('project_id'),
                type=data.get('type'),
                amount=data.get('amount'),
                description=data.get('description', ''),
                category=data.get('category'),
                date=datetime.fromisoformat(data['date']) if data.get('date') else datetime.utcnow()
            )
            db.session.add(finance)
            db.session.commit()
            return jsonify(finance.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def update(finance_id):
        """Actualizar registro financiero"""
        try:
            finance = Finance.query.get(finance_id)
            if not finance:
                return jsonify({'error': 'No encontrado'}), 404
            
            data = request.get_json()
            if data.get('type'):
                finance.type = data['type']
            if data.get('amount'):
                finance.amount = data['amount']
            if data.get('description'):
                finance.description = data['description']
            if data.get('category'):
                finance.category = data['category']
            if data.get('date'):
                finance.date = datetime.fromisoformat(data['date'])
            
            db.session.commit()
            return jsonify(finance.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    @staticmethod
    def delete(finance_id):
        """Eliminar registro financiero"""
        try:
            finance = Finance.query.get(finance_id)
            if not finance:
                return jsonify({'error': 'No encontrado'}), 404
            
            db.session.delete(finance)
            db.session.commit()
            return jsonify({'message': 'Eliminado correctamente'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
