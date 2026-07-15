// src/components/CosmicSnow.jsx
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const CosmicSnow = () => {
  const canvasRef = useRef(null);
  const location = useLocation();

  // 방명록(/guestbook)과 어바웃(/about) 모두 상아색 배경이므로, 이 둘을 제외한 페이지만 Dark 테마로 지정
  const isDarkPage = location.pathname !== '/guestbook' && location.pathname !== '/about'; 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // 📱 모바일 환경 여부 확인 (768px 이하)
    const isMobile = window.innerWidth <= 768;

    // 💡 [최적화] 모바일에서는 파티클 개수를 20개로 줄여 CPU/GPU 부하를 최소화합니다! (PC는 기존 45개 유지)
    const maxParticles = isMobile ? 20 : 45; 

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 파티클 초기화
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        // 💡 [최적화] 모바일에서는 별가루가 너무 커서 지저분해 보이지 않도록 크기 편차를 줄여 조율합니다.
        // PC: 2.5px ~ 6px | 모바일: 1.5px ~ 4px
        size: isMobile 
          ? Math.random() * 2.5 + 1.5 
          : Math.random() * 3.5 + 2.5, 
        speedY: isMobile
          ? Math.random() * 0.3 + 0.15 // 화면 세로 길이가 짧은 모바일에 맞춰 떨어지는 속도도 더 여유롭게 조정
          : Math.random() * 0.4 + 0.2, 
        speedX: Math.random() * 0.2 - 0.1,
        opacity: Math.random() * 0.5 + 0.4, 
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.01 + 0.005, 
        colorType: Math.random()
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.angle += p.spin;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.2; 

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width) p.x = 0;
        else if (p.x < 0) p.x = canvas.width;

        let color = '';
        if (isDarkPage) {
          color = `rgba(254, 240, 138, ${p.opacity})`;
        } else {
          if (p.colorType < 0.7) {
            color = `rgba(255, 126, 71, ${p.opacity * 0.8})`; 
          } else {
            color = `rgba(67, 56, 202, ${p.opacity * 0.45})`; 
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkPage]); 

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1, 
      }}
    />
  );
};

export default CosmicSnow;