import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './PortfolioSlider.css';
import categories from './images/portfolioData';

const PortfolioSlider = () => {
  const scrollRefs = useRef([]);
  const [scrollFrames, setScrollFrames] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const startAutoScroll = (index) => {
    if (scrollFrames[index]) return;

    const container = scrollRefs.current[index];
    if (!container) return;

    const speed = 2; // px por frame

    const move = () => {
      if (!container) return;

      container.scrollLeft += speed;

      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0; // reinicio circula
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
        <div key={index} className="portfolio-row">
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
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={category.title} className="card-image" />
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Selected" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default PortfolioSlider;
