import { memo } from 'react'
import { Box, Typography, Button, Card, CardContent, Grid, Stack } from '@mui/material'
import PersonIcon          from '@mui/icons-material/Person'
import ArrowForwardIcon    from '@mui/icons-material/ArrowForward'
import PhotoCameraIcon     from '@mui/icons-material/PhotoCamera'
import { useNavigate }     from 'react-router-dom'
import { usePortfolio }    from '../../../context/PortfolioContext'

// ─── 메인 섹션 ──────────────────────────────────────────────────────────────────

const AboutMeSection = memo(function AboutMeSection() {
  const navigate = useNavigate()
  const { homeData } = usePortfolio()
  const { sections, basicInfo } = homeData

  const processSection = sections.find((s) => s.id === 'how-i-work')
  const beliefSection  = sections.find((s) => s.id === 'what-i-believe')

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 3, md: 6 },
        background: '#f7f7f7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ maxWidth: 1000, width: '100%' }}>

        {/* ── 헤더 ── */}
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <PersonIcon sx={{ fontSize: 16, color: '#aaaaaa' }} />
          <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaaaaa' }}>
            About Me
          </Typography>
        </Box>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, fontWeight: 700, mb: 6, color: '#111111' }}>
          About Me
        </Typography>

        {/* ── 2열 레이아웃: Design Process + 프로필 카드 ── */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start' }}>

          {/* 왼쪽: Design Process */}
          <Box sx={{ flex: 7, minWidth: 0 }}>
            {processSection ? (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Typography variant="caption" sx={{ color: '#aaaaaa', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {processSection.subtitle}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#111111', fontSize: '1rem' }}>
                    {processSection.title}
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {processSection.content.map((item) => (
                    <Grid item xs={12} sm={6} key={item.step}>
                      <Box
                        sx={{
                          p: 3,
                          border: '1px solid rgba(0,0,0,0.08)',
                          borderRadius: 2,
                          backgroundColor: '#ffffff',
                          height: '100%',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' },
                        }}
                      >
                        <Typography variant="caption" sx={{ color: '#cccccc', fontWeight: 700, letterSpacing: '0.12em' }}>
                          {item.step}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#111111', my: 0.5, fontSize: '0.95rem' }}>
                          {item.label}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666666', fontSize: '0.83rem' }}>
                          {item.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Box sx={{ p: 4, border: '1px dashed rgba(0,0,0,0.12)', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ color: '#aaaaaa' }}>
                  About Me 탭에서 Design Process를 설정해 주세요.
                </Typography>
              </Box>
            )}
          </Box>

          {/* 오른쪽: 프로필 카드 */}
          <Box sx={{ flex: 5, minWidth: 0 }}>
            <Card
              sx={{
                borderRadius: 3,
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* 프로필 사진 */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    border: '2px dashed rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    mb: 2,
                    backgroundColor: '#fafafa',
                  }}
                >
                  {basicInfo.photo ? (
                    <Box component="img" src={basicInfo.photo} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <PhotoCameraIcon sx={{ color: '#cccccc', fontSize: 28 }} />
                  )}
                </Box>

                {/* 이름 */}
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#111111', mb: 2, fontSize: '0.95rem' }}>
                  {basicInfo.name}
                </Typography>

                {/* 정보 행 */}
                <Stack spacing={1.2}>
                  {[
                    { label: '학력', value: basicInfo.education },
                    { label: '전공', value: basicInfo.major },
                    { label: '경력', value: basicInfo.experience },
                  ].map(({ label, value }) => (
                    <Box key={label} sx={{ display: 'flex', gap: 2, alignItems: 'baseline' }}>
                      <Typography variant="caption" sx={{ color: '#aaaaaa', fontWeight: 600, letterSpacing: '0.08em', minWidth: 28 }}>
                        {label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#555555', fontSize: '0.82rem' }}>
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* ── 하단: 디자인 철학 ── */}
        {beliefSection && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="caption" sx={{ color: '#aaaaaa', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', mb: 2 }}>
              {beliefSection.title}
            </Typography>
            <Box sx={{ borderLeft: '3px solid #111111', pl: 3, py: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  color: '#333333',
                  lineHeight: 2,
                  whiteSpace: 'pre-line',
                  fontStyle: 'italic',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                }}
              >
                {beliefSection.content}
              </Typography>
            </Box>
          </Box>
        )}

        {/* ── 더 알아보기 버튼 ── */}
        <Box sx={{ mt: 5 }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/about')}
            sx={{ px: 5 }}
          >
            더 알아보기
          </Button>
        </Box>
      </Box>
    </Box>
  )
})

export default AboutMeSection
