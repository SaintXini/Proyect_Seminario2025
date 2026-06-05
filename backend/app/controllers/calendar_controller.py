from flask import request, jsonify
from app.services.calendar_service import CalendarService


class CalendarController:
    """Controlador para calendario"""
    
    @staticmethod
    def create():
        """Crear evento de calendario"""
        data = request.get_json()
        return CalendarService.create_event(data)
    
    @staticmethod
    def get_all():
        """Obtener eventos de calendario"""
        calendar_type = request.args.get('type')
        month = request.args.get('month', type=int)
        year = request.args.get('year', type=int)
        events, status = CalendarService.get_events(calendar_type, month, year)
        return jsonify(events), status
    
    @staticmethod
    def get(event_id):
        """Obtener evento por ID"""
        return CalendarService.get_event(event_id)
    
    @staticmethod
    def update(event_id):
        """Actualizar evento"""
        data = request.get_json()
        return CalendarService.update_event(event_id, data)
    
    @staticmethod
    def delete(event_id):
        """Eliminar evento"""
        return CalendarService.delete_event(event_id)
