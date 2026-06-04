import { Box, Button, Typography, Stack } from '@mui/material'

const VARIANTS = ['contained', 'outlined', 'text']
const COLORS = ['primary', 'secondary', 'error']

function Section01() {
  const handleClick = (variant, color) => {
    alert(`${variant} / ${color} 버튼 클릭!`)
  }

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Button
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
        {VARIANTS.map((variant) => (
          <Box key={variant}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              variant="{variant}"
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {COLORS.map((color) => (
                <Button
                  key={color}
                  variant={variant}
                  color={color}
                  onClick={() => handleClick(variant, color)}
                >
                  {color}
                </Button>
              ))}
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Section01
