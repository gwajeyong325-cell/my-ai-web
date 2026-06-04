# Design System

## 색상 팔레트 (Color Palette)

### Primary Colors
- **Primary Main**: `#1976d2` — 주요 버튼, 링크, 강조 요소
- **Primary Light**: `#42a5f5` — hover 상태, 배경 강조
- **Primary Dark**: `#1565c0` — active 상태, 진한 강조

### Secondary Colors
- **Secondary Main**: `#dc004e` — 보조 액션, 알림 배지
- **Secondary Light**: `#ff5983`
- **Secondary Dark**: `#9a0036`

### Neutral Colors
- **Background**: `#ffffff` (light) / `#121212` (dark)
- **Surface**: `#f5f5f5` (light) / `#1e1e1e` (dark)
- **Text Primary**: `rgba(0,0,0,0.87)` (light) / `rgba(255,255,255,0.87)` (dark)
- **Text Secondary**: `rgba(0,0,0,0.6)` (light) / `rgba(255,255,255,0.6)` (dark)

### Semantic Colors
- **Success**: `#2e7d32`
- **Warning**: `#ed6c02`
- **Error**: `#d32f2f`
- **Info**: `#0288d1`

---

## 타이포그래피 (Typography)

기본 폰트: `"Roboto", "Helvetica", "Arial", sans-serif` (`@fontsource/roboto` 사용)

| 변형 (Variant) | 크기 | 두께 | 용도 |
|---|---|---|---|
| `h1` | 2.125rem (34px) | 500 | 페이지 대제목 |
| `h2` | 1.5rem (24px) | 500 | 섹션 제목 |
| `h3` | 1.25rem (20px) | 500 | 카드 제목 |
| `h4` | 1.125rem (18px) | 500 | 서브 섹션 |
| `body1` | 1rem (16px) | 400 | 본문 텍스트 |
| `body2` | 0.875rem (14px) | 400 | 보조 텍스트 |
| `caption` | 0.75rem (12px) | 400 | 라벨, 주석 |
| `button` | 0.875rem (14px) | 500 | 버튼 텍스트 (대문자) |

---

## 간격 (Spacing)

기본 단위: `8px` (MUI 기본값)

```
spacing(1) = 8px
spacing(2) = 16px
spacing(3) = 24px
spacing(4) = 32px
spacing(5) = 40px
```

컴포넌트 내부 패딩: `spacing(2)` (16px) 기준  
섹션 간 여백: `spacing(4)` ~ `spacing(6)` (32px ~ 48px)

---

## 컴포넌트 가이드

### Button
```jsx
// 주요 액션
<Button variant="contained" color="primary">확인</Button>

// 보조 액션
<Button variant="outlined" color="primary">취소</Button>

// 텍스트 버튼
<Button variant="text">더보기</Button>
```

### Card
```jsx
<Card sx={{ borderRadius: 2, boxShadow: 2 }}>
  <CardContent>
    <Typography variant="h3">제목</Typography>
    <Typography variant="body2" color="text.secondary">내용</Typography>
  </CardContent>
</Card>
```

### TextField
```jsx
<TextField
  variant="outlined"
  label="레이블"
  fullWidth
  sx={{ mb: 2 }}
/>
```

---

## 반응형 브레이크포인트 (Breakpoints)

| 이름 | 크기 | 대상 |
|---|---|---|
| `xs` | 0px ~ | 모바일 |
| `sm` | 600px ~ | 태블릿 세로 |
| `md` | 900px ~ | 태블릿 가로 / 소형 데스크탑 |
| `lg` | 1200px ~ | 데스크탑 |
| `xl` | 1536px ~ | 대형 화면 |

```jsx
// 반응형 sx 예시
sx={{
  fontSize: { xs: '1rem', md: '1.25rem' },
  px: { xs: 2, md: 4 },
}}
```

---

## 아이콘 사용

`@mui/icons-material` 패키지 사용

```jsx
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';

<IconButton>
  <SearchIcon />
</IconButton>
```

---

## 다크모드

`ThemeContext.jsx`의 `AppThemeProvider`를 통해 라이트/다크 모드 전환 지원.  
`useThemeMode()` 훅으로 현재 모드 확인 및 토글 가능.
