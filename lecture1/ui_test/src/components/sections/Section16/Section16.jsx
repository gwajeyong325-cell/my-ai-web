import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { Box, Typography, IconButton, Chip, Paper } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import SwipeIcon from '@mui/icons-material/Swipe'

const SLIDES = [
  {
    id: 1,
    title: 'React',
    subtitle: '컴포넌트 기반 UI 라이브러리',
    gradient: 'linear-gradient(135deg, #61dafb 0%, #1565c0 100%)',
    emoji: '⚛️',
  },
  {
    id: 2,
    title: 'TypeScript',
    subtitle: '정적 타입의 JavaScript',
    gradient: 'linear-gradient(135deg, #3178c6 0%, #0d2137 100%)',
    emoji: '🔷',
  },
  {
    id: 3,
    title: 'Material UI',
    subtitle: 'Google Material Design 기반 컴포넌트',
    gradient: 'linear-gradient(135deg, #007fff 0%, #003d7a 100%)',
    emoji: '🎨',
  },
  {
    id: 4,
    title: 'Vite',
    subtitle: '차세대 프론트엔드 빌드 도구',
    gradient: 'linear-gradient(135deg, #bd34fe 0%, #ff3d00 100%)',
    emoji: '⚡',
  },
  {
    id: 5,
    title: 'Node.js',
    subtitle: 'JavaScript 서버 런타임',
    gradient: 'linear-gradient(135deg, #68a063 0%, #1a3a1a 100%)',
    emoji: '🟢',
  },
]

function Section16() {
  const [index, setIndex] = useState(0)
  const [swipeDir, setSwipeDir] = useState(null)

  const goPrev = () => setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  const goNext = () => setIndex((prev) => (prev + 1) % SLIDES.length)

  const handlers = useSwipeable({
    onSwipedLeft: () => { setSwipeDir('← 왼쪽'); goNext() },
    onSwipedRight: () => { setSwipeDir('오른쪽 →'); goPrev() },
    onSwipeStart: () => setSwipeDir(null),
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  const slide = SLIDES[index]

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Swipe
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        슬라이드를 터치/마우스로 스와이프하거나 버튼을 클릭하세요.
      </Typography>

      {/* 슬라이드 영역 */}
      <Box sx={{ position: 'relative', userSelect: 'none' }} {...handlers}>
        <Paper
          elevation={3}
          sx={{
            height: 240,
            borderRadius: 3,
            background: slide.gradient,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            overflow: 'hidden',
            cursor: 'grab',
            '&:active': { cursor: 'grabbing' },
            transition: 'background 0.4s ease',
          }}
        >
          <Typography sx={{ fontSize: 56, lineHeight: 1 }}>{slide.emoji}</Typography>
          <Typography variant="h2" color="white" sx={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            {slide.title}
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.85)">
            {slide.subtitle}
          </Typography>
        </Paper>

        {/* 이전 버튼 */}
        <IconButton
          onClick={goPrev}
          sx={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.85)',
            '&:hover': { bgcolor: 'white' },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        {/* 다음 버튼 */}
        <IconButton
          onClick={goNext}
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.85)',
            '&:hover': { bgcolor: 'white' },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* 인디케이터 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
        {SLIDES.map((s, i) => (
          <Box
            key={s.id}
            onClick={() => setIndex(i)}
            sx={{
              width: i === index ? 24 : 8,
              height: 8,
              borderRadius: 4,
              bgcolor: i === index ? 'primary.main' : 'action.disabled',
              cursor: 'pointer',
              transition: 'width 0.3s, background-color 0.3s',
            }}
          />
        ))}
      </Box>

      {/* 상태 표시 */}
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <Chip
          label={`${index + 1} / ${SLIDES.length}`}
          color="primary"
          size="small"
        />
        {swipeDir && (
          <Chip
            icon={<SwipeIcon />}
            label={`스와이프: ${swipeDir}`}
            variant="outlined"
            size="small"
            color="secondary"
          />
        )}
        <Typography variant="caption" color="text.disabled">
          trackMouse: 마우스 드래그로도 스와이프 가능
        </Typography>
      </Box>
    </Box>
  )
}

export default Section16
