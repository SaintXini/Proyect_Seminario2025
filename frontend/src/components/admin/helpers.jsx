// src/utils/helpers.js

export const getEventColor = (type, darkMode) => {
  const colors = {
    production: darkMode ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-blue-100 border-blue-500 text-blue-700',
    maintenance: darkMode ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300' : 'bg-yellow-100 border-yellow-500 text-yellow-700',
    deadline: darkMode ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-red-100 border-red-500 text-red-700',
    review: darkMode ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-purple-100 border-purple-500 text-purple-700',
    meeting: darkMode ? 'bg-green-500/20 border-green-500 text-green-300' : 'bg-green-100 border-green-500 text-green-700',
    training: darkMode ? 'bg-orange-500/20 border-orange-500 text-orange-300' : 'bg-orange-100 border-orange-500 text-orange-700',
    planning: darkMode ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-cyan-100 border-cyan-500 text-cyan-700'
  };
  return colors[type] || colors.production;
};

export const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  return { daysInMonth, startingDayOfWeek };
};

export const getMonthNames = (t) => [
  t.january, t.february, t.march, t.april, t.may, t.june,
  t.july, t.august, t.september, t.october, t.november, t.december
];

export const getDayNames = (t) => [t.sun, t.mon, t.tue, t.wed, t.thu, t.fri, t.sat];