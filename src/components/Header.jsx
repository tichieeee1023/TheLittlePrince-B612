import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}> 
      <div className={styles.container}> 
        
        {/* 🌟 투박한 영문 대신, 밤하늘 감성을 듬뿍 담은 네이밍으로 변경! */}
        <Link to='/' className={styles.logo}>
          The Little Prince <span className={styles.highlight}>B612</span>
        </Link>
        
        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
            홈
          </NavLink>
          <NavLink to="/guestbook" className={({ isActive }) => isActive ? styles.active : ''}>
            방명록
          </NavLink>
        </nav>
        
        <div className={styles.auth}>
          <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : ''}>
            로그인
          </NavLink>
          <NavLink to="/signup" className={({ isActive }) => isActive ? styles.active : ''}>
            회원가입
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header