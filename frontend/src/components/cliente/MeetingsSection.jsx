import React, { useState, useEffect } from 'react';
import { MessageSquare, Calendar, CheckCircle, Send } from 'lucide-react';
import * as api from '../../services/api';

const MeetingsSection = ({ darkMode, language, t, setShowModal, setModalType }) => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([
    { from: 'admin', text: 'Hola, ¿cómo va el progreso del video?', time: '10:30 AM' },
    { from: 'client', text: 'Está en edición, lo tendremos listo pronto.', time: '10:45 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      setLoading(true);
      const meetingsData = await api.getMeetings();
      const meetsArray = Array.isArray(meetingsData) ? meetingsData : meetingsData.meetings || [];
      setMeetings(meetsArray.filter(m => m.status !== 'cancelada').slice(0, 5));
    } catch (error) {
      console.error('Error cargando reuniones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleMeeting = () => {
    setModalType('newMeeting');
    setShowModal(true);
  };

  const handleConfirmAppointment = () => {
    setModalType('confirmMeeting');
    setShowModal(true);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        from: 'client',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div className={`p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="flex items-center mb-6">
          <MessageSquare className="w-8 h-8 mr-3 text-green-500" />
          <h2 className="text-3xl font-bold">{t.meetingsCommunication}</h2>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              onClick={handleScheduleMeeting}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} transition-colors text-left`}
            >
              <Calendar className="w-8 h-8 mb-3 text-blue-500" />
              <h3 className="font-bold text-lg mb-2">{t.scheduleMeeting}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.proposeDatetime}
              </p>
            </button>
            
            <button 
              onClick={handleConfirmAppointment}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} transition-colors text-left`}
            >
              <CheckCircle className="w-8 h-8 mb-3 text-green-500" />
              <h3 className="font-bold text-lg mb-2">{t.confirmAppointment}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'es' ? 'Confirmar citas pendientes' : 'Confirm pending appointments'}
              </p>
            </button>
          </div>
        )}
      </div>

      {meetings.length > 0 && (
        <div className={`p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
          <h3 className="font-bold text-xl mb-4">
            {language === 'es' ? 'Próximas reuniones' : 'Upcoming meetings'}
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {meetings.map((meeting) => (
              <div key={meeting.id} className={`p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className="font-semibold">{meeting.title}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {new Date(meeting.meeting_date).toLocaleString()}
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {meeting.location} • {meeting.duration_minutes} min
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <h3 className="font-bold text-xl mb-4">{t.internalMessages}</h3>
        <div className={`h-64 mb-4 p-4 rounded-2xl overflow-y-auto ${darkMode ? 'bg-black/20' : 'bg-gray-50'}`}>
          <div className="space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-3 rounded-2xl max-w-xs ${msg.from === 'admin' ? (darkMode ? 'bg-blue-500/20' : 'bg-blue-100') : (darkMode ? 'bg-rose-500/20 ml-auto' : 'bg-rose-100 ml-auto')}`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{msg.time}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={language === 'es' ? 'Escribe un mensaje...' : 'Type a message...'}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className={`flex-1 px-4 py-3 rounded-2xl ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
            } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
          />
          <button 
            onClick={handleSendMessage}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:scale-105 transition-transform"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingsSection;