import React from 'react';
import { Save, Upload } from 'lucide-react';

export const NewProjectModal = ({ 
  darkMode, 
  t, 
  language,
  newProjectForm, 
  setNewProjectForm,
  onSubmit 
}) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">{t.requestNewProject}</h2>
    <div className="space-y-4">
      <input
        type="text"
        placeholder={t.projectName}
        value={newProjectForm.name}
        onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
        className={`w-full px-4 py-3 rounded-2xl ${
          darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
        } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
      />
      <select
        value={newProjectForm.type}
        onChange={(e) => setNewProjectForm({ ...newProjectForm, type: e.target.value })}
        className={`w-full px-4 py-3 rounded-2xl ${
          darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
        } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
      >
        <option value="institutional">{t.institutional}</option>
        <option value="informative">{t.informative}</option>
        <option value="eventCoverage">{t.eventCoverage}</option>
      </select>
      <textarea
        placeholder={t.description}
        value={newProjectForm.description}
        onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
        rows="4"
        className={`w-full px-4 py-3 rounded-2xl ${
          darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
        } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
      />
      <input
        type="date"
        value={newProjectForm.deliveryDate}
        onChange={(e) => setNewProjectForm({ ...newProjectForm, deliveryDate: e.target.value })}
        className={`w-full px-4 py-3 rounded-2xl ${
          darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
        } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
      />
      <button
        onClick={onSubmit}
        className="w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400"
      >
        {t.submitRequest}
      </button>
    </div>
  </div>
);

export const EditProjectModal = ({ 
  darkMode, 
  t,
  newProjectForm, 
  setNewProjectForm,
  onUpdate 
}) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">{t.editingProject}</h2>
    <div className="space-y-4">
      <input
        type="text"
        value={newProjectForm.name}
        onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
        className={`w-full px-4 py-3 rounded-2xl ${
          darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
        } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
      />
      <button
        onClick={onUpdate}
        className="w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 flex items-center justify-center"
      >
        <Save className="w-5 h-5 mr-2" />
        {t.saveChanges}
      </button>
    </div>
  </div>
);

export const NewRequestModal = ({ 
  darkMode, 
  t,
  requestForm, 
  setRequestForm,
  onSubmit 
}) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">{t.newRequest}</h2>
    <div className="space-y-4">
      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {t.selectRequestType}
        </label>
        <select
          value={requestForm.type}
          onChange={(e) => setRequestForm({ ...requestForm, type: e.target.value })}
          className={`w-full px-4 py-3 rounded-2xl ${
            darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
          } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
        >
          <option value="revision">{t.revisionRequest}</option>
          <option value="material">{t.additionalMaterial}</option>
          <option value="change">{t.projectChange}</option>
          <option value="support">{t.technicalSupport}</option>
        </select>
      </div>
      <div>
        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {t.urgency}
        </label>
        <select
          value={requestForm.urgency}
          onChange={(e) => setRequestForm({ ...requestForm, urgency: e.target.value })}
          className={`w-full px-4 py-3 rounded-2xl ${
            darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
          } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
        >
          <option value="low">{t.low}</option>
          <option value="medium">{t.medium}</option>
          <option value="high">{t.high}</option>
        </select>
      </div>
      <textarea
        placeholder={t.requestDetails}
        value={requestForm.details}
        onChange={(e) => setRequestForm({ ...requestForm, details: e.target.value })}
        rows="5"
        className={`w-full px-4 py-3 rounded-2xl ${
          darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
        } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
      />
      <div className={`border-2 border-dashed rounded-2xl p-6 text-center ${
        darkMode ? 'border-white/10' : 'border-gray-300'
      }`}>
        <Upload className={`w-10 h-10 mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.attachments}</p>
      </div>
      <button
        onClick={onSubmit}
        className="w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400"
      >
        {t.submitRequest}
      </button>
    </div>
  </div>
);