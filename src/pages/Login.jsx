import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore' // 👈 스토어 불러오기
import styles from './Auth.module.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate()
  const { login } = useAuthStore() // 👈 스토어에서 로그인 기능 꺼내기!

  const submitFun = async (e) => {
    e.preventDefault()
    
    try {
      // 👈 파이어베이스에 로그인 요청!
      await login(email, password)
      navigate('/guestbook') // 성공하면 방명록으로 이동
    } catch (error) {
      console.error("로그인 에러:", error)
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인해 주세요!')
    }
  }

  return (
    <section className={styles.auth}>
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
          
          <button type='submit'>로그인</button>
          
          <p className={styles.link}>
            계정이 없나요?{'  '}
            <Link to='/signup'>회원가입</Link>
          </p>
        </form>

        <div className={styles.visual}></div>
      </div>
    </section>
  )
}

export default Login