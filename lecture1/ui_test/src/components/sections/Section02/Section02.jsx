import { useState } from 'react'
import { Box, TextField, Typography, Paper } from '@mui/material'

const FIELDS = [
  { variant: 'standard', label: 'Standard', placeholder: '표준 입력' },
  { variant: 'outlined', label: 'Outlined', placeholder: '테두리 입력' },
  { variant: 'filled', label: 'Filled', placeholder: '채워진 입력' },
]

function Section02() {
  const [values, setValues] = useState({ standard: '', outlined: '', filled: '' })

  const handleChange = (variant) => (e) => {
    setValues((prev) => ({ ...prev, [variant]: e.target.value }))
  }

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Input (TextField)
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 2 }}>
        {FIELDS.map(({ variant, label, placeholder }) => (
          <Box key={variant}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              variant="{variant}"
            </Typography>
            <TextField
              variant={variant}
              label={label}
              placeholder={placeholder}
              value={values[variant]}
              onChange={handleChange(variant)}
              sx={{ width: 280 }}
            />
          </Box>
        ))}
      </Box>

      <Paper
        variant="outlined"
        sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: 'action.hover' }}
      >
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          실시간 입력값
        </Typography>
        {FIELDS.map(({ variant, label }) => (
          <Typography key={variant} variant="body2" sx={{ lineHeight: 2 }}>
            <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>
              {label}:
            </Box>
            {values[variant] || '—'}
          </Typography>
        ))}
      </Paper>
    </Box>
  )
}

export default Section02
