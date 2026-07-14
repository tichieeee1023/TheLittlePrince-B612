import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore' // 👈 1. 파이어베이스 스토어 불러오기!
import styles from './Auth.module.scss'

const Signup = () => {
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate() 
    const { signup } = useAuthStore() // 👈 2. 스토어에서 회원가입 기능 꺼내기!
    
    // 👈 3. 비동기 통신을 위해 async를 꼭 붙여줍니다.
    const subminFun = async (e) => {
        e.preventDefault()
        
        try {
            // 👈 4. 파이어베이스에 닉네임, 이메일, 비번을 보내 진짜 가입을 시킵니다!
            await signup(email, password, nickname)
            alert('환영합니다! 소행성 B612의 주민이 되셨습니다. 🦊')
            navigate('/guestbook') // 가입 성공 시에만 방명록으로 슝~
        } catch (error) {
            console.error("회원가입 에러:", error)
            alert('회원가입에 실패했습니다. 이메일이나 비밀번호(6자리 이상)를 확인해주세요!')
        }
    }

  return (
    <section className={styles.auth}>
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