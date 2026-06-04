import { Box, Container, Typography, Divider } from '@mui/material'
import Section01 from './components/sections/Section01/Section01'
import Section02 from './components/sections/Section02/Section02'
import Section03 from './components/sections/Section03/Section03'
import Section04 from './components/sections/Section04/Section04'
import Section05 from './components/sections/Section05/Section05'
import Section06 from './components/sections/Section06/Section06'
import Section07 from './components/sections/Section07/Section07'
import Section09 from './components/sections/Section09/Section09'
import Section10 from './components/sections/Section10/Section10'
import Section11 from './components/sections/Section11/Section11'

const sections = [
  { id: 'section-01', label: 'Section 01 — Button', component: <Section01 /> },
  { id: 'section-02', label: 'Section 02 — Input', component: <Section02 /> },
  { id: 'section-03', label: 'Section 03 — Navigation', component: <Section03 /> },
  { id: 'section-04', label: 'Section 04 — Dropdown', component: <Section04 /> },
  { id: 'section-05', label: 'Section 05 — Checkbox', component: <Section05 /> },
  { id: 'section-06', label: 'Section 06 — Radio', component: <Section06 /> },
  { id: 'section-07', label: 'Section 07 — Slider', component: <Section07 /> },
  { id: 'section-09', label: 'Section 09 — Card', component: <Section09 /> },
  { id: 'section-10', label: 'Section 10 — Drag & Drop', component: <Section10 /> },
  { id: 'section-11', label: 'Section 11 — Scroll', component: <Section11 /> },
  // Section 12 ~ 16 추가 예정
]

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box
        component="header"
        sx={{
          py: 4,
          px: 3,
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          mb: 2,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
          UI Component Test
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          MUI 컴포넌트 16개 섹션 테스트 페이지
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {sections.map((section, index) => (
          <Box key={section.id}>
            <Box
              component="section"
              id={section.id}
              sx={{ py: 4 }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}
              >
                {section.label}
              </Typography>
              {section.component}
            </Box>
            {index < sections.length - 1 && (
              <Divider />
            )}
          </Box>
        ))}
      </Container>
    </Box>
  )
}

export default App
