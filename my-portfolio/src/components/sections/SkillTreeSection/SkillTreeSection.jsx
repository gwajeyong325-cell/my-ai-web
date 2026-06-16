import { useState, useEffect, memo } from 'react'
import { Box, Typography, LinearProgress, Card, CardContent, Grid, Chip, Button } from '@mui/material'
import CodeIcon         from '@mui/icons-material/Code'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate }  from 'react-router-dom'
import { usePortfolio } from '../../../context/PortfolioContext'

const CATEGORY_COLORS = {
  Design:           '#111111',
  Frontend:         '#444444',
  Framework:        '#666666',
  Backend:          '#333333',
  'Tools & Others': '#555555',
}

const SkillCard = memo(function SkillCard({ skill, animated }) {
  const barColor = CATEGORY_COLORS[skill.category] ?? '#555555'

  return (
    <Card
      sx={{
        borderRadius: 3,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(0,0,0,0.10)' },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#111111', fontSize: '0.95rem' }}>
            {skill.name}
          </Typography>
          <Chip
            label={skill.category}
            size="small"
            sx={{
              borderRadius: 1,
              backgroundColor: barColor,
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.65rem',
              letterSpacing: '0.04em',
              height: 20,
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <LinearProgress
            variant="determinate"
            value={animated ? skill.level : 0}
            sx={{
              flex: 1,
              height: 5,
              borderRadius: 3,
              backgroundColor: 'rgba(0,0,0,0.07)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: barColor,
                borderRadius: 3,
                transition: 'transform 1.2s ease !important',
              },
            }}
          />
          <Typography variant="caption" sx={{ color: '#888888', minWidth: 28, textAlign: 'right' }}>
            {skill.level}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
})

const SkillTreeSection = memo(function SkillTreeSection() {
  const navigate            = useNavigate()
  const { homeData }        = usePortfolio()
  const { topSkills }       = homeData
  const [animated, setAnim] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnim(true), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 3, md: 6 },
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ maxWidth: 900, width: '100%' }}>

        {/* ── 헤더 ── */}
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <CodeIcon sx={{ fontSize: 16, color: '#aaaaaa' }} />
          <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaaaaa' }}>
            Skill Tree
          </Typography>
        </Box>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, fontWeight: 700, mb: 2, color: '#111111' }}>
          기술 스택
        </Typography>
        <Typography variant="body2" sx={{ color: '#aaaaaa', mb: 6, fontStyle: 'italic' }}>
          숙련도 상위 4개 스킬 · 전체 목록은 About Me에서 관리
        </Typography>

        {/* ── 상위 4개 스킬 ── */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {topSkills.map((skill) => (
            <Grid item xs={12} sm={6} key={skill.id}>
              <SkillCard skill={skill} animated={animated} />
            </Grid>
          ))}
        </Grid>

        {/* ── 전체 스킬 보기 버튼 ── */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/about')}
            sx={{
              px: 5,
            }}
          >
            전체 스킬 보기
          </Button>
        </Box>
      </Box>
    </Box>
  )
})

export default SkillTreeSection
