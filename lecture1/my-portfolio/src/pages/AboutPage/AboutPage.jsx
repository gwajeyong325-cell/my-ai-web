import { Box, Typography, Card, CardContent, Chip } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

function AboutPage() {
  return (
    <Box
      sx={{
        pt: '64px',
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(26, 63, 160, 0.25) 0%, transparent 50%),
          #050818
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: { xs: 3, md: 6 },
        py: 10,
      }}
    >
      <Box sx={{ maxWidth: 800, width: '100%' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3, color: '#E8520A' }}>
          <PersonIcon />
          <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            About Me
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
          About Me 페이지
        </Typography>

        <Card
          sx={{
            mb: 4,
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
              About Me 페이지가 개발될 공간입니다.
            </Typography>
            <Typography variant="body1" sx={{ color: '#B0B8CC', lineHeight: 2 }}>
              상세한 자기소개가 들어갈 예정입니다.
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7899', mt: 2, fontStyle: 'italic' }}>
              경력 타임라인, 상세 기술 스택, 취미·관심사, 자기소개 에세이 등이 이 페이지를 채울 예정입니다.
            </Typography>
          </CardContent>
        </Card>

        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            border: '1px dashed rgba(232, 82, 10, 0.3)',
            background: 'rgba(232, 82, 10, 0.04)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Typography variant="body2" sx={{ color: '#F4A24D', fontWeight: 500 }}>
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
                <Typography variant="body2" sx={{ color: '#B0B8CC', mb: 0.5 }}>
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
