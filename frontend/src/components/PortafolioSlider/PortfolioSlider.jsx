import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PortfolioSlider.css';
import categories from './images/portfolioData';

const PortfolioSlider = () => {
  const scrollRefs = useRef([]);
  const [scrollFrames] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const startAutoScroll = (index) => {
    if (scrollFrames[index]) return;
    const container = scrollRefs.current[index];
    if (!container) return;

    const speed = 2;

    const move = () => {
      if (!container) return;
      container.scrollLeft += speed;
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      }
      scrollFrames[index] = requestAnimationFrame(move);
    };

    scrollFrames[index] = requestAnimationFrame(move);
  };

  const stopAutoScroll = (index) => {
    if (scrollFrames[index]) {
      cancelAnimationFrame(scrollFrames[index]);
      scrollFrames[index] = null;
    }
  };

  return (
    <div className="portfolio-container">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          className="portfolio-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <h2 className="portfolio-title">{category.title}</h2>
          <div
            className="scroll-area"
            ref={(el) => (scrollRefs.current[index] = el)}
            onMouseEnter={() => startAutoScroll(index)}
            onMouseLeave={() => stopAutoScroll(index)}
          >
            {category.images.map((image, i) => (
              <motion.div
                key={i}
                className="card"
                whileHover={{ scale: 1.08, boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={category.title} className="card-image" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="modal"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selectedImage}
              alt="Selected"
              className="modal-image"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioSlider;
