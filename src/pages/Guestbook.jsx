import React, { useEffect } from 'react'
import GuestbookForm from '../components/GuestbookForm'
import CharacterAvatar from '../components/CharacterAvatar'
import useGuestbookStore from '../store/useGuestbookStore'
import styles from './Guestbook.module.scss'

const Guestbook = () => {
  // 🎯 스토어에서 페이지네이션용 상태와 함수를 추가로 가져옵니다!
  const { post, isLoading, fetchPosts, fetchMorePosts, hasMore, addPostFnc, deleFun } = useGuestbookStore()

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <section className={styles.guestbookPage}>
      <div className={styles.container}>
        
        <div className={styles.welcomeBox}>
          <p>A little reminder of your stay</p>
          <h1>GUESTBOOK</h1>
          <p>여기는 당신만의 소행성 B612</p>
          <p>머나먼 별에서 온 당신의 이야기</p>
        </div>

        <GuestbookForm onAddPost={addPostFnc} />
        
        <div className={styles.listHeader}>
          <h2>여러분들의 기록</h2>
          <p><strong>{post.length}</strong> 개의 이야기</p>
        </div>

        {/* 리스트 출력 */}
        {post.length > 0 ? (
          <div className={styles.postList}>
            {
              post.map((item) => (
                <div key={item.id} className={styles.postCard}>
                  <div className={styles.postCardHeader}>
                    <div>
                      <strong>{item.nickname}</strong>
                      <span>{item.date}</span>
                    </div>
                    
                    <button 
                      onClick={() => deleFun(item.id)} 
                      className={styles.deleteBtn}
                    >
                      삭제
                    </button>
                  </div>
                  
                  <p className={styles.postMessage}>{item.message}</p>
                  
                  {
                    item.character && (
                      <div className={styles.avatarWrapper}>
                        <CharacterAvatar character={item.character}/>
                      </div>
                    )
                  }
                </div>
              ))
            }

            {/* 🦊 [추가] 더 가져올 데이터가 있다면 나타나는 감성 더보기 버튼 */}
            {hasMore && (
              <button 
                onClick={fetchMorePosts} 
                className={styles.loadMoreBtn}
                disabled={isLoading}
              >
                {isLoading ? '기록을 불러오는 중... ✨' : '별빛 기록 더보기 🦊'}
              </button>
            )}
          </div>
        ) : (
          !isLoading && <p className={styles.empty}>기록이 없습니다</p>
        )}

        {/* 첫 페이지 로딩 시에만 뜨는 중앙 로더 */}
        {isLoading && post.length === 0 && (
          <p className={styles.empty}>서버에서 별빛 기록들을 불러오는 중... ✨</p>
        )}
      </div>
    </section>
  )
}

export default Guestbook