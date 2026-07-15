# 🪐 The Little Prince B612
> **"네 장미꽃이 그토록 소중한 이유는, 그 꽃을 위해 네가 공들인 시간 때문이야."**
>
> 생텍쥐페리의 소설 《어린 왕자》에서 영감을 받아 제작한, 독자들을 위한 밤하늘 감성의 따뜻한 인터랙티브 방명록 서비스입니다.

이 프로젝트는 React와 Vite 환경을 기반으로 구축되었으며, 전역 상태 관리 라이브러리인 **Zustand**와 구글 **Firebase Firestore** 백엔드를 연동하여 작동합니다. 특히 **Framer Motion**과 **Canvas API**를 활용하여 동화책을 읽는 듯한 감성적이고 고도화된 인터랙티브 UI/UX를 구현하는 데 초점을 맞추었습니다.

---

## 🦊 프로젝트 핵심 요약

* **프레임워크 및 환경**: React (Vite)
* **상태 관리**: Zustand 전역 스토어 (`useGuestbookStore`)
* **백엔드 서비스**: Firebase Firestore Database 연동
* **모션 및 애니메이션**: Framer Motion, HTML5 Canvas API (하드웨어 가속 최적화)
* **스타일링**: Sass (SCSS Modules) 기반 사막 여우 & 은하수 테마 배색
* **배포 환경**: Vercel (클라이언트 배포 및 환경 변수 안전화)

---

## ✨ 주요 기능 (Key Features)

### 1. 동화책 감성의 인터랙티브 UI/UX 디자인
* **스플래시 오프닝 (Splash Opening)**: 소행성 B612에 처음 발을 딛는 독자들에게 첫인상부터 특별한 몰입감을 주는 환상적인 웹 오프닝 시퀀스를 제공합니다.
* **은하수 맵 탐험 (Cosmic Map)**: 실제 우주 은하수 배경 위에 동동 떠다니는 소행성들을 클릭하면, 동화책 페이지를 넓게 펼친 듯한 양피지 감성의 모달이 떠오르며 어린왕자 원작의 감동적인 국·영문 명대사를 읊어줍니다.
* **바람에 일렁이는 노을 (Sunset Effect)**: 어바웃 페이지에서 "매일 마흔네 번의 노을을 볼 수 있어" 구절 뒤로 실제 여우빛 노을그라데이션이 번지며 바람에 흩날리는 듯한 영롱한 애니메이션을 구현했습니다.
* **별똥별 스크롤 인디케이터 (Shooting Star Progress Bar)**: 독자가 화면을 읽어 내려가는 속도에 맞춰, 화면 최상단에 물리 엔진(Framer Motion Spring)이 적용된 별똥별 궤적이 쫀득하게 차오릅니다.

### 2. 하드웨어 가속 최적화 별가루 배경 (Cosmic Snow)
* 렌더링 최적화를 위해 무거운 CSS 애니메이션 대신 **단 하나의 HTML5 Canvas API**만 사용하여 60fps의 부드러운 별가루 우주 배경을 구현했습니다.
* **멀티 테마 감지 (useLocation)**: 페이지 경로를 스스로 추적하여, 어두운 페이지(홈)에서는 빛나는 황금 별가루가, 밝은 상아색 편지지 페이지(방명록, 소개)에서는 따뜻한 여우빛 노을 꽃가루가 살랑살랑 흔들리며 떨어지도록 동적으로 테마가 전환됩니다.

### 3. 실시간 방명록 CRUD & 페이지네이션 (Firebase Firestore)
* Firestore 비동기 통신 로직을 컴포넌트 외부인 Zustand 스토어로 완벽히 격리하여 아키텍처의 관심사를 분리했습니다.
* Firestore의 `limit`와 `startAfter` 메서드를 조합한 **오프셋 없는 오가닉 데이터 페이징(더보기)**을 구현하여 대용량 방명록 데이터 로딩 속도와 서버 트래픽을 비약적으로 아끼도록 최적화했습니다.

---

## 📂 폴더 구조 (Folder Structure)

선계획된 컴포넌트 재사용성과 관심사 분리(SoC) 원칙에 맞추어 체계적인 폴더 트리를 설계했습니다.

```text
src
 ├── main.jsx (BrowserRouter 컨텍스트 주입)
 ├── App.jsx (Routes, Route를 통한 중앙 라우팅 및 스크롤 프로그레스 연결)
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
 │    ├── GuestbookForm.jsx & GuestbookForm.module.scss (방명록 입력 폼)
 │    ├── CosmicSnow.jsx (HTML5 Canvas 기반 하드웨어 가속 별가루 배경)
 │    ├── CosmicMap.jsx & CosmicMap.module.scss (은하수 맵 탐험 인터랙션)
 │    ├── planetData.js (소행성별 스토리 및 국/영문 명대사 아카이브)
 │    └── ScrollProgress.jsx & ScrollProgress.module.scss (별똥별 스크롤 인디케이터)
 │
 └── pages (라우트 단위의 독립 화면 독립체)
      ├── Home.jsx & Home.module.scss (멀티 미디어 기반 메인 랜딩 화면)
      ├── About.jsx & About.module.scss (감동을 더하는 스크롤 기반 어린왕자 에세이 뷰)
      ├── Guestbook.jsx & Guestbook.module.scss (방명록 비즈니스 로직 뷰)
      ├── Login.jsx & Signup.jsx (1분할 레이아웃 기반 유저 인증 화면)
      └── Auth.module.scss (인증 전용 모듈형 SCSS)