import { Box, Typography, Button, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ArrowForwardIcon      from '@mui/icons-material/ArrowForward'
import GitHubIcon            from '@mui/icons-material/GitHub'

// ─── 스태거 애니메이션 ───────────────────────────────────────────────────────────
const anim = (delay) => ({
  opacity: 0,
  animation: 'fadeSlideUp 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards',
  animationDelay: delay,
  '@keyframes fadeSlideUp': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to:   { opacity: 1, transform: 'translateY(0)' },
  },
})

// ─── 소셜 링크 데이터 ────────────────────────────────────────────────────────────
const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/gwajeyong325-cell',
    icon: <GitHubIcon sx={{ fontSize: 18 }} />,
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/gwajeyong325',
    icon: <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, lineHeight: 1 }}>Bē</Typography>,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/xiuoyz',
    icon: <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, lineHeight: 1, letterSpacing: '0.02em' }}>IG</Typography>,
  },
]

// ─── 소셜 아이콘 버튼 공통 스타일 ───────────────────────────────────────────────
const socialSx = {
  width:  { xs: 48, md: 44 },   // 모바일: 터치 타겟 48px 확보
  height: { xs: 48, md: 44 },
  border: '1px solid rgba(0,0,0,0.15)',
  borderRadius: '10px',
  color: '#888888',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '#111111',
    borderColor: '#111111',
    backgroundColor: 'transparent',
    transform: 'translateY(-2px)',
  },
}

