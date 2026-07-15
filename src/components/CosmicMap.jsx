// src/components/CosmicMap.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLANETS } from './planetData';
import styles from './CosmicMap.module.scss';

const CosmicMap = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.spaceOverlay}></div>

      <div className={styles.guideText}>
        <p>은하수 위에서 반짝이는 별들을 클릭해 보세요.</p>
      </div>

      {PLANETS.map((planet) => (
        <motion.div
          key={planet.id}
          className={styles.planet}
          style={{
            top: planet.top,
            left: planet.left,
            width: planet.size,
            height: planet.size,
            background: `radial-gradient(circle at 35% 35%, #ffffff, ${planet.color} 60%, #000000)`,
            boxShadow: `0 0 25px ${planet.color}90`, 
          }}
          whileHover={{ scale: 1.15, boxShadow: `0 0 50px ${planet.color}` }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedPlanet(planet)}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className={styles.planetLabel}>{planet.name}</span>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedPlanet && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPlanet(null)}
          >
            <motion.div 
              className={styles.storybookModal}
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.innerFrame} style={{ borderColor: selectedPlanet.color }}>
                <button className={styles.closeBtn} onClick={() => setSelectedPlanet(null)}>✕</button>
                
                <span className={styles.subtitle}>{selectedPlanet.id}</span>
                <h2 style={{ color: selectedPlanet.color }}>{selectedPlanet.name}</h2>
                
                <div className={styles.divider}>✧ * ✧ * ✧</div>
                
                <h3 className={styles.resident}>{selectedPlanet.resident}</h3>
                <p className={styles.desc}>{selectedPlanet.description}</p>
                
                {/* 🌟 명대사 멀티링구얼 렌더링 박스 */}
                <div 
                  className={styles.quoteBox} 
                  style={{ background: `linear-gradient(to right, transparent, ${selectedPlanet.color}15, transparent)` }}
                >
                  <p className={styles.quoteEn}>{selectedPlanet.quoteEn}</p>
                  <div className={styles.quoteDivider}></div>
                  <p className={styles.quoteKo}>{selectedPlanet.quote}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CosmicMap;