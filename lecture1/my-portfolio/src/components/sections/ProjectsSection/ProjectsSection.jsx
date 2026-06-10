import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material'
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

const placeholderProjects = [
  { id: 1, title: '프로젝트 1', desc: '프로젝트 설명이 들어갈 예정입니다.' },
  { id: 2, title: '프로젝트 2', desc: '프로젝트 설명이 들어갈 예정입니다.' },
  { id: 3, title: '프로젝트 3', desc: '프로젝트 설명이 들어갈 예정입니다.' },
]

function ProjectsSection() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 3, md: 6 },
        background: '#f2f2f2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ maxWidth: 1000, width: '100%', textAlign: 'center' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3, color: '#aaaaaa' }}>
          <FolderSpecialIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaaaaa' }}>
            Projects
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, fontWeight: 700, mb: 2, color: '#111111' }}
        >
          여기는 Projects 섹션입니다.
        </Typography>

        <Typography variant="body1" sx={{ color: '#666666', mb: 8 }}>
          대표작 썸네일 3–4개와 '더 보기' 버튼이 들어갈 예정입니다.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {placeholderProjects.map((project) => (
            <Grid item xs={12} md={4} key={project.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <Box
                  sx={{
                    height: 180,
                    background: `#e8e8e8`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#aaaaaa', fontStyle: 'italic' }}>
                    썸네일 이미지 예정
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h3" sx={{ fontSize: '1rem', fontWeight: 600, color: '#111111' }}>
                      {project.title}
                    </Typography>
                    <OpenInNewIcon sx={{ fontSize: 16, color: '#aaaaaa' }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: '#888888' }}>
                    {project.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Button variant="outlined" color="primary" size="large" sx={{ px: 5, borderRadius: 0 }}>
          더 보기
        </Button>
      </Box>
    </Box>
  )
}

export default ProjectsSection
