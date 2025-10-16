// Frontend/src/components/ProjectDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectDetail = ({ project, darkMode, t, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ✅ Funciones memorizadas para evitar recreaciones en cada render
  const openLightbox = useCallback((index) => {
    setCurrentImageIndex(index);
    setSelectedImage(project.gallery[index]);
  }, [project.gallery]);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const nextImage = useCallback(() => {
    const nextIndex = (currentImageIndex + 1) % project.gallery.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(project.gallery[nextIndex]);
  }, [currentImageIndex, project.gallery]);

  const prevImage = useCallback(() => {
    const prevIndex = (currentImageIndex - 1 + project.gallery.length) % project.gallery.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(project.gallery[prevIndex]);
  }, [currentImageIndex, project.gallery]);

  // ✅ Efecto corregido con dependencias completas
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, closeLightbox, nextImage, prevImage]);

  // 🎨 Gradientes por categoría
  const getCategoryGradient = (category) => {
    switch (category.toLowerCase()) {
      case 'evento benéfico':
      case 'charity event':
        return 'from-amber-600 via-orange-500 to-yellow-600';
      case 'mobile app':
        return 'from-cyan-600 via-blue-500 to-indigo-600';
      case 'web app':
        return 'from-purple-600 via-pink-500 to-rose-600';
      case 'ai/ml':
        return 'from-green-600 via-emerald-500 to-teal-600';
      case 'design':
      case 'diseño':
        return 'from-red-600 via-rose-500 to-pink-600';
      case 'hardware':
        return 'from-gray-600 via-slate-500 to-zinc-600';
      default:
        return 'from-gray-600 via-gray-500 to-gray-600';
    }
  };

  return (
    <section
      className={`min-h-screen py-32 px-4 relative ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20'
          : 'bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-pink-50/50'
      }`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* 🔙 Botón de volver */}
        <button
          onClick={onBack}
          className={`group flex items-center space-x-2 mb-8 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
            darkMode
              ? 'bg-white/10 text-cyan-300 hover:bg-white/20 border border-white/10'
              : 'bg-white/60 text-rose-600 hover:bg-white/80 border border-white/20'
          } backdrop-blur-xl`}
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>{t.volverProyectos}</span>
        </button>

        {/* 🧩 Encabezado del proyecto */}
        <div className="text-center mb-16">
          <span
            className={`inline-block px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase mb-6 bg-gradient-to-r ${getCategoryGradient(
              project.category
            )} text-white`}
          >
            {project.category}
          </span>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
            <span
              className={`bg-gradient-to-r ${getCategoryGradient(
                project.category
              )} bg-clip-text text-transparent`}
            >
              {t.projects[project.id]?.title || project.title}
            </span>
          </h1>
          <p
            className={`text-lg max-w-3xl mx-auto leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t.projects[project.id]?.fullDescription ||
              t.projects[project.id]?.description ||
              project.description}
          </p>
          {project.tags && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    darkMode
                      ? 'bg-white/10 text-gray-300 border border-white/10'
                      : 'bg-white/60 text-gray-700 border border-white/20'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 🖼️ Título galería */}
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            {t.galeria}
          </h2>
        </div>

        {/* 🧱 Grid de galería */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.gallery.map((image, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 ${
                darkMode
                  ? 'bg-black/20 backdrop-blur-xl border border-white/10'
                  : 'bg-white/40 backdrop-blur-xl border border-white/20'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
                paddingBottom: '75%', // Relación 4:3
                position: 'relative',
              }}
            >
              <div className="absolute inset-0">
                <img
                  src={image}
                  alt={`${project.title} - Imagen ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  style={{ objectPosition: 'center' }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium text-sm">
                    Imagen {index + 1} de {project.gallery.length}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 💡 Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* ❌ Botón de cerrar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-all duration-300 z-10 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>

            {/* ⬅️ Botón anterior */}
            {project.gallery.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 p-3 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-all duration-300 z-10 hover:scale-110"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {/* 🖼️ Imagen ampliada */}
            <div
              className="relative max-w-7xl w-full h-full flex items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt={`${project.title} - Vista ampliada`}
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                style={{ maxHeight: '85vh' }}
              />
            </div>

            {/* ➡️ Botón siguiente */}
            {project.gallery.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 p-3 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-all duration-300 z-10 hover:scale-110"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {/* 📊 Contador de imagen */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full text-white font-medium">
              {currentImageIndex + 1} / {project.gallery.length}
            </div>

            {/* ⌨️ Ayuda de teclado */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full text-white/60 text-sm">
              Usa ← → para navegar • ESC para cerrar
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectDetail;
