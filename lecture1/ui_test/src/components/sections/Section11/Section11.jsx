import { useState, useRef } from 'react'
import { Box, Typography, Paper, Fab, Fade, Divider, Chip } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const ARTICLES = [
  {
    id: 1,
    title: 'React란 무엇인가?',
    date: '2024-01-05',
    body: 'React는 Facebook이 만든 UI 라이브러리입니다. 컴포넌트 기반 구조로 재사용성이 높고, 가상 DOM(Virtual DOM)을 통해 효율적인 렌더링을 제공합니다.',
    tag: 'React',
  },
  {
    id: 2,
    title: 'useState 훅 이해하기',
    date: '2024-01-12',
    body: 'useState는 함수형 컴포넌트에서 상태를 관리할 수 있게 해주는 훅입니다. 초기값을 인자로 받아 현재 상태와 업데이트 함수를 반환합니다.',
    tag: 'Hooks',
  },
  {
    id: 3,
    title: 'useEffect 완벽 가이드',
    date: '2024-01-19',
    body: 'useEffect는 컴포넌트의 사이드 이펙트를 처리합니다. 데이터 패칭, 구독 설정, DOM 조작 등을 의존성 배열과 함께 제어할 수 있습니다.',
    tag: 'Hooks',
  },
  {
    id: 4,
    title: 'MUI 컴포넌트 활용법',
    date: '2024-01-26',
    body: 'Material UI는 Google의 Material Design을 기반으로 한 React 컴포넌트 라이브러리입니다. sx prop을 통해 테마 토큰을 활용한 빠른 스타일링이 가능합니다.',
    tag: 'MUI',
  },
  {
    id: 5,
    title: 'CSS Flexbox 정리',
    date: '2024-02-02',
    body: 'Flexbox는 1차원 레이아웃 모델로, 아이템을 행 또는 열 방향으로 정렬합니다. justify-content, align-items, gap 등의 속성으로 유연한 배치가 가능합니다.',
    tag: 'CSS',
  },
  {
    id: 6,
    title: 'TypeScript 기초',
    date: '2024-02-09',
    body: 'TypeScript는 JavaScript에 정적 타입을 추가한 언어입니다. 인터페이스, 제네릭, 유니온 타입 등을 활용하면 더 안전하고 예측 가능한 코드를 작성할 수 있습니다.',
    tag: 'TypeScript',
  },
  {
    id: 7,
    title: 'Vite로 빠른 개발 환경 구성',
    date: '2024-02-16',
    body: 'Vite는 ES 모듈을 활용해 번들링 없이 빠른 HMR을 제공합니다. Create React App 대비 훨씬 빠른 개발 서버 시작과 빌드 속도를 자랑합니다.',
    tag: 'Tools',
  },
]

function Section11() {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef(null)

  const handleScroll = () => {
    setScrollTop(containerRef.current?.scrollTop ?? 0)
  }

  const handleScrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showTopButton = scrollTop > 80

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Scroll
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          스크롤 위치:
        </Typography>
        <Chip label={`${Math.round(scrollTop)}px`} size="small" color={showTopButton ? 'primary' : 'default'} />
        {showTopButton && (
          <Typography variant="caption" color="primary.main">
            ↓ Top 버튼 활성화
          </Typography>
        )}
      </Box>

      <Box sx={{ position: 'relative' }}>
        <Paper
          ref={containerRef}
          variant="outlined"
          onScroll={handleScroll}
          sx={{
            height: 300,
            overflowY: 'auto',
            p: 2,
            borderRadius: 2,
          }}
        >
          {ARTICLES.map((article, index) => (
            <Box key={article.id}>
              <Box sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Chip label={article.tag} size="small" variant="outlined" />
                  <Typography variant="caption" color="text.disabled">
                    {article.date}
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ mb: 0.5 }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.body}
                </Typography>
              </Box>
              {index < ARTICLES.length - 1 && <Divider />}
            </Box>
          ))}
        </Paper>

        <Fade in={showTopButton}>
          <Fab
            size="small"
            color="primary"
            onClick={handleScrollToTop}
            sx={{ position: 'absolute', bottom: 12, right: 12 }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Fade>
      </Box>
    </Box>
  )
}

export default Section11
