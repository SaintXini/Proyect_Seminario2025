export const getStatusColor = (status, darkMode) => {
  const colors = {
    editing: darkMode ? 'text-blue-400 bg-blue-500/20' : 'text-blue-600 bg-blue-100',
    review: darkMode ? 'text-yellow-400 bg-yellow-500/20' : 'text-yellow-600 bg-yellow-100',
    delivered: darkMode ? 'text-green-400 bg-green-500/20' : 'text-green-600 bg-green-100',
    cancelled: darkMode ? 'text-red-400 bg-red-500/20' : 'text-red-600 bg-red-100',
    pending: darkMode ? 'text-orange-400 bg-orange-500/20' : 'text-orange-600 bg-orange-100',
  };
  return colors[status] || colors.editing;
};

export const getEventIcon = (type) => {
  const icons = {
    meeting: '🗣️',
    recording: '🎬',
    delivery: '💾',
    review: '🕓',
  };
  return icons[type] || '📅';
};

export const getActionColor = (color, darkMode) => {
  const colors = {
    blue: darkMode ? 'from-blue-600 to-cyan-600' : 'from-blue-500 to-cyan-500',
    green: darkMode ? 'from-green-600 to-emerald-600' : 'from-green-500 to-emerald-500',
    orange: darkMode ? 'from-orange-600 to-amber-600' : 'from-orange-500 to-amber-500',
    purple: darkMode ? 'from-purple-600 to-pink-600' : 'from-purple-500 to-pink-500',
  };
  return colors[color] || colors.blue;
};