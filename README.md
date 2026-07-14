# ✨ The Little Prince B612
> **"네 장미꽃이 그토록 소중한 이유는, 그 꽃을 위해 네가 공들인 시간 때문이야."**
> 생텍쥐페리의 소설 《어린 왕자》에서 영감을 받아 제작한, 밤하늘 감성의 따뜻한 실시간 방명록 서비스입니다.

이 프로젝트는 React와 Vite 환경을 기반으로 구축되었으며, 전역 상태 관리 라이브러리인 **Zustand**와 구글 **Firebase Firestore** 백엔드를 연동하여 새로고침을 해도 데이터가 영구히 안전하게 보관되는 모던 프론트엔드 애플리케이션입니다.

---

## 🦊 프로젝트 핵심 요약

* **프레임워크 및 환경**: React (Vite)
* **상태 관리**: Zustand 전역 스토어 (`useGuestbookStore`)
* **백엔드 서비스**: Firebase Firestore Database 연동
* **스타일링**: Sass (SCSS Modules) 기반 사막 여우 테마 스타일링
* **배포 환경**: Vercel (클라이언트 배포 및 환경 변수 안전화)

---

## ✨ 주요 기능 (Key Features)

1. **실시간 방명록 CRUD (Firebase Firestore)**
   * 파이어베이스 서버와의 비동기 통신을 통해 나그네들의 소중한 기록을 안전하게 저장하고 삭제할 수 있습니다.
   * Firestore 보안 규칙을 적용하여 허가되지 않은 무분별한 데이터 훼손을 방지합니다.

2. **Zustand 기반 서버-로컬 상태 최적화 및 페이지네이션**
   * 비동기 데이터 통신 로직을 컴포넌트 외부 스토어로 완전히 분리하여 깔끔한 아키텍처를 구현했습니다.
   * Firestore의 `limit`와 `startAfter` 메서드를 조합한 **오프셋 없는 효율적인 데이터 페이징(더보기)**을 구현하여 초기 로딩 속도와 서버 트래픽을 최적화했습니다.

3. **감성적인 인터랙티브 UI/UX 디자인**
   * 포근한 모래색($sand-cozy)과 노을빛 오렌지($point-fox) 배색을 활용한 독창적인 어린 왕자 테마 CSS를 구축했습니다.
   * 다양한 표정의 이모티콘 픽 기능 및 귀여운 여우 캐릭터 아바타 선택 카드를 매칭할 수 있습니다.

4. **견고한 클라이언트 라우팅**
   * `react-router-dom`을 활용한 SPA 내비게이션 환경을 제공합니다.
   * 사용자가 잘못된 주소(`*`)로 접근할 경우 무조건 안전하게 메인 화면으로 리다이렉트시키는 방어 코드가 작동합니다.

---

## 📂 폴더 구조 (Folder Structure)

선계획된 컴포넌트 재사용성과 관심사 분리(SoC) 원칙에 맞추어 체계적인 폴더 트리를 설계했습니다.

```text
src
 ├── main.jsx (BrowserRouter 컨텍스트 주입)
 ├── App.jsx (Routes, Route를 통한 중앙 라우팅 분기)
 ├── App.css (글로벌 레이아웃 마진 및 패딩 초기화)
 ├── firebase.js (Firebase Core & Firestore 인스턴스 초기화)
 │
 ├── store (전역 상태 관리 구역)
 │    └── useGuestbookStore.js (비동기 액션 및 상태 보관)
 │
 ├── components (재사용 가능한 UI 부품군)
 │    ├── Header.jsx & Header.module.scss (감성 글로우 효과 내비게이션)
 │    ├── CharacterAvatar.jsx & CharacterAvatar.module.scss (아바타 모듈)
 │    ├── characterData.js (아바타 매핑용 고유 데이터)
 │    └── GuestbookForm.jsx & GuestbookForm.module.scss (방명록 입력 폼)
 │
 └── pages (라우트 단위의 독립 화면 독립체)
      ├── Home.jsx & Home.module.scss (멀티 미디어 기반 메인 랜딩 화면)
      ├── Guestbook.jsx & Guestbook.module.scss (방명록 비즈니스 로직 뷰)
      ├── Login.jsx & Signup.jsx (1분할 레이아웃 기반 유저 인증 화면)
      └── Auth.module.scss (인증 전용 모듈형 SCSS)