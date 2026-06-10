import { Box, Typography, Button, Chip } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: { xs: 3, md: 6 },
        background: '#ffffff',
        position: 'relative',
      }}
    >
      <Chip
        label="Hero 섹션"
        size="small"
        sx={{
          mb: 4,
          backgroundColor: '#111111',
          color: '#ffffff',
          fontWeight: 600,
          letterSpacing: '0.1em',
          fontSize: '0.7rem',
        }}
      />

      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
          fontWeight: 700,
          lineHeight: 1.1,
          mb: 3,
          color: '#111111',
        }}
      >
        여기는 Hero 섹션입니다.
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: '#666666',
          maxWidth: 600,
          mb: 2,
          fontSize: { xs: '1rem', md: '1.2rem' },
          lineHeight: 1.8,
        }}
      >
        메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: '#aaaaaa',
          maxWidth: 500,
          mb: 6,
          fontStyle: 'italic',
        }}
      >
        이름 · 직업 · 한 줄 소개가 이 공간을 채울 예정입니다.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
        >
          Projects 보기
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
        >
          About Me
        </Button>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          color: '#aaaaaa',
          animation: 'bounce 2s infinite',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(8px)' },
          },
        }}
      >
        <Typography variant="caption">Scroll down</Typography>
        <KeyboardArrowDownIcon fontSize="small" />
      </Box>
    </Box>
  )
}

export default HeroSection
