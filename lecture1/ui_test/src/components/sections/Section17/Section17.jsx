import { Box, Typography } from '@mui/material'

const NAV_ITEMS = ['홈', '소개', '상품', '연락처', '설정']

function Section17() {
  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Flex Navigation
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '60px',
          bgcolor: '#2d3748',
          px: 3,
          borderRadius: 1,
          boxSizing: 'border-box',
        }}
      >
        {/* 로고 박스 */}
        <Box>
          <Typography
            sx={{
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            MyWebsite
          </Typography>
        </Box>

        {/* 메뉴 박스 */}
        <Box sx={{ display: 'flex', gap: '15px' }}>
          {NAV_ITEMS.map((item) => (
            <Typography
              key={item}
              sx={{
                color: '#cbd5e0',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'color 0.2s',
                '&:hover': { color: '#ffffff' },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Section17
