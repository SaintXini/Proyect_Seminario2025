// src/components/admin/CalendarView.jsx
import React from 'react';
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getDaysInMonth, getEventColor, getMonthNames, getDayNames } from './helpers';

export const CalendarView = ({
  darkMode,
  t,
  currentMonth,
  setCurrentMonth,
  activeCalendar,
  setActiveCalendar,
  clientEvents,
  companyEvents,
  setShowModal,
  setModalType,
  setEditingItem,
  setFormData,
  onDeleteCalendarEvent
}) => {
  const currentEvents = activeCalendar === 'clients' ? clientEvents : companyEvents;
  const eventType = activeCalendar === 'clients' ? 'clientEvent' : 'companyEvent';

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthNames = getMonthNames(t);
  const dayNames = getDayNames(t);

  const openModal = (event = null) => {
    setModalType(eventType);
    setEditingItem(event);
    setFormData(event || {});
    setShowModal(true);
  };

  const getEventsForDay = (day) => {
    return currentEvents.filter(event => event.date === day);
  };

  const changeMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t.productionSchedule}
        </h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500"
        >
          <Plus className="w-5 h-5" />
          {t.addNew}
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setActiveCalendar('clients')}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
            activeCalendar === 'clients'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : darkMode
              ? 'bg-white/5 text-gray-400 hover:bg-white/10'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t.clientCalendar}
        </button>
        <button
          onClick={() => setActiveCalendar('company')}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
            activeCalendar === 'company'
              ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white'
              : darkMode
              ? 'bg-white/5 text-gray-400 hover:bg-white/10'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t.companyCalendar}
        </button>
      </div>

      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => changeMonth(-1)}
              className={`p-2 rounded-xl transition-all ${
                darkMode
                  ? 'bg-white/5 hover:bg-white/10 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => changeMonth(1)}
              className={`p-2 rounded-xl transition-all ${
                darkMode
                  ? 'bg-white/5 hover:bg-white/10 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map(day => (
            <div key={day} className={`text-center text-sm font-semibold py-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dayEvents = getEventsForDay(day);
            const isToday =
              day === new Date().getDate() &&
              currentMonth.getMonth() === new Date().getMonth() &&
              currentMonth.getFullYear() === new Date().getFullYear();

            return (
              <div
                key={day}
                className={`min-h-32 p-2 rounded-xl border-2 transition-all ${
                  isToday
                    ? darkMode
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-blue-500 bg-blue-50'
                    : darkMode
                    ? 'border-white/10 bg-white/5 hover:bg-white/10'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`text-sm font-semibold mb-1 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {day}
                </div>
                <div className="space-y-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded border-l-2 ${getEventColor(event.type, darkMode)} cursor-pointer group relative`}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="absolute hidden group-hover:flex gap-1 top-0 right-0 z-10">
                        <button
                          onClick={() => openModal(event)}
                          className="p-1 bg-blue-500 rounded text-white"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onDeleteCalendarEvent(event.id)}
                          className="p-1 bg-red-500 rounded text-white"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Producción</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.maintenance}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Entrega</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Reunión</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Capacitación</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Planificación</span>
          </div>
        </div>
      </div>
    </div>
  );
};