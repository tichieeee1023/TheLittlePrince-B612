import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Auth.module.scss'

const Signup = () => {
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate() 
    
    const subminFun = (e) => {
        // form 제출시 새로고침 방지
        e.preventDefault()
        // 가입 완료 후 방명록으로 슝~
        navigate('/guestbook')
    }

  return (
    <section className={styles.auth}>
       {/* 🎨 Login.jsx와 구조 통일: form 대신 div에 card 클래스 부여! */}
       <div className={styles.card}>
           <form onSubmit={subminFun}>
                <h1>회원가입</h1>
                
                <label className={styles.field}>
                    닉네임
                    <input type="text" value={nickname}  onChange={ (e)=>{
                            setNickname(e.target.value)
                    }} placeholder='사용할 이름' maxLength="20" required />
                </label>
                
                <label className={styles.field}>
                    이메일
                    <input type="email" value={email}  onChange={ (e)=>{
                            setEmail(e.target.value)
                    }} placeholder='example@email.com' required />
                </label>
                
                <label className={styles.field} >
                    패스워드
                    <input type="password" value={password}  onChange={ (e)=>{
                            setPassword(e.target.value)
                    }} placeholder='6글자 이상 입력' required />
                </label>

                <button type='submit'>가입하기</button>
                
                {/* 🎨 styles.link 부활: 글씨를 정중앙에 예쁘게 배치! */}
                <p className={styles.link}>
                    계정이 있나요?{' '} 
                    <Link to='/login'>로그인</Link>
                </p>
           </form>
       </div>
    </section>
  )
}

export default Signup