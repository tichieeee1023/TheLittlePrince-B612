// src/components/About.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './About.module.scss';

const About = () => {
  const navigate = useNavigate();

  // 📖 애니메이션 설정 (우아한 페이드인 + 위로 떠오름)
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" }, // 화면에 조금 더 들어왔을 때 애니메이션 시작
    transition: { duration: 0.9, ease: "easeOut" }
  };

  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        
        {/* ✨ 섹션 1: 도입부 (노을 이펙트) */}
        <motion.section className={styles.introSection} {...fadeInUp}>
          <div className={styles.starIcon}>⭐</div>
          <h1 className={styles.mainTitle}>소행성 B612에<br/>오신 당신을 환영합니다</h1>
          <p className={styles.mainQuote}>
            안녕, 내 별에 온 걸 환영해.<br/>
            여기는 아주 작지만,{' '}
            <br/><br/>
            <span className={styles.sunsetEffect}>매일 마흔네 번의 노을을 볼 수 있어.</span>
          </p>
        </motion.section>

        <div className={styles.bookDivider}>✧ * ✧ * ✧</div>

        {/* 🦊 섹션 2: 여우의 가르침 */}
        <motion.section className={styles.storySection} {...fadeInUp}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.emoji}>🦊</span>
              <h2>누군가를 길들인다는 것</h2>
            </div>
            <div className={styles.content}>
              <p>여우가 말했어요. <strong>"네가 나를 길들인다면, 우린 서로에게 세상에 하나뿐인 존재가 될 거야."</strong></p>
              <p>수많은 별들 사이를 지나 이곳에 도착한 당신. 우리가 이곳에서 마음을 나누고 문장을 남기는 순간, 우리는 서로의 우주에 특별한 궤도를 그리게 됩니다.</p>
            </div>
          </div>
        </motion.section>

        <div className={styles.bookDivider}>✧ * ✧ * ✧</div>

        {/* 🌹 섹션 3: 장미의 비밀 */}
        <motion.section className={styles.storySection} {...fadeInUp}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.emoji}>🌹</span>
              <h2>세상에 하나뿐인 장미</h2>
            </div>
            <div className={styles.content}>
              <p><strong>"네 장미가 그토록 소중한 것은, 네가 장미를 위해 보낸 시간 때문이야."</strong></p>
              <p>아주 평범해 보이는 단어들도, 누군가를 떠올리며 정성껏 적어 내려간 시간 덕분에 세상에 단 하나뿐인 문장이 됩니다. 당신의 이야기는 어떤 향기를 품고 있나요?</p>
            </div>
          </div>
        </motion.section>

        <div className={styles.bookDivider}>✧ * ✧ * ✧</div>

        {/* ⭐ 섹션 4: 밤하늘의 별들 */}
        <motion.section className={styles.storySection} {...fadeInUp}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.emoji}>🌌</span>
              <h2>밤하늘의 웃는 별들</h2>
            </div>
            <div className={styles.content}>
              <p><strong>"네가 밤하늘을 바라볼 때면, 내가 그 별들 중 하나에 살고 있을 테니까... 내게는 모든 별들이 웃고 있는 것처럼 보일 거야."</strong></p>
              <p>당신이 이 작은 공간에 남기고 간 다정한 흔적들은, 밤하늘에 떠오른 수많은 별들처럼 언제나 이 자리에서 조용히 반짝이며 미소 짓고 있을 것입니다.</p>
            </div>
          </div>
        </motion.section>

        <div className={styles.bookDivider}>✧ * ✧ * ✧</div>

        {/* 🪐 섹션 5: 마무리 (오아시스) */}
        <motion.section className={styles.finalSection} {...fadeInUp}>
          <div className={styles.finalCard}>
            <h3>"사막이 아름다운 건,<br/>어딘가에 오아시스를 숨기고 있기 때문이야."</h3>
            <p>이 웹사이트는 당신의 다정한 말 한마디라는 오아시스를 기다리는 작은 사막입니다. <br/>당신의 소중한 발자국을 남겨 주시겠어요?</p>
            
            <motion.button 
              className={styles.ctaBtn} 
              onClick={() => navigate('/guestbook')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              방명록에 발자국 남기기 🌹
            </motion.button>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default About;