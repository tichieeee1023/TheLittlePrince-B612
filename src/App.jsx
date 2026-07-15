import React, { useEffect, useState } from 'react' 
import { Navigate, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home';
import About from './components/About';
import Guestbook from './pages/Guestbook';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';
import Opening from './components/Opening'; // 생성한 오프닝 임포트
import useAuthStore from './store/useAuthStore'
import ClickRipple from './components/ClickRipple'; // 물수제비 파동
import CosmicSnow from './components/CosmicSnow'; // 화면에 흩뿌려지는 별무리
import CosmicMap from './components/CosmicMap';
import ScrollProgress from './components/ScrollProgress';

const App = () => {
  const { checkAuth } = useAuthStore() 
  // 💡 오프닝 화면을 보여줄지 결정하는 상태 (처음 켰을 땐 무조건 true)
  const [isOpening, setIsOpening] = useState(true); 

  useEffect(() => {
    checkAuth() 
  }, [checkAuth])

  return (
    <div>
      <ClickRipple /> 
      {/* ✨ AnimatePresence: 컴포넌트가 사라질 때 애니메이션을 기다려주는 래퍼 */}
      <AnimatePresence>
        {isOpening && (
          <Opening key="opening" onComplete={() => setIsOpening(false)} />
        )}
      </AnimatePresence>

      <ScrollProgress />

      {/* 🌸 화면 전체에 살살 흩날리는 금빛 은하수 배경 */}
      <CosmicSnow />

      <AnimatePresence>
        {isOpening && (
          <Opening key="opening" onComplete={() => setIsOpening(false)} />
        )}
      </AnimatePresence>

      {/* ✨ 오프닝이 끝나면 본문이 페이드인 되며 나타납니다. */}
      {!isOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>     
            <Route path="/about" element={<About />} />
            <Route path="/cosmicMap" element={<CosmicMap />} />
            <Route path='/guestbook' element={<Guestbook/>}/>
            <Route path='*' element={<Navigate to='/' replace />}/>
          </Routes>
        </motion.div>
      )}
    </div>
  )
}

export default App