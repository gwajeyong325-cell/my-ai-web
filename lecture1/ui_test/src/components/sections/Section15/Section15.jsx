import { Box, Typography, Grid } from '@mui/material'

function HoverCard({ label, desc, children }) {
  return (
    <Box>
      <Box
        sx={{
          height: 140,
          borderRadius: 2,
          overflow: 'hidden',
          cursor: 'pointer',
          mb: 1.5,
        }}
      >
        {children}
      </Box>
      <Typography variant="body2" fontWeight={600}>{label}</Typography>
      <Typography variant="caption" color="text.secondary">{desc}</Typography>
    </Box>
  )
}

function Section15() {
  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Hover Effects
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        각 카드에 마우스를 올려 효과를 확인하세요.
      </Typography>

      <Grid container spacing={3}>

        {/* 1. 배경색 전환 */}
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <HoverCard label="배경색 전환" desc="색상이 부드럽게 변경">
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.light',
                transition: 'background-color 0.4s ease',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              <Typography color="white" fontWeight={600} variant="body2">
                Color
              </Typography>
            </Box>
          </HoverCard>
        </Grid>

        {/* 2. 크기 확대 */}
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <HoverCard label="크기 확대" desc="scale로 확대">
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'secondary.light',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.12)' },
              }}
            >
              <Typography color="white" fontWeight={600} variant="body2">
                Scale
              </Typography>
            </Box>
          </HoverCard>
        </Grid>

        {/* 3. 그림자 깊이 */}
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <HoverCard label="그림자 깊이" desc="elevation 증가">
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 1,
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                '&:hover': {
                  boxShadow: 10,
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Typography fontWeight={600} variant="body2" color="text.primary">
                Shadow
              </Typography>
            </Box>
          </HoverCard>
        </Grid>

        {/* 4. 테두리 글로우 */}
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <HoverCard label="테두리 글로우" desc="outline + glow 효과">
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#1a1a2e',
                border: '2px solid transparent',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                '&:hover': {
                  borderColor: '#00bcd4',
                  boxShadow: '0 0 16px 4px rgba(0,188,212,0.45)',
                },
              }}
            >
              <Typography color="#00bcd4" fontWeight={600} variant="body2">
                Glow
              </Typography>
            </Box>
          </HoverCard>
        </Grid>

        {/* 5. 오버레이 슬라이드 */}
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <HoverCard label="오버레이 슬라이드" desc="hover 시 정보 표시">
            <Box
              sx={{
                height: '100%',
                position: 'relative',
                bgcolor: 'success.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover .overlay': { transform: 'translateY(0)' },
              }}
            >
              <Typography color="white" fontWeight={600} variant="body2">
                Overlay
              </Typography>
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'rgba(0,0,0,0.75)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'translateY(100%)',
                  transition: 'transform 0.35s ease',
                }}
              >
                <Typography color="white" variant="caption" textAlign="center" px={1}>
                  숨겨진 정보가 나타납니다
                </Typography>
              </Box>
            </Box>
          </HoverCard>
        </Grid>

        {/* 6. 기울기 회전 */}
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <HoverCard label="기울기 회전" desc="rotate + 색상 변화">
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'warning.main',
                transition: 'transform 0.3s ease, background-color 0.3s',
                '&:hover': {
                  transform: 'rotate(-6deg) scale(1.06)',
                  bgcolor: 'warning.dark',
                },
              }}
            >
              <Typography color="white" fontWeight={600} variant="body2">
                Rotate
              </Typography>
            </Box>
          </HoverCard>
        </Grid>

      </Grid>
    </Box>
  )
}

export default Section15
