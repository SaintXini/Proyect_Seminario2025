import React from 'react';
import { MessageSquare, Calendar, CheckCircle, Send } from 'lucide-react';

const MeetingsSection = ({ darkMode, language, t }) => {
  return (
    <div className="space-y-6">
      <div className={`p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="flex items-center mb-6">
          <MessageSquare className="w-8 h-8 mr-3 text-green-500" />
          <h2 className="text-3xl font-bold">{t.meetingsCommunication}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} transition-colors text-left`}>
            <Calendar className="w-8 h-8 mb-3 text-blue-500" />
            <h3 className="font-bold text-lg mb-2">{t.scheduleMeeting}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.proposeDatetime}
            </p>
          </button>
          
          <button className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} transition-colors text-left`}>
            <CheckCircle className="w-8 h-8 mb-3 text-green-500" />
            <h3 className="font-bold text-lg mb-2">{t.confirmAppointment}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'es' ? 'Confirmar citas pendientes' : 'Confirm pending appointments'}
            </p>
          </button>
        </div>
      </div>

      <div className={`p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <h3 className="font-bold text-xl mb-4">{t.internalMessages}</h3>
        <div className={`h-64 mb-4 p-4 rounded-2xl overflow-y-auto ${darkMode ? 'bg-black/20' : 'bg-gray-50'}`}>
          <div className="space-y-3">
            <div className={`p-3 rounded-2xl max-w-xs ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
              <p className="text-sm">Hola, ¿cómo va el progreso del video?</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>10:30 AM</p>
            </div>
            <div className={`p-3 rounded-2xl max-w-xs ml-auto ${darkMode ? 'bg-rose-500/20' : 'bg-rose-100'}`}>
              <p className="text-sm">Está en edición, lo tendremos listo pronto.</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>10:45 AM</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={language === 'es' ? 'Escribe un mensaje...' : 'Type a message...'}
            className={`flex-1 px-4 py-3 rounded-2xl ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
            } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
          />
          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:scale-105 transition-transform">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingsSection;