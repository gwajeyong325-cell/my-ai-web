import { useState } from 'react'
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  Chip,
} from '@mui/material'

const OPTIONS = [
  { value: 'beginner', label: '입문자', description: '코딩을 막 시작했어요' },
  { value: 'junior', label: '주니어', description: '1~3년 경력' },
  { value: 'mid', label: '미드레벨', description: '3~5년 경력' },
  { value: 'senior', label: '시니어', description: '5년 이상 경력' },
]

const CHIP_COLOR = {
  beginner: 'default',
  junior: 'info',
  mid: 'warning',
  senior: 'success',
}

function Section06() {
  const [selected, setSelected] = useState('')

  const handleChange = (e) => {
    setSelected(e.target.value)
  }

  const selectedOption = OPTIONS.find((opt) => opt.value === selected)

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Radio
      </Typography>

      <Box sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <FormControl>
          <FormLabel sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}>
            개발자 경력 수준을 선택하세요
          </FormLabel>
          <RadioGroup value={selected} onChange={handleChange}>
            {OPTIONS.map((opt) => (
              <FormControlLabel
                key={opt.value}
                value={opt.value}
                label={
                  <Box>
                    <Typography variant="body1">{opt.label}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {opt.description}
                    </Typography>
                  </Box>
                }
                control={<Radio color="primary" />}
                sx={{ alignItems: 'flex-start', mb: 0.5 }}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Paper
          variant="outlined"
          sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover', alignSelf: 'flex-start', minWidth: 200 }}
        >
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            선택된 옵션
          </Typography>
          {selectedOption ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Chip
                label={selectedOption.label}
                color={CHIP_COLOR[selected]}
                size="small"
                sx={{ alignSelf: 'flex-start' }}
              />
              <Typography variant="body2" color="text.secondary">
                {selectedOption.description}
              </Typography>
              <Typography variant="caption" color="text.disabled">
                value: "{selected}"
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" color="text.disabled">
              선택된 항목 없음
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  )
}

export default Section06
