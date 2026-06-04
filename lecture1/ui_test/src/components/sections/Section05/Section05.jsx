import { useState } from 'react'
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  Chip,
  Paper,
} from '@mui/material'

const ITEMS = [
  { value: 'html', label: 'HTML / CSS' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'nodejs', label: 'Node.js' },
]

function Section05() {
  const [checked, setChecked] = useState([])

  const isAllChecked = checked.length === ITEMS.length
  const isIndeterminate = checked.length > 0 && checked.length < ITEMS.length

  const handleToggleAll = () => {
    setChecked(isAllChecked ? [] : ITEMS.map((item) => item.value))
  }

  const handleToggleItem = (value) => {
    setChecked((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Checkbox
      </Typography>

      <Box sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box>
          <FormControlLabel
            label={
              <Typography variant="body1" fontWeight={500}>
                전체 선택
              </Typography>
            }
            control={
              <Checkbox
                checked={isAllChecked}
                indeterminate={isIndeterminate}
                onChange={handleToggleAll}
                color="primary"
              />
            }
          />

          <Divider sx={{ my: 1 }} />

          <FormGroup sx={{ pl: 1 }}>
            {ITEMS.map((item) => (
              <FormControlLabel
                key={item.value}
                label={item.label}
                control={
                  <Checkbox
                    checked={checked.includes(item.value)}
                    onChange={() => handleToggleItem(item.value)}
                    color="primary"
                  />
                }
              />
            ))}
          </FormGroup>
        </Box>

        <Paper
          variant="outlined"
          sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover', alignSelf: 'flex-start', minWidth: 200 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Typography variant="caption" color="text.secondary">
              선택된 항목
            </Typography>
            <Chip
              label={`${checked.length} / ${ITEMS.length}`}
              size="small"
              color={checked.length === 0 ? 'default' : 'primary'}
            />
          </Box>

          {checked.length === 0 ? (
            <Typography variant="body2" color="text.disabled">
              선택된 항목 없음
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {ITEMS.filter((item) => checked.includes(item.value)).map((item) => (
                <Typography key={item.value} variant="body2">
                  • {item.label}
                </Typography>
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  )
}

export default Section05
