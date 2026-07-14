import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Auth.module.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // 🌟 선생님이 추가하신 핵심 기능! 페이지를 이동시켜주는 훅
  const navigate = useNavigate()

  const submitFun = (e) => {
    e.preventDefault()
    // 로그인 폼 제출 시 방명록 페이지로 강제 이동!
    navigate('/guestbook')
  }

  return (
    <section className={styles.auth}>
      
      {/* 🎨 폼과 오른쪽 빈 공간을 묶어주던 카드 껍데기 복구! */}
      <div className={styles.card}>
        <form onSubmit={submitFun}>
          <p>환영합니다</p>
          <h1>로그인</h1>
          
          <label className={styles.field}>
            이메일
            <input 
              type="email" 
              value={email}  
              onChange={(e) => setEmail(e.target.value)} 
              placeholder='example@email.com' 
              required 
            />
          </label>
          
          <label className={styles.field} >
            패스워드
            <input 
              type="password" 
              value={password}  
              onChange={(e) => setPassword(e.target.value)} 
              placeholder='6글자 이상 입력' 
              required 
            />
          </label>
          
          {/* 버튼은 CSS에서 직접 스타일링되므로 클래스명 없어도 예쁘게 나옵니다 */}
          <button type='submit'>로그인</button>
          
          {/* 🎨 가운데 정렬되도록 styles.link 클래스 부활! */}
          <p className={styles.link}>
            계정이 없나요?{'  '}
            <Link to='/signup'>회원가입</Link>
          </p>
        </form>

        {/* 🎨 그리드 레이아웃의 오른쪽 공간을 채워줄 짝꿍 박스 복구 */}
        <div className={styles.visual}></div>
      </div>
      
    </section>
  )
}

export default Login