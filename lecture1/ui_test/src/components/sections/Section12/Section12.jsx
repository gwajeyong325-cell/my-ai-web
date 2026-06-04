import { useState } from 'react'
import { Box, Typography, Button, Paper, Grid, Fade, Grow, Slide, Chip } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const KEYFRAMES = {
  bounce: {
    '@keyframes bounce': {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-24px)' },
    },
    animation: 'bounce 0.7s ease infinite',
  },
  spin: {
    '@keyframes spin': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
    animation: 'spin 1s linear infinite',
  },
  pulse: {
    '@keyframes pulse': {
      '0%, 100%': { transform: 'scale(1)', opacity: 1 },
      '50%': { transform: 'scale(1.25)', opacity: 0.7 },
    },
    animation: 'pulse 0.9s ease-in-out infinite',
  },
}

function PreviewBox({ children }) {
  return (
    <Box
      sx={{
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'action.hover',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  )
}

function AnimBox({ color = 'primary.main', label }) {
  return (
    <Box
      sx={{
        width: 60,
        height: 60,
        borderRadius: 2,
        bgcolor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="caption" color="white" fontWeight={600}>
        {label}
      </Typography>
    </Box>
  )
}

function Section12() {
  const [visible, setVisible] = useState({ fade: false, grow: false, slide: false })
  const [playing, setPlaying] = useState({ bounce: false, spin: false, pulse: false })

  const toggleVisible = (key) =>
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }))

  const togglePlaying = (key) =>
    setPlaying((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Animation
      </Typography>

      {/* MUI Transitions */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, mt: 2 }}>
        MUI 트랜지션
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {/* Fade */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Box>
                <Chip label="MUI" size="small" color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2" component="span" fontWeight={500}>Fade</Typography>
              </Box>
              <Button
                size="small"
                variant={visible.fade ? 'outlined' : 'contained'}
                startIcon={visible.fade ? <VisibilityOffIcon /> : <VisibilityIcon />}
                onClick={() => toggleVisible('fade')}
              >
                {visible.fade ? '숨기기' : '표시'}
              </Button>
            </Box>
            <PreviewBox>
              <Fade in={visible.fade} timeout={500}>
                <Box><AnimBox color="primary.main" label="Fade" /></Box>
              </Fade>
            </PreviewBox>
          </Paper>
        </Grid>

        {/* Grow */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Box>
                <Chip label="MUI" size="small" color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2" component="span" fontWeight={500}>Grow</Typography>
              </Box>
              <Button
                size="small"
                variant={visible.grow ? 'outlined' : 'contained'}
                startIcon={visible.grow ? <VisibilityOffIcon /> : <VisibilityIcon />}
                onClick={() => toggleVisible('grow')}
              >
                {visible.grow ? '숨기기' : '표시'}
              </Button>
            </Box>
            <PreviewBox>
              <Grow in={visible.grow} timeout={500}>
                <Box><AnimBox color="secondary.main" label="Grow" /></Box>
              </Grow>
            </PreviewBox>
          </Paper>
        </Grid>

        {/* Slide */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Box>
                <Chip label="MUI" size="small" color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2" component="span" fontWeight={500}>Slide ↑</Typography>
              </Box>
              <Button
                size="small"
                variant={visible.slide ? 'outlined' : 'contained'}
                startIcon={visible.slide ? <VisibilityOffIcon /> : <VisibilityIcon />}
                onClick={() => toggleVisible('slide')}
              >
                {visible.slide ? '숨기기' : '표시'}
              </Button>
            </Box>
            <PreviewBox>
              <Slide in={visible.slide} direction="up" timeout={400}>
                <Box><AnimBox color="success.main" label="Slide" /></Box>
              </Slide>
            </PreviewBox>
          </Paper>
        </Grid>
      </Grid>

      {/* CSS Animations */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        CSS 키프레임 애니메이션
      </Typography>
      <Grid container spacing={2}>
        {[
          { key: 'bounce', label: 'Bounce', color: 'warning.main' },
          { key: 'spin', label: 'Spin', color: 'info.main' },
          { key: 'pulse', label: 'Pulse', color: 'error.main' },
        ].map(({ key, label, color }) => (
          <Grid key={key} size={{ xs: 12, sm: 4 }}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Box>
                  <Chip label="CSS" size="small" color="warning" sx={{ mr: 1 }} />
                  <Typography variant="body2" component="span" fontWeight={500}>{label}</Typography>
                </Box>
                <Button
                  size="small"
                  variant={playing[key] ? 'outlined' : 'contained'}
                  color="warning"
                  startIcon={playing[key] ? <PauseIcon /> : <PlayArrowIcon />}
                  onClick={() => togglePlaying(key)}
                >
                  {playing[key] ? '정지' : '재생'}
                </Button>
              </Box>
              <PreviewBox>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    bgcolor: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...KEYFRAMES[key],
                    animationPlayState: playing[key] ? 'running' : 'paused',
                  }}
                >
                  <Typography variant="caption" color="white" fontWeight={600}>
                    {label}
                  </Typography>
                </Box>
              </PreviewBox>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Section12
