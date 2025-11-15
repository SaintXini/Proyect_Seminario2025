// src/components/admin/InventoryView.jsx
import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const InventoryView = ({
  darkMode,
  t,
  inventoryItems,
  setShowModal,
  setModalType,
  setEditingItem,
  setFormData,
  onDeleteInventory
}) => {
  const openModal = (item = null) => {
    setModalType('inventory');
    setEditingItem(item);
    setFormData(item || {});
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t.inventoryManagement}
        </h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500"
        >
          <Plus className="w-5 h-5" />
          {t.addNew}
        </button>
      </div>

      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
        <div className="space-y-4">
          {inventoryItems.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No hay items en el inventario. ¡Agrega uno nuevo!
              </p>
            </div>
          ) : (
            inventoryItems.map(item => (
              <div key={item.id} className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.category} • Cantidad: {item.quantity}
                    </p>
                    {item.borrower && (
                      <p className={`text-sm mt-1 ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>
                        En uso: {item.borrower}
                      </p>
                    )}
                    {item.lastMaintenance && (
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        Último mantenimiento: {item.lastMaintenance}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.status === 'Disponible'
                        ? darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
                        : item.status === 'En uso'
                        ? darkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-700'
                        : item.status === 'Mantenimiento'
                        ? darkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-700'
                        : darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {item.status}
                    </span>
                    <button
                      onClick={() => openModal(item)}
                      className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteInventory(item.id)}
                      className={`p-2 rounded-lg ${darkMode ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};