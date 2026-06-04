import { useState } from 'react'
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Chip,
} from '@mui/material'

const OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt.js' },
]

function Section04() {
  const [selected, setSelected] = useState('')

  const handleChange = (e) => {
    setSelected(e.target.value)
  }

  const selectedLabel = OPTIONS.find((opt) => opt.value === selected)?.label

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Dropdown (Select)
      </Typography>

      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FormControl sx={{ width: 280 }}>
          <InputLabel id="framework-label">프레임워크 선택</InputLabel>
          <Select
            labelId="framework-label"
            value={selected}
            label="프레임워크 선택"
            onChange={handleChange}
          >
            {OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Paper
          variant="outlined"
          sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover', width: 'fit-content' }}
        >
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            선택된 값
          </Typography>
          {selected ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label={selectedLabel} color="primary" size="small" />
              <Typography variant="body2" color="text.secondary">
                ({selected})
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

export default Section04
