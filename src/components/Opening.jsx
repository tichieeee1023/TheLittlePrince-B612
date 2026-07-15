import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Opening.module.scss';

const Opening = ({ onComplete }) => {
  const canvasRef = useRef(null);

  // 1. 타이머 설정: 3.5초 뒤에 오프닝을 종료하고 메인 화면으로 넘깁니다.
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // 2. 우주로 진입하는(워프) 캔버스 애니메이션
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // 브라우저 크기에 맞게 캔버스 설정
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 400개의 별 입자 생성
    const stars = Array(400).fill().map(() => ({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * canvas.width
    }));

    const animate = () => {
      ctx.fillStyle = '#0c0e17'; // 배경: 깊은 밤하늘 색상
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach(star => {
        star.z -= 8; // 별이 앞으로 다가오는 속도
        
        // 별이 화면을 지나치면 저 멀리서 다시 생성
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - cx;
          star.y = Math.random() * canvas.height - cy;
          star.z = canvas.width;
        }

        // 3D 좌표를 2D 평면으로 변환
        const px = (star.x / star.z) * 1000 + cx;
        const py = (star.y / star.z) * 1000 + cy;
        const radius = Math.max(0.5, (1 - star.z / canvas.width) * 3);

        ctx.fillStyle = '#fdfcf8'; // 별 색상
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 화면 크기를 바꿀 때 대응
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    // ✨ motion.div를 사용해 오프닝이 끝날 때 부드럽게 투명해지며 사라집니다.
    <motion.div
      className={styles.openingOverlay}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <canvas ref={canvasRef} className={styles.starCanvas}></canvas>
      
     <div className={styles.titleBox}>
        <motion.h1
          initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }} // ✨ 블러에서 선명해지는 고급 효과 추가
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          The Little Prince
        </motion.h1>
        
        {/* ✨ 영화 포스터 같은 빛나는 중앙 분리선 애니메이션 */}
        <motion.div 
          className={styles.divider}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80px", opacity: 0.6 }}
          transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }} // ✨ 살짝 아래에서 위로 떠오르는 효과
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
        >
          " 가장 중요한 것은 눈에 보이지 않아 "
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Opening;