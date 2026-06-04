import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
} from '@mui/material'

const CARDS = [
  {
    id: 1,
    title: 'React 완벽 가이드',
    description: '컴포넌트 기반 UI 라이브러리 React의 핵심 개념과 훅(Hook)을 처음부터 배워보세요.',
    tag: 'React',
    gradient: 'linear-gradient(135deg, #61dafb 0%, #1976d2 100%)',
    tagColor: 'info',
  },
  {
    id: 2,
    title: 'TypeScript 입문',
    description: '정적 타입으로 더 안전한 JavaScript를 작성하는 방법을 단계별로 알아봅니다.',
    tag: 'TypeScript',
    gradient: 'linear-gradient(135deg, #3178c6 0%, #1a3a5c 100%)',
    tagColor: 'primary',
  },
  {
    id: 3,
    title: 'MUI 컴포넌트',
    description: 'Material Design 기반의 UI 컴포넌트 라이브러리로 빠르게 아름다운 UI를 만드세요.',
    tag: 'MUI',
    gradient: 'linear-gradient(135deg, #007fff 0%, #0059b3 100%)',
    tagColor: 'primary',
  },
  {
    id: 4,
    title: 'Node.js 백엔드',
    description: 'JavaScript로 서버를 구축하는 Node.js의 기초부터 REST API 설계까지 다룹니다.',
    tag: 'Node.js',
    gradient: 'linear-gradient(135deg, #68a063 0%, #3c6e3c 100%)',
    tagColor: 'success',
  },
]

function Section09() {
  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Card
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {CARDS.map((card) => (
          <Grid key={card.id} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 2,
                transition: 'box-shadow 0.25s, transform 0.25s',
                '&:hover': {
                  boxShadow: 8,
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  height: 120,
                  background: card.gradient,
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 1.5,
                }}
              >
                <Chip label={card.tag} size="small" color={card.tagColor} />
              </CardMedia>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h3" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button size="small" variant="contained" color="primary">
                  자세히 보기
                </Button>
                <Button size="small" variant="text" color="inherit">
                  저장
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Section09
