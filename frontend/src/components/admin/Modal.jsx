// src/components/admin/Modal.jsx
import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({ 
  showModal, 
  modalType, 
  editingItem, 
  formData, 
  setFormData,
  darkMode, 
  t,
  onClose,
  onSave
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`max-w-2xl w-full rounded-2xl p-6 ${
        darkMode ? 'bg-gray-800 border border-white/10' : 'bg-white border border-gray-200'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {editingItem ? t.edit : t.addNew}
          </h3>
          <button onClick={onClose} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {modalType === 'project' && (
            <>
              <input
                type="text"
                placeholder={t.name}
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
              <input
                type="text"
                placeholder={t.client}
                value={formData.client || ''}
                onChange={(e) => setFormData({...formData, client: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
              <input
                type="text"
                placeholder={t.status}
                value={formData.status || ''}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
              <input
                type="number"
                placeholder={t.progress}
                value={formData.progress || ''}
                onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
              <input
                type="number"
                placeholder={t.budget}
                value={formData.budget || ''}
                onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
            </>
          )}

          {modalType === 'inventory' && (
            <>
              <input
                type="text"
                placeholder={t.name}
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
              <input
                type="text"
                placeholder={t.category}
                value={formData.category || ''}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
              <select
                value={formData.status || 'Disponible'}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              >
                <option value="Disponible">Disponible</option>
                <option value="En uso">En uso</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Stock bajo">Stock bajo</option>
              </select>
              <input
                type="number"
                placeholder={t.quantity}
                value={formData.quantity || ''}
                onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
            </>
          )}

          {modalType === 'investment' && (
            <>
              <input
                type="text"
                placeholder="Item"
                value={formData.item || ''}
                onChange={(e) => setFormData({...formData, item: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
              <select
                value={formData.priority || 'Media'}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
              <input
                type="number"
                placeholder={t.estimated}
                value={formData.estimated || ''}
                onChange={(e) => setFormData({...formData, estimated: parseInt(e.target.value)})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
              <textarea
                placeholder={t.notes}
                value={formData.notes || ''}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
                rows="3"
              />
            </>
          )}

          {(modalType === 'clientEvent' || modalType === 'companyEvent') && (
            <>
              <input
                type="number"
                placeholder={t.date + " (1-31)"}
                value={formData.date || ''}
                onChange={(e) => setFormData({...formData, date: parseInt(e.target.value)})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
              <input
                type="text"
                placeholder={t.title}
                value={formData.title || ''}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
              <select
                value={formData.type || 'production'}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              >
                <option value="production">Producción</option>
                <option value="meeting">Reunión</option>
                <option value="deadline">Entrega</option>
                <option value="review">Revisión</option>
                <option value="maintenance">Mantenimiento</option>
                <option value="training">Capacitación</option>
                <option value="planning">Planificación</option>
              </select>
              {modalType === 'clientEvent' && (
                <input
                  type="text"
                  placeholder={t.client}
                  value={formData.client || ''}
                  onChange={(e) => setFormData({...formData, client: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl ${
                    darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                  } border`}
                />
              )}
            </>
          )}

          {modalType === 'client' && (
            <>
              <input
                type="text"
                placeholder={t.name}
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
              <input
                type="text"
                placeholder={t.contact}
                value={formData.contact || ''}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
              <input
                type="email"
                placeholder={t.email}
                value={formData.email || ''}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
              <input
                type="tel"
                placeholder={t.phone}
                value={formData.phone || ''}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
              <select
                value={formData.status || 'Activo'}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
              <input
                type="month"
                placeholder={t.since}
                value={formData.since || ''}
                onChange={(e) => setFormData({...formData, since: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                } border`}
              />
            </>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onSave}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500"
          >
            {t.save}
          </button>
          <button
            onClick={onClose}
            className={`flex-1 py-3 rounded-xl font-semibold ${
              darkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};