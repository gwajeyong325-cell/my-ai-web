import { Box, Typography, Card, CardContent, Chip } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

function AboutPage() {
  return (
    <Box
      sx={{
        pt: '64px',
        minHeight: '100vh',
        background: '#f7f7f7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: { xs: 3, md: 6 },
        py: 10,
      }}
    >
      <Box sx={{ maxWidth: 800, width: '100%' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3, color: '#aaaaaa' }}>
          <PersonIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaaaaa' }}>
            About Me
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
          About Me 페이지
        </Typography>

        <Card
          sx={{
            mb: 4,
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
              About Me 페이지가 개발될 공간입니다.
            </Typography>
            <Typography variant="body1" sx={{ color: '#666666', lineHeight: 2 }}>
              상세한 자기소개가 들어갈 예정입니다.
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaaaaa', mt: 2, fontStyle: 'italic' }}>
              경력 타임라인, 상세 기술 스택, 취미·관심사, 자기소개 에세이 등이 이 페이지를 채울 예정입니다.
            </Typography>
          </CardContent>
        </Card>

        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px dashed rgba(0,0,0,0.15)',
            background: '#fafafa',
          }}
        >
          <Typography variant="body2" sx={{ color: '#aaaaaa', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', mb: 1.5 }}>
            예정 콘텐츠
          </Typography>
          <Box component="ul" sx={{ mt: 1, pl: 2 }}>
            {[
              '자세한 자기소개 에세이',
              '경력 및 학력 타임라인',
              '기술 스택 상세 설명',
              '취미 & 관심사',
              '다운로드 가능한 이력서',
            ].map((item) => (
              <li key={item}>
                <Typography variant="body2" sx={{ color: '#666666', mb: 0.5 }}>
                  {item}
                </Typography>
              </li>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AboutPage
