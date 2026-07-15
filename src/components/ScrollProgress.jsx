// src/components/ScrollProgress.jsx
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './ScrollProgress.module.scss';

const ScrollProgress = () => {
  // 1. 현재 스크롤 위치를 0 ~ 1 사이의 값으로 추적합니다.
  const { scrollYProgress } = useScroll();

  // 2. ✨ [핵심] 스크롤이 딱딱하게 끊기지 않고 고무줄처럼 쫀득하게 따라오도록 물리 엔진(Spring)을 입힙니다.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={styles.progressContainer}>
      <motion.div
        className={styles.progressBar}
        style={{ scaleX }} // 좌측을 기준으로 가로 길이(scaleX)가 늘어납니다.
      >
        {/* 별똥별의 머리 역할을 하는 눈부신 빛무리 */}
        <div className={styles.starHead}></div>
      </motion.div>
    </div>
  );
};

export default ScrollProgress;