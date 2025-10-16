import React from 'react';
import { User } from 'lucide-react';

const ProfileSection = ({ darkMode, t }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className={`p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="flex items-center mb-6">
          <User className="w-8 h-8 mr-3 text-indigo-500" />
          <h2 className="text-3xl font-bold">{t.clientProfile}</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-xl mb-4">{t.basicInfo}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.fullName}
                </label>
                <input
                  type="text"
                  defaultValue="Juan Pérez"
                  className={`w-full px-4 py-3 rounded-2xl ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.area}
                </label>
                <input
                  type="text"
                  defaultValue="Marketing"
                  className={`w-full px-4 py-3 rounded-2xl ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.email}
                </label>
                <input
                  type="email"
                  defaultValue="juan.perez@empresa.com"
                  className={`w-full px-4 py-3 rounded-2xl ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phone}
                </label>
                <input
                  type="tel"
                  defaultValue="+502 1234-5678"
                  className={`w-full px-4 py-3 rounded-2xl ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4">{t.notificationPreferences}</h3>
            <div className="space-y-3">
              {[
                { id: 'email', label: t.emailNotifications },
                { id: 'calendar', label: t.calendarAlerts },
                { id: 'screen', label: t.screenNotifications },
              ].map((pref) => (
                <label key={pref.id} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className={`w-5 h-5 rounded ${
                      darkMode
                        ? 'bg-white/5 border-white/10 text-rose-500'
                        : 'bg-gray-50 border-gray-300 text-rose-500'
                    } focus:ring-2 focus:ring-rose-500`}
                  />
                  <span className={`ml-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {pref.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-rose-500/50">
            {t.saveChanges}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;