import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Guestbook from './pages/Guestbook';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';
import './App.css'

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        {/* 메인 홈 화면 */}
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>     
        <Route path='/guestbook' element={<Guestbook/>}/>


        {/* 잘못된 주소로 들어오면 무조건 홈으로 돌려보내는 안전장치 */}
        <Route path='*' element={<Navigate to='/' replace />}/>
      </Routes>
    </div>
  )
}

export default App

/*
  guestbook 만들기
  프론트 - 서버연결(firebase)

  폴더구조
  src
 ├── main.jsx (BrowserRouter로 App을 감싸는 시작점)
 ├── App.jsx (Routes와 Route로 주소를 분기하는 이정표)
 ├── App.css 
 ├── firebase.js 
 │
 ├── store (새로고침해도 글이 안 날아가게 해주는 마범의 서랍장)
 │    └── useGuestbookStore.js (Zustand 전역 스토어)
 │
 ├── components (화면의 부품들)
 │    ├── Header.jsx & Header.module.scss (The Little Prince B612 감성 헤더)
 │    ├── CharacterAvatar.jsx & CharacterAvatar.module.scss
 │    ├── characterData.js (여우 아바타 데이터 배열)
 │    ├── GuestbookForm.jsx & GuestbookForm.module.scss (이모티콘 & 글 입력 폼)
 │
 └── pages (진짜 화면들)
      ├── Home.jsx & Home.module.scss (동영상 3개 무한 전환 구역)
      ├── Guestbook.jsx & Guestbook.module.scss (소행성 B612 방명록 메인 페이지)
      ├── Login.jsx & Signup.jsx (1단 플렉스 카드로 아담해진 로그인/회원가입)
      └── Auth.module.scss (인증 페이지 공통 CSS)
*/