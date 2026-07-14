import { create } from 'zustand'
import { auth, db } from '../firebase'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const useAuthStore = create((set) => ({
  user: null,          // 현재 로그인한 유저 정보 (없으면 null)
  isLoading: true,     // 로그인 체크 중인지 여부

  // 1. 회원가입 액션
  signup: async (email, password, nickname) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    // Firestore에 유저 닉네임 추가 저장
    await setDoc(doc(db, 'users', user.uid), {
      nickname: nickname,
      email: email
    })
    set({ user: { uid: user.uid, email: user.email, nickname } })
  },

  // 2. 로그인 액션
  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    // Firestore에서 닉네임 가져오기
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    set({ user: { uid: user.uid, email: user.email, nickname: userDoc.data().nickname } })
  },

  // 3. 로그아웃 액션
  logout: async () => {
    await signOut(auth)
    set({ user: null })
  },

  // 4. 새로고침 시 로그인 유지 확인 액션
  checkAuth: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        set({ user: { uid: user.uid, email: user.email, nickname: userDoc.data()?.nickname }, isLoading: false })
      } else {
        set({ user: null, isLoading: false })
      }
    })
  }
}))

export default useAuthStore