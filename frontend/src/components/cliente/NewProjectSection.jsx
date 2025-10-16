import React from 'react';
import { Plus, Upload } from 'lucide-react';

const NewProjectSection = ({ 
  darkMode, 
  language, 
  t, 
  activeProjectsList,
  setActiveProjectsList,
  newProjectForm, 
  setNewProjectForm 
}) => {
  const handleSubmitProject = () => {
    if (!newProjectForm.name || !newProjectForm.deliveryDate) {
      alert(language === 'es' ? 'Por favor completa todos los campos' : 'Please complete all fields');
      return;
    }
    const newProject = {
      id: Date.now(),
      name: newProjectForm.name,
      status: 'pending',
      progress: 0,
    };
    setActiveProjectsList([...activeProjectsList, newProject]);
    alert(`${language === 'es' ? 'Proyecto enviado exitosamente' : 'Project submitted successfully'}. #${Math.floor(Math.random() * 10000)}`);
    setNewProjectForm({ name: '', type: 'institutional', description: '', deliveryDate: '' });
  };

  return (
    <div className={`max-w-3xl mx-auto p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
      <div className="flex items-center mb-6">
        <Plus className="w-8 h-8 mr-3 text-rose-500" />
        <h2 className="text-3xl font-bold">{t.requestNewProject}</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.projectName}
          </label>
          <input
            type="text"
            value={newProjectForm.name}
            onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
            placeholder="Video de bienvenida para nuevos empleados"
            className={`w-full px-4 py-3 rounded-2xl ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
            } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.productionType}
          </label>
          <select
            value={newProjectForm.type}
            onChange={(e) => setNewProjectForm({ ...newProjectForm, type: e.target.value })}
            className={`w-full px-4 py-3 rounded-2xl ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
          >
            <option value="institutional">{t.institutional}</option>
            <option value="informative">{t.informative}</option>
            <option value="eventCoverage">{t.eventCoverage}</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.description}
          </label>
          <textarea
            value={newProjectForm.description}
            onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
            placeholder="Descripción del objetivo del video..."
            rows="5"
            className={`w-full px-4 py-3 rounded-2xl ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
            } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.estimatedDelivery}
          </label>
          <input
            type="date"
            value={newProjectForm.deliveryDate}
            onChange={(e) => setNewProjectForm({ ...newProjectForm, deliveryDate: e.target.value })}
            className={`w-full px-4 py-3 rounded-2xl ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.attachFiles}
          </label>
          <div className={`border-2 border-dashed rounded-2xl p-8 text-center ${
            darkMode ? 'border-white/10 hover:border-white/20' : 'border-gray-300 hover:border-gray-400'
          } transition-colors cursor-pointer`}>
            <Upload className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {language === 'es' ? 'Arrastra archivos aquí o haz clic para seleccionar' : 'Drag files here or click to select'}
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmitProject}
          className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-rose-500/50"
        >
          {t.submitRequest}
        </button>
      </div>
    </div>
  );
};

export default NewProjectSection;