import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore' // 👈 1. 인증 스토어 불러오기
import styles from './Header.module.scss'

const Header = () => {
  const { user, logout } = useAuthStore() // 👈 2. 유저 정보와 로그아웃 기능 꺼내기
  const navigate = useNavigate()

  // 🔐 로그아웃 처리 함수
  const handleLogout = async () => {
    await logout()
    alert('안전하게 로그아웃되었습니다. 또 소행성 B612에 놀러 오세요! 🦊')
    navigate('/') // 로그아웃 후 메인 홈으로 이동
  }

  return (
    <header className={styles.header}> 
      <div className={styles.container}> 
        
        {/* 로고 영역 */}
        <Link to='/' className={styles.logo}>
          The Little Prince <span className={styles.highlight}>B612</span>
        </Link>
        
        {/* 중앙 메뉴 내비게이션 */}
        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
            홈
          </NavLink>
          <NavLink to="/guestbook" className={({ isActive }) => isActive ? styles.active : ''}>
            방명록
          </NavLink>
        </nav>
        
        {/* 우측 인증 영역 (⭐ 조건부 렌더링 도입!) */}
        <div className={styles.auth}>
          {user ? (
            // 🪐 1. 로그인 상태일 때: "OO님 로그인 중" + 로그아웃 버튼
            <div className={styles.userBox}>
              <span className={styles.welcomeMsg}>
                <strong>{user.nickname}</strong>님 ✨
              </span>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                로그아웃
              </button>
            </div>
          ) : (
            // 👥 2. 비로그인 상태일 때: 기존 로그인 / 회원가입 링크
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : ''}>
                로그인
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => isActive ? styles.active : ''}>
                회원가입
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header