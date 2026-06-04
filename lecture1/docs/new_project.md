# New Project

새로운 React + Vite + MUI 프로젝트를 시작할 때의 절차를 정리한 가이드입니다.

---

## 1. 템플릿 복사

`_template_settings/` 디렉토리를 새 프로젝트 폴더로 복사합니다.

```powershell
# 예시: project-name 폴더로 복사
cp -r _template_settings project-name
cd project-name
```

---

## 2. 패키지 설치

```bash
npm install
```

### 포함된 주요 패키지
| 패키지 | 버전 | 용도 |
|---|---|---|
| `react` | ^18.3.1 | UI 프레임워크 |
| `react-dom` | ^18.3.1 | DOM 렌더링 |
| `react-router-dom` | ^7.16.0 | 클라이언트 라우팅 |
| `@mui/material` | ^9.0.1 | UI 컴포넌트 |
| `@mui/icons-material` | ^9.0.1 | 아이콘 |
| `@emotion/react` | ^11.14.0 | MUI 스타일링 엔진 |
| `@emotion/styled` | ^11.14.1 | MUI 스타일링 엔진 |
| `@fontsource/roboto` | ^5.2.10 | Roboto 폰트 |

---

## 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

---

## 4. 프로젝트 구조 초기화

### 테마 수정 (`src/theme.js`)
```js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },   // 프로젝트 메인 색상으로 변경
    secondary: { main: '#dc004e' },
  },
});

export default theme;
```

### 라우터 설정 (`src/App.jsx`)
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 첫 페이지 생성 (`src/pages/HomePage/HomePage.jsx`)
```jsx
import { Box, Typography } from '@mui/material';

function HomePage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h1">홈페이지</Typography>
    </Box>
  );
}

export default HomePage;
```

---

## 5. GitHub 저장소 연결

```bash
# 저장소 생성 (gh CLI)
gh repo create [저장소명] --public --description "[설명]"

# 초기 커밋 및 푸시
git init
git add .
git commit -m "초기 프로젝트 설정"
git branch -M main
git remote add origin https://github.com/[사용자명]/[저장소명].git
git push -u origin main
```

---

## 6. GitHub Pages 배포

### 배포 워크플로우 생성 (`.github/workflows/deploy.yml`)
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Pages 활성화
```bash
gh api repos/[사용자명]/[저장소명]/pages -X PUT -f build_type=workflow
```

### `vite.config.js` base 설정 (서브 경로 배포 시)
```js
export default defineConfig({
  plugins: [react()],
  base: '/[저장소명]/',
})
```

---

## 7. 개발 체크리스트

- [ ] `npm install` 완료
- [ ] `npm run dev` 정상 실행
- [ ] `src/theme.js` 프로젝트 색상으로 수정
- [ ] `src/App.jsx` 라우터 구성
- [ ] 첫 페이지 컴포넌트 생성
- [ ] GitHub 저장소 연결
- [ ] GitHub Pages 배포 확인
- [ ] `docs/design-system.md` 디자인 시스템 확인
- [ ] `docs/code-convention.md` 코드 컨벤션 확인
