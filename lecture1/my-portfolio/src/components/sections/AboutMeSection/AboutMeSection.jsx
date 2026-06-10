import { Box, Typography, Button, Card, CardContent, Divider } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

function AboutMeSection() {
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
      <Box sx={{ maxWidth: 800, width: '100%', textAlign: 'center' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3, color: '#aaaaaa' }}>
          <PersonIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaaaaa' }}>
            About Me
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, fontWeight: 700, mb: 2, color: '#111111' }}
        >
          여기는 About Me 섹션입니다.
        </Typography>

        <Divider sx={{ borderColor: 'rgba(0,0,0,0.08)', mb: 5 }} />

        <Card
          sx={{
            textAlign: 'left',
            mb: 5,
            borderRadius: 3,
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography variant="body1" sx={{ color: '#444444', lineHeight: 2, fontSize: '1.05rem' }}>
              간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaaaaa', mt: 2, fontStyle: 'italic' }}>
              이름, 현재 역할, 관심사, 목표 등이 이 카드 안에 작성될 예정입니다.
            </Typography>
          </CardContent>
        </Card>

        <Button variant="contained" color="primary" size="large" sx={{ px: 5, borderRadius: 0 }}>
          더 알아보기
        </Button>
      </Box>
    </Box>
  )
}

export default AboutMeSection
