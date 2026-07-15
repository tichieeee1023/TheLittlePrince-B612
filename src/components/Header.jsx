// src/components/Header.jsx

import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import styles from './Header.module.scss'

const Header = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    alert('안전하게 로그아웃되었습니다. 또 소행성 B612에 놀러 오세요! 🦊')
    navigate('/')
  }

  // ✨ 추가된 공유하기 함수 ✨
  const handleShare = async () => {
    // 🔗 공유할 데이터 사용자님만의 정보로 업데이트
    const shareData = {
      // 👇 1. 사이트 이름 (title) 수정
      title: 'The Little Prince B612 | 소행성 B612 방명록', 
      
      // 👇 2. 설명글 (text) 수정
      text: '가장 중요한 것은 눈에 보이지 않아... 네 장미꽃을 위한 시간을 남겨봐. 🦊🌹',
      
      url: 'https://the-little-prince-b612.vercel.app/',
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('공유가 취소되었거나 에러가 발생했습니다.', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('소행성의 주소가 복사되었습니다! 원하는 곳에 붙여넣기(Ctrl+V)로 초대해 보세요. ✨');
      } catch (error) {
        alert('주소 복사에 실패했습니다. 브라우저의 주소창을 직접 복사해 주세요 ㅠㅠ');
      }
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        {/* ✨ 리디자인된 인터랙티브 SVG 로고 영역 */}
        <Link to='/' className={styles.logo} title="소행성 B612 홈으로">
          <svg
            className={styles.logoSvg}
            viewBox="0 0 100 100"
            width="42"
            height="42"
          >
            <defs>
              <radialGradient id="asteroidGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffd2be" />
                <stop offset="70%" stopColor="#ff7e47" />
                <stop offset="100%" stopColor="#e25c1d" />
              </radialGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <circle cx="20" cy="30" r="1" fill="#fff" opacity="0.6" />
            <circle cx="85" cy="70" r="1.5" fill="#fef08a" opacity="0.8" />
            <circle cx="15" cy="75" r="1" fill="#fff" opacity="0.4" />

            <path d="M50 32 Q48 42 50 48" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            <path d="M50 40 Q44 38 46 36" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M50 32 C47 27 53 27 50 32 Z" fill="#ef4444" filter="url(#glow)" />
            <path d="M48 30 C46 25 54 25 52 30" fill="none" stroke="#f43f5e" strokeWidth="1.5" />

            <circle cx="50" cy="58" r="22" fill="url(#asteroidGrad)" />

            <ellipse
              cx="50"
              cy="58"
              rx="38"
              ry="9"
              fill="none"
              stroke="#fde047"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform="rotate(-15 50 58)"
              className={styles.planetRing}
            />

            <path
              d="M74 25 Q77 25 77 22 Q77 25 80 25 Q77 25 77 28 Q77 25 74 25 Z"
              fill="#fef08a"
              filter="url(#glow)"
              className={styles.twinkleStar}
            />
          </svg>

          <span className={styles.logoText}>
            The Little Prince <span className={styles.highlight}>B612</span>
          </span>
        </Link>

        {/* 중앙 메뉴 내비게이션 */}
        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
            홈
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''}>
            소개
          </NavLink>
          <NavLink to="/cosmicMap" className={({ isActive }) => isActive ? styles.active : ''}>
            별여행
          </NavLink>
          <NavLink to="/guestbook" className={({ isActive }) => isActive ? styles.active : ''}>
            방명록
          </NavLink>
        </nav>

        {/* 우측 인증 및 유틸리티 영역 */}
        <div className={styles.auth}>
          
          {/* ✨ 추가된 공유하기 버튼 (모든 사용자에게 표시됨) ✨ */}
          <button 
            onClick={handleShare} 
            className={styles.iconBtn} 
            title="소행성 초대하기"
          >
            <span className="material-symbols-outlined">share</span>
          </button>

          {user ? (
            <div className={styles.userBox}>
              <span className={styles.welcomeMsg}>
                <strong>{user.nickname}</strong>님 ✨
              </span>
              <button onClick={handleLogout} className={styles.iconBtn} title="로그아웃">
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          ) : (
            <div className={styles.guestBox}>
              <NavLink
                to="/login"
                className={({ isActive }) => isActive ? `${styles.iconBtn} ${styles.active}` : styles.iconBtn}
                title="로그인"
              >
                <span className="material-symbols-outlined">login</span>
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) => isActive ? `${styles.iconBtn} ${styles.active}` : styles.iconBtn}
                title="회원가입"
              >
                <span className="material-symbols-outlined">person_add</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header