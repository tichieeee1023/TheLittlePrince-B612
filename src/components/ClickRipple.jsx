// src/components/ClickRipple.jsx
import React, { useState, useEffect } from 'react';
import styles from './ClickRipple.module.scss';

const ClickRipple = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      
      // 파동 배열에 새 클릭 추가
      setRipples((prev) => [...prev, newRipple]);

      // 1초 뒤 파동이 사라지면 배열에서 제거하여 메모리 관리
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }}>
      {ripples.map((r) => (
        <div
          key={r.id}
          className={styles.ripple}
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </div>
  );
};

export default ClickRipple;