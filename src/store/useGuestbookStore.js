import { create } from 'zustand'
import { db, auth } from '../firebase'
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  limit,       // 👈 추가: 한 번에 가져올 개수 제한
  startAfter   // 👈 추가: 다음 페이지 시작점 기준
} from 'firebase/firestore'

const useGuestbookStore = create((set, get) => ({
  post: [],         
  isLoading: false, 
  lastVisible: null, // ⏳ 마지막으로 가져온 다큐먼트 위치 기억
  hasMore: true,     // ⏳ 더 가져올 데이터가 남아있는지 여부
  POSTS_PER_PAGE: 5, // ⏳ 한 페이지당 보여줄 방명록 개수 (원하는 대로 수정 가능)

  // 1. 🔥 첫 페이지 데이터 가져오기 (초기 로딩 & 새로고침)
  fetchPosts: async () => {
    set({ isLoading: true, hasMore: true, lastVisible: null })
    try {
      const q = query(
        collection(db, 'guestbook'), 
        orderBy('date', 'desc'), 
        limit(get().POSTS_PER_PAGE) // 딱 5개만 땡겨오기
      )
      const querySnapshot = await getDocs(q)
      
      const postList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      // 마지막 문서 위치 저장
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null
      
      set({ 
        post: postList, 
        lastVisible, 
        // 가져온 데이터가 요청한 개수와 같으면 더 있을 거라고 판단
        hasMore: postList.length === get().POSTS_PER_PAGE, 
        isLoading: false 
      })
    } catch (error) {
      console.error("방명록을 가져오는데 실패했습니다 😭:", error)
      set({ isLoading: false })
    }
  },

  // 2. ➕ 추가 페이지 데이터 가져오기 (더보기 버튼 클릭 시 실행)
  fetchMorePosts: async () => {
    const { lastVisible, post, POSTS_PER_PAGE, hasMore, isLoading } = get()
    
    // 더 가져올 게 없거나 이미 로딩 중이면 차단
    if (!lastVisible || !hasMore || isLoading) return

    set({ isLoading: true })
    try {
      const q = query(
        collection(db, 'guestbook'),
        orderBy('date', 'desc'),
        startAfter(lastVisible), // 🎯 기억해둔 마지막 문서 '다음'부터 시작!
        limit(POSTS_PER_PAGE)
      )
      const querySnapshot = await getDocs(q)
      
      const newPostList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null
      
      set({
        post: [...post, ...newPostList], // 🤝 기존 데이터 뒤에 새 데이터 이어붙이기!
        lastVisible: newLastVisible,
        hasMore: newPostList.length === POSTS_PER_PAGE,
        isLoading: false
      })
    } catch (error) {
      console.error("추가 방명록을 가져오는데 실패했습니다 😭:", error)
      set({ isLoading: false })
    }
  },

  // 3. 방명록 추가
  addPostFnc: async (fromData) => {
    try {
      const newPost = {
        nickname: fromData.nickname,
        message: fromData.message,
        character: fromData.character,
        date: new Date().toLocaleDateString(),
        uid: auth.currentUser?.uid
      }
      const docRef = await addDoc(collection(db, 'guestbook'), newPost)
      set((state) => ({
        post: [{ id: docRef.id, ...newPost }, ...state.post]
      }))
    } catch (error) {
      console.error("방명록 등록 실패 😭:", error)
    }
  },

  // 4. 방명록 삭제
  deleFun: async (id) => {
    try {
      await deleteDoc(doc(db, 'guestbook', id))
      set((state) => ({
        post: state.post.filter((item) => item.id !== id)
      }))
    } catch (error) {
      console.error("방명록 삭제 실패 😭:", error)
    }
  }
}))

export default useGuestbookStore