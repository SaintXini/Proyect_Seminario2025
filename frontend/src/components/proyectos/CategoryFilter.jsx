// Frontend/src/components/proyectos/CategoryFilter.jsx
import React from 'react';

const CategoryFilter = ({ darkMode, categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => setActiveCategory(category)}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 uppercase tracking-wider ${
            activeCategory === category
              ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg scale-105'
              : darkMode
              ? 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
              : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-white/20'
          } backdrop-blur-xl`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;