function HeroSection() {
  const theme    = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))   // < 600px

  const scrollToWork    = () => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  const scrollToContact = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // 브레이크포인트별 수평 패딩
        px: { xs: 2.5, sm: 4, md: 6, lg: 8 },
        background: 'linear-gradient(150deg, #ffffff 0%, #f8f8f8 55%, #f0f0f0 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* ── 배경 장식 ─────────────────────────────────────────── */}

      {/* 도트 그리드 (좌상단) */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0,
        width: { xs: '70%', sm: '55%', md: '40%' },
        height: { xs: '35%', sm: '42%', md: '48%' },
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)',
        backgroundSize: { xs: '16px 16px', md: '20px 20px' },
        maskImage: 'radial-gradient(ellipse at top left, black 10%, transparent 60%)',
        WebkitMaskImage: 'radial-gradient(ellipse at top left, black 10%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* 큰 원 (우상단) */}
      <Box sx={{
        position: 'absolute',
        top:   { xs: -80,  sm: -120, md: -160 },
        right: { xs: -80,  sm: -110, md: -110 },
        width:  { xs: 220, sm: 340,  md: 520 },
        height: { xs: 220, sm: 340,  md: 520 },
        borderRadius: '50%',
        border: '1.5px solid rgba(0,0,0,0.06)',
        pointerEvents: 'none',
      }} />

      {/* 중간 원 (우상단) */}
      <Box sx={{
        position: 'absolute',
        top:   { xs: -30,  sm: -55,  md: -55 },
        right: { xs: -30,  sm: -30,  md: -10 },
        width:  { xs: 130, sm: 210,  md: 310 },
        height: { xs: 130, sm: 210,  md: 310 },
        borderRadius: '50%',
        border: '1px solid rgba(0,0,0,0.04)',
        pointerEvents: 'none',
      }} />

      {/* 작은 원 (좌하단) — 모바일에서는 숨김 */}
      <Box sx={{
        display: { xs: 'none', sm: 'block' },
        position: 'absolute',
        bottom: { sm: 60, md: 80 },
        left:   { sm: -50, md: -50 },
        width:  { sm: 160, md: 240 },
        height: { sm: 160, md: 240 },
        borderRadius: '50%',
        border: '1px solid rgba(0,0,0,0.05)',
        pointerEvents: 'none',
      }} />

      {/* 점 클러스터 (우하단) — 태블릿 이상만 */}
      {[[0, 0, 5], [20, -18, 3], [40, 4, 3], [12, -36, 3]].map(([x, y, size], i) => (
        <Box key={i} sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          bottom: 155 + y, right: 90 + x,
          width: size, height: size,
          borderRadius: '50%',
          backgroundColor: `rgba(0,0,0,${0.14 - i * 0.025})`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* 하단 가로선 */}
      <Box sx={{
        position: 'absolute',
        left: { xs: '5%', md: '8%' }, right: { xs: '5%', md: '8%' },
        bottom: { xs: '12%', md: '15%' },
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.07) 30%, rgba(0,0,0,0.07) 70%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── 메인 콘텐츠 ──────────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        // 브레이크포인트별 최대 너비
        maxWidth: { xs: '100%', sm: 520, md: 640, lg: 720 },
      }}>

        {/* 역할 레이블 */}
        <Box sx={{ ...anim('0.05s'), mb: { xs: 4, sm: 5, md: 6 } }}>
          <Typography sx={{
            fontSize: { xs: '0.62rem', sm: '0.65rem', md: '0.68rem' },
            fontWeight: 500,
            // 모바일에서 letter-spacing 축소 (넘침 방지)
            letterSpacing: { xs: '0.14em', sm: '0.18em', md: '0.22em' },
            textTransform: 'uppercase',
            color: '#999999',
          }}>
            UI/UX Designer
          </Typography>
        </Box>

        {/* 헤드라인 */}
        <Box sx={{ ...anim('0.22s'), mb: { xs: 4, sm: 5, md: 6 } }}>
          <Typography
            component="h1"
            sx={{
              // 데스크탑 h1 → 모바일 h2 수준으로 축소
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem', lg: '3.75rem' },
              fontWeight: 700,
              lineHeight: { xs: 1.3, md: 1.2 },
              color: '#111111',
              letterSpacing: { xs: '-0.01em', md: '-0.02em' },
              // 영문 단어 단위 줄바꿈
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            Making complex experiences
            <br />
            feel simple
          </Typography>
        </Box>

        {/* 이름 · 소속 */}
        <Box sx={{ ...anim('0.40s'), mb: { xs: 5, sm: 6, md: 7 } }}>
          <Box sx={{
            width: 28,
            height: '1px',
            backgroundColor: 'rgba(0,0,0,0.15)',
            mx: 'auto',
            mb: { xs: 2, md: 3 },
          }} />
          <Typography sx={{
            fontSize: { xs: '0.75rem', sm: '0.78rem', md: '0.8rem' },
            color: '#aaaaaa',
            letterSpacing: { xs: '0.03em', md: '0.06em' },
          }}>
            박수영&nbsp;&nbsp;·&nbsp;&nbsp;계명대학교 시각디자인학과
          </Typography>
        </Box>

        {/* ── 주요 / 보조 CTA 버튼 ── */}
        <Box sx={{
          ...anim('0.54s'),
          display: 'flex',
          // 모바일: 세로 스택 / 태블릿 이상: 가로 배치
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1.5, sm: 2 },
          justifyContent: 'center',
          alignItems: 'center',
          mb: { xs: 3, md: 3 },
        }}>
          {/* Primary CTA */}
          <Button
            variant="contained"
            color="primary"
            // 모바일: medium, 태블릿+: large
            size={isMobile ? 'medium' : 'large'}
            endIcon={<ArrowForwardIcon />}
            onClick={scrollToWork}
            sx={{
              px: { xs: 3, sm: 4, md: 5 },
              // 모바일: 전체 너비, 데스크탑: 자동
              width: { xs: '100%', sm: 'auto' },
              // 터치 타겟 44px 이상 확보
              minHeight: { xs: 48, sm: 44 },
            }}
          >
            포트폴리오 둘러보기
          </Button>

          {/* Secondary CTA */}
          <Button
            variant="outlined"
            color="primary"
            size={isMobile ? 'medium' : 'large'}
            onClick={scrollToContact}
            sx={{
              px: { xs: 3, sm: 4 },
              width: { xs: '100%', sm: 'auto' },
              minHeight: { xs: 48, sm: 44 },
            }}
          >
            연락하기
          </Button>
        </Box>

        {/* ── 소셜 링크 ── */}
        <Box sx={{
          ...anim('0.66s'),
          display: 'flex',
          gap: { xs: 2, sm: 1.5 },
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {SOCIALS.map(({ label, href, icon }) => (
            <Tooltip key={label} title={label} arrow>
              <IconButton
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                sx={socialSx}
              >
                {icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Box>

      {/* ── 스크롤 인디케이터 ─────────────────────────────── */}
      <Box
        role="button"
        tabIndex={0}
        onClick={scrollToWork}
        onKeyDown={(e) => e.key === 'Enter' && scrollToWork()}
        aria-label="다음 섹션으로 스크롤"
        sx={{
          position: 'absolute',
          bottom: { xs: 20, md: 28 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          color: '#cccccc',
          cursor: 'pointer',
          // 터치 타겟 확보
          p: 1,
          opacity: 0,
          animation: 'fadeIn 0.5s ease forwards',
          animationDelay: '1.4s',
          transition: 'color 0.2s',
          '&:hover': { color: '#888888' },
          '@keyframes fadeIn': { to: { opacity: 1 } },
        }}
      >
        <Typography variant="caption" sx={{
          letterSpacing: '0.12em',
          fontSize: { xs: '0.55rem', md: '0.6rem' },
        }}>
          SCROLL
        </Typography>
        <Box sx={{
          animation: 'bounceY 2s ease-in-out infinite',
          '@keyframes bounceY': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%':       { transform: 'translateY(6px)' },
          },
        }}>
          <KeyboardArrowDownIcon sx={{ fontSize: { xs: 16, md: 18 }, display: 'block' }} />
        </Box>
      </Box>
    </Box>
  )
}

export default HeroSection
