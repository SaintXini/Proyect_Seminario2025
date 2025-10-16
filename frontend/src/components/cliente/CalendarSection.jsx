import React from 'react';
import { Calendar } from 'lucide-react';
import { upcomingEvents } from './data/mockData';
import { getEventIcon } from './data/helpers';

const CalendarSection = ({ darkMode, t }) => {
  return (
    <div className={`p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
      <div className="flex items-center mb-6">
        <Calendar className="w-8 h-8 mr-3 text-blue-500" />
        <h2 className="text-3xl font-bold">{t.scheduleTracking}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'} hover:scale-105 transition-transform duration-300`}
          >
            <span className="text-4xl mb-3 block">{getEventIcon(event.type)}</span>
            <p className="font-bold mb-2">{event.title}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.date}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarSection;