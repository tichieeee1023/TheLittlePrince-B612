// src/components/CosmicSnow.jsx
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const CosmicSnow = () => {
  const canvasRef = useRef(null);
  const location = useLocation();

  // 💡 [수정] 방명록(/guestbook)과 어바웃(/about) 모두 상아색 배경이므로, 이 둘을 제외한 페이지만 Dark 테마로 지정합니다!
  const isDarkPage = location.pathname !== '/guestbook' && location.pathname !== '/about'; 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 💡 별가루 개수를 45개로 살짝 줄이는 대신, 하나하나의 크기를 키워 미니멀하면서도 확실하게 보이도록 연출합니다.
    const maxParticles = 45; 

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        // 💡 [크기 업그레이드!] 2.5px ~ 6px 사이로 크기를 키워 흩날리는 벚꽃잎/꽃가루 느낌을 확실히 줍니다.
        size: Math.random() * 3.5 + 2.5, 
        speedY: Math.random() * 0.4 + 0.2, // 아주 부드럽고 여유롭게 하강
        speedX: Math.random() * 0.2 - 0.1,
        opacity: Math.random() * 0.5 + 0.4, // 💡 투명도를 올려서 밝은 곳에서도 뚜렷하게 보이도록 조정
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.01 + 0.005, // 흔들리는 회전 반경 최적화
        colorType: Math.random()
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.angle += p.spin;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.2; // 살랑살랑 흔들리는 물리 효과 적용

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width) p.x = 0;
        else if (p.x < 0) p.x = canvas.width;

        let color = '';
        if (isDarkPage) {
          // 🌌 어두운 우주 배경 (홈, 로그인 등): 영롱하고 선명하게 빛나는 아기 금빛 별가루
          color = `rgba(254, 240, 138, ${p.opacity})`;
        } else {
          // 📝 밝은 상아색 배경 (방명록, 소개 페이지): 
          // 큼직해진 크기에 맞춰, 여우빛 오렌지와 에메랄드 밤하늘색이 영롱하게 교차됩니다!
          if (p.colorType < 0.7) {
            // 따스하고 화사한 여우빛 노을 꽃가루 (#ff7e47)
            color = `rgba(255, 126, 71, ${p.opacity * 0.8})`; 
          } else {
            // 맑고 세련된 우주 밤하늘빛 방울 (#4338ca)
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
        zIndex: 1, // 흰 편지지 카드 뒤에 살포시 레이어를 깔아 가독성을 보장합니다.
      }}
    />
  );
};

export default CosmicSnow;