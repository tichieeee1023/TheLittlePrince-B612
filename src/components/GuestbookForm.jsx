// src/components/GuestbookForm.jsx
import React, { useState, useRef } from 'react' 
import { useNavigate } from 'react-router-dom' 
import CharacterAvatar from './CharacterAvatar'
import CHARACTERS from './characterData'
import useAuthStore from '../store/useAuthStore' 
import styles from './GuestbookForm.module.scss'

const EMOJIS = ['😀', '😊', '🥰', '😂', '😮', '😢', '😭', '😴', '🤔', '😎', '🧡​','⭐​', '✈️', '🦊', '🌹', '​🪐​', '💖', '🌌​',   '👑', '🐑', '📦', '🐍', '🐘', '🌳'];

const GuestbookForm = ({ onAddPost }) => {
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [character, setCharacter] = useState('')

  const { user } = useAuthStore() 
  const navigate = useNavigate()  
  const textareaRef = useRef(null) 

  const addE = (emoji) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newMessage = message.substring(0, start) + emoji + message.substring(end);
      setMessage(newMessage);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        textarea.focus();
      }, 0);
    } else {
      setMessage((msg) => msg + emoji);
    }
  }

  const submitFnc = (e) => {
    e.preventDefault()
    
    if (!user) {
      alert('로그인이 필요한 서비스입니다! 소행성 B612에 먼저 체크인해주세요. 🦊')
      navigate('/login')
      return
    }
    
    if (!nickname || !message || !character) {
        alert('이름과 편지글을 채우고, 동반할 캐릭터를 꼭 선택해 주세요! ✨')
        return
    }

    const newPost = {
      nickname: nickname,
      message: message,
      character: character
    }
    
    onAddPost(newPost)
    setNickname("")
    setMessage("")
    setCharacter("")
  }

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={submitFnc} className={styles.envelopeForm}>
        {/* ✉️ 편투 장식 위쪽 스티치 선 느낌 */}
        <div className={styles.envelopeStitch}></div>

        <h2>머나먼 우주에 보낼 당신의 발자취</h2>
        
        {/* 이모티콘 피커 구역 */}
        <div className={styles.emojiSection}>
          <p>오늘 내 마음의 색깔 닮은 별가루 ✨</p>
          <div className={styles.emojiGrid}>
            {EMOJIS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => addE(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* 닉네임 구역 */}
        <label className={styles.field}>
          당신의 별에서 불리는 이름 💫
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 적어주세요"
            maxLength="20"
            required
          />
        </label>

        {/* 메시지 구역 */}
        <label className={styles.field}>
          마음속에 담아둔 이야기 ✉️
          <textarea
            ref={textareaRef} 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="가장 중요한 것은 눈에 보이지 않는 법이랍니다, 당신의 이야기를 들려주세요."
            maxLength="500"
            required
          />
        </label>

        {/* 캐릭터 미리보기 */}
        {character && (
          <div className={styles.avatarPreview}>
            <p>오늘 나의 은하수 동반자</p>
            <div className={styles.previewContainer}>
              <CharacterAvatar character={character} />
            </div>
          </div>
        )}

        {/* 캐릭터 선택 상자 */}
        <div className={styles.characterSection}>
          <strong>이 여정을 함께할 동반자 선택하기 🦊</strong>
          <div className={styles.avatarList}>
            {CHARACTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={character === item.id ? styles.selected : ''}
                onClick={() => setCharacter(item.id)}
              >
                <CharacterAvatar character={item.id} />
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
         기록 남기기 🌠
        </button>
      </form>
    </div>
  )
}

export default GuestbookForm