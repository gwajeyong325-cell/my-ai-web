# Code Convention

## 기술 스택

- **프레임워크**: React 18
- **빌드 도구**: Vite
- **UI 라이브러리**: MUI (Material UI) v9
- **라우팅**: React Router DOM v7
- **언어**: JavaScript (JSX)

---

## 파일 및 디렉토리 구조

```
src/
├── components/        # 재사용 가능한 공통 컴포넌트
│   └── ComponentName/
│       └── ComponentName.jsx
├── pages/             # 라우트별 페이지 컴포넌트
│   └── PageName/
│       └── PageName.jsx
├── hooks/             # 커스텀 훅
├── utils/             # 유틸리티 함수
├── theme.js           # MUI 테마 설정
├── ThemeContext.jsx   # 테마 컨텍스트 (다크모드)
├── App.jsx            # 루트 컴포넌트 + 라우터
├── main.jsx           # 진입점
└── index.css          # 전역 스타일
```

---

## 네이밍 컨벤션

### 파일명
- **컴포넌트**: PascalCase — `UserCard.jsx`, `NavBar.jsx`
- **훅**: camelCase, `use` 접두사 — `useAuth.js`, `useThemeMode.js`
- **유틸리티**: camelCase — `formatDate.js`, `apiHelper.js`
- **페이지**: PascalCase — `HomePage.jsx`, `LoginPage.jsx`

### 변수 / 함수
- **변수**: camelCase — `userName`, `isLoggedIn`
- **함수**: camelCase 동사형 — `handleClick`, `fetchUser`, `formatDate`
- **상수**: UPPER_SNAKE_CASE — `MAX_RETRY_COUNT`, `API_BASE_URL`
- **컴포넌트**: PascalCase — `function UserCard() {}`

### CSS / sx prop
- MUI `sx` prop 우선 사용, 전역 스타일은 `index.css`에만 작성

---

## 컴포넌트 작성 규칙

### 기본 구조
```jsx
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(null);

  const handleSomething = () => {
    // 이벤트 핸들러
  };

  return (
    <Box>
      <Typography>{prop1}</Typography>
    </Box>
  );
}

export default ComponentName;
```

### 규칙
- 함수 선언식(`function`) 사용 (화살표 함수 컴포넌트 지양)
- `export default`는 파일 맨 아래에 작성
- Props는 구조 분해 할당으로 받기
- 이벤트 핸들러 이름: `handle` + 동작명 (`handleClick`, `handleSubmit`)

---

## Import 순서

```jsx
// 1. React 관련
import { useState, useEffect } from 'react';

// 2. 외부 라이브러리
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// 3. 내부 컴포넌트 / 훅 / 유틸
import UserCard from '../components/UserCard/UserCard';
import { useAuth } from '../hooks/useAuth';

// 4. CSS / 에셋
import './styles.css';
```

---

## MUI 사용 규칙

### sx prop 사용
```jsx
// ✅ 권장
<Box sx={{ display: 'flex', gap: 2, p: 3 }}>

// ❌ 지양 (인라인 style)
<div style={{ display: 'flex', gap: '16px', padding: '24px' }}>
```

### 테마 토큰 활용
```jsx
// ✅ 테마 색상 참조
<Typography color="text.secondary">
<Box sx={{ bgcolor: 'primary.main' }}>

// ❌ 하드코딩
<Box sx={{ color: '#666666' }}>
```

### 반응형
```jsx
// ✅ 브레이크포인트 객체 사용
<Box sx={{ px: { xs: 2, md: 4 }, fontSize: { xs: '1rem', md: '1.25rem' } }}>
```

---

## 상태 관리

- 로컬 상태: `useState`
- 사이드 이펙트: `useEffect`
- 전역 상태(테마 등): Context API (`ThemeContext.jsx` 참고)
- 서버 상태: 추후 필요 시 React Query 도입 검토

---

## 코드 품질

- ESLint 설정 준수 (`eslint.config.js`)
- 사용하지 않는 변수/import 제거
- 컴포넌트 100줄 이상이면 분리 검토
- 주석은 WHY에만 작성 (WHAT은 코드로 표현)
