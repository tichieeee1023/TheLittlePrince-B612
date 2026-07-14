import React, { useEffect } from 'react' // 👈 useEffect 꼭 추가!
import { Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Guestbook from './pages/Guestbook';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';
import useAuthStore from './store/useAuthStore' // 👈 주스탠드 스토어 불러오기

const App = () => {
  const { checkAuth } = useAuthStore() // 👈 기억 복구 함수 꺼내기

  useEffect(() => {
    // 👈 앱이 켜지거나 새로고침될 때 무조건 파이어베이스에 로그인 상태 확인!
    checkAuth() 
  }, [checkAuth])

  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>     
        <Route path='/guestbook' element={<Guestbook/>}/>
        <Route path='*' element={<Navigate to='/' replace />}/>
      </Routes>
    </div>
  )
}

export default App