import { useState } from 'react'
import { Box, Typography, Slider, Paper, LinearProgress } from '@mui/material'

const MARKS = [
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
]

function getProgressColor(value) {
  if (value <= 30) return 'error'
  if (value <= 60) return 'warning'
  return 'success'
}

function getValueLabel(value) {
  if (value <= 30) return '낮음'
  if (value <= 60) return '보통'
  if (value <= 80) return '높음'
  return '최대'
}

function Section07() {
  const [value, setValue] = useState(40)
  const [rangeValue, setRangeValue] = useState([20, 70])

  const handleChange = (_, newValue) => setValue(newValue)
  const handleRangeChange = (_, newValue) => setRangeValue(newValue)

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Slider
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {/* 단일 슬라이더 */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              단일 슬라이더
            </Typography>
            <Paper
              variant="outlined"
              sx={{ px: 1.5, py: 0.25, borderRadius: 1, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Typography variant="body2" fontWeight={600} color="primary.main">
                {value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                / 100 · {getValueLabel(value)}
              </Typography>
            </Paper>
          </Box>

          <Slider
            value={value}
            onChange={handleChange}
            min={0}
            max={100}
            marks={MARKS}
            valueLabelDisplay="auto"
            color="primary"
            sx={{ width: '90%', ml: 1 }}
          />

          <Box sx={{ mt: 1, width: '90%', ml: 1 }}>
            <LinearProgress
              variant="determinate"
              value={value}
              color={getProgressColor(value)}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        </Box>

        {/* 범위 슬라이더 */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              범위 슬라이더
            </Typography>
            <Paper
              variant="outlined"
              sx={{ px: 1.5, py: 0.25, borderRadius: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <Typography variant="body2" fontWeight={600} color="secondary.main">
                {rangeValue[0]}
              </Typography>
              <Typography variant="caption" color="text.secondary">~</Typography>
              <Typography variant="body2" fontWeight={600} color="secondary.main">
                {rangeValue[1]}
              </Typography>
            </Paper>
          </Box>

          <Slider
            value={rangeValue}
            onChange={handleRangeChange}
            min={0}
            max={100}
            marks={MARKS}
            valueLabelDisplay="auto"
            color="secondary"
            sx={{ width: '90%', ml: 1 }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Section07
