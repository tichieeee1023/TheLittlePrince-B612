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
              {/* 소행성 그라데이션 */}
              <radialGradient id="asteroidGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffd2be" />
                <stop offset="70%" stopColor="#ff7e47" />
                <stop offset="100%" stopColor="#e25c1d" />
              </radialGradient>
              {/* 별빛 글로우 필터 */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. 배경의 우주 가루 (작은 별들) */}
            <circle cx="20" cy="30" r="1" fill="#fff" opacity="0.6" />
            <circle cx="85" cy="70" r="1.5" fill="#fef08a" opacity="0.8" />
            <circle cx="15" cy="75" r="1" fill="#fff" opacity="0.4" />

            {/* 2. 소행성에 심어진 한 송이 장미 🌹 */}
            {/* 줄기 */}
            <path d="M50 32 Q48 42 50 48" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            {/* 잎사귀 */}
            <path d="M50 40 Q44 38 46 36" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
            {/* 꽃봉오리 */}
            <path d="M50 32 C47 27 53 27 50 32 Z" fill="#ef4444" filter="url(#glow)" />
            <path d="M48 30 C46 25 54 25 52 30" fill="none" stroke="#f43f5e" strokeWidth="1.5" />

            {/* 3. 메인 소행성 B612 🪐 */}
            <circle cx="50" cy="58" r="22" fill="url(#asteroidGrad)" />

            {/* 4. 행성을 감싸는 부드러운 고리 */}
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

            {/* 5. 우측 상단에서 반짝이는 노란 아기별 ⭐ */}
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

        {/* 우측 인증 영역 */}
        <div className={styles.auth}>
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