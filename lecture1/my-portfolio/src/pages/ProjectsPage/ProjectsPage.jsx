import { Box, Typography, Card, CardContent, Chip, Grid } from '@mui/material'
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'

function ProjectsPage() {
  return (
    <Box
      sx={{
        pt: '64px',
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse at 80% 20%, rgba(26, 63, 160, 0.2) 0%, transparent 50%),
          #050818
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: { xs: 3, md: 6 },
        py: 10,
      }}
    >
      <Box sx={{ maxWidth: 1000, width: '100%' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3, color: '#E8520A' }}>
          <FolderSpecialIcon />
          <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Projects
          </Typography>
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 700,
            mb: 6,
            background: 'linear-gradient(135deg, #FFFFFF 50%, #B0B8CC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Projects 페이지
        </Typography>

        <Card
          sx={{
            mb: 6,
            borderRadius: 4,
            background: 'rgba(13, 26, 92, 0.35)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <CardContent sx={{ p: { xs: 4, md: 6 } }}>
            <Chip
              label="개발 중"
              size="small"
              sx={{
                mb: 3,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #E8520A 0%, #F4A24D 100%)',
                color: '#FFFFFF',
                fontWeight: 600,
              }}
            />
            <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', mb: 2 }}>
              Projects 페이지가 개발될 공간입니다.
            </Typography>
            <Typography variant="body1" sx={{ color: '#B0B8CC', lineHeight: 2 }}>
              포트폴리오 작품들이 들어갈 예정입니다.
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7899', mt: 2, fontStyle: 'italic' }}>
              필터링, 카테고리, 상세 모달, 라이브 데모 링크 등이 추가될 예정입니다.
            </Typography>
          </CardContent>
        </Card>

        <Typography variant="body2" sx={{ color: '#6B7899', mb: 3, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          프로젝트 슬롯 미리보기
        </Typography>

        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Grid item xs={12} sm={6} md={4} key={n}>
              <Box
                sx={{
                  height: 200,
                  borderRadius: 4,
                  border: '1px dashed rgba(255,255,255,0.10)',
                  background: 'rgba(13, 26, 92, 0.2)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 1,
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    borderColor: 'rgba(232, 82, 10, 0.35)',
                    boxShadow: '0 0 20px rgba(232, 82, 10, 0.08)',
                  },
                }}
              >
                <Typography variant="body2" sx={{ color: '#6B7899' }}>
                  프로젝트 {n}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(107, 120, 153, 0.5)', fontStyle: 'italic' }}>
                  작품 추가 예정
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default ProjectsPage
