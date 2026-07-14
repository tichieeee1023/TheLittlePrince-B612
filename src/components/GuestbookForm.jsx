import React, { useState } from 'react'
import CharacterAvatar from './CharacterAvatar'
import CHARACTERS from './characterData'
import styles from './GuestbookForm.module.scss'

const EMOJIS = ['😀', '😊', '🥰', '😂', '😮', '😢', '😭', '😴', '🤔', '😎', '🥳']

const GuestbookForm = ({ onAddPost }) => {
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [character, setCharacter] = useState('')

  const addE = (emoji) => {
    setMessage((msg) => msg + emoji)
  }

  const submitFnc = (e) => {
    e.preventDefault()
    
    // 🛡️ 누락되었던 빈칸 방지 기능 부활!
    if (!nickname || !message || !character) {
        alert('닉네임, 메시지를 입력하고 캐릭터를 꼭 선택해 주세요!')
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
    <div>
      <form onSubmit={submitFnc}>
        <h2>지금 무슨 생각을 하시나요?</h2>

        
        <div>
          <p>다양한 표정들</p>
          <div>
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

        <label className={styles.field}>
          닉네임
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="사용할 이름"
            maxLength="20"
            required
          />
        </label>

        <label className={styles.field}>
          메시지
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="당신의 이야기를 들려주세요"
            maxLength="500"
            required
          />
        </label>

        {/* 캐릭터 미리보기 */}
        {character && (
          <div>
            <p>선택한 캐릭터</p>
            <CharacterAvatar character={character} />
          </div>
        )}

        {/* 캐릭터 선택 상자 */}
        <div>
          <strong>캐릭터</strong>
          <div>
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
          기록 남기기
        </button>

      </form>
    </div>
  )
}

export default GuestbookForm