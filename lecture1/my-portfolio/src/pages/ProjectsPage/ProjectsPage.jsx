import { Box, Typography, Card, CardContent, Chip, Grid } from '@mui/material'
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'

function ProjectsPage() {
  return (
    <Box
      sx={{
        pt: '64px',
        minHeight: '100vh',
        background: '#f2f2f2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: { xs: 3, md: 6 },
        py: 10,
      }}
    >
      <Box sx={{ maxWidth: 1000, width: '100%' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3, color: '#aaaaaa' }}>
          <FolderSpecialIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaaaaa' }}>
            Projects
          </Typography>
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 700,
            mb: 6,
            color: '#111111',
          }}
        >
          Projects 페이지
        </Typography>

        <Card
          sx={{
            mb: 6,
            borderRadius: 3,
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
          }}
        >
          <CardContent sx={{ p: { xs: 4, md: 6 } }}>
            <Chip
              label="개발 중"
              size="small"
              sx={{
                mb: 3,
                borderRadius: 1,
                backgroundColor: '#111111',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.72rem',
                letterSpacing: '0.05em',
              }}
            />
            <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#111111', mb: 2 }}>
              Projects 페이지가 개발될 공간입니다.
            </Typography>
            <Typography variant="body1" sx={{ color: '#666666', lineHeight: 2 }}>
              포트폴리오 작품들이 들어갈 예정입니다.
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaaaaa', mt: 2, fontStyle: 'italic' }}>
              필터링, 카테고리, 상세 모달, 라이브 데모 링크 등이 추가될 예정입니다.
            </Typography>
          </CardContent>
        </Card>

        <Typography variant="body2" sx={{ color: '#aaaaaa', mb: 3, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          프로젝트 슬롯 미리보기
        </Typography>

        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Grid item xs={12} sm={6} md={4} key={n}>
              <Box
                sx={{
                  height: 200,
                  borderRadius: 3,
                  border: '1px dashed rgba(0,0,0,0.15)',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 1,
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    borderColor: 'rgba(0,0,0,0.35)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <Typography variant="body2" sx={{ color: '#aaaaaa' }}>
                  프로젝트 {n}
                </Typography>
                <Typography variant="caption" sx={{ color: '#cccccc', fontStyle: 'italic' }}>
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
