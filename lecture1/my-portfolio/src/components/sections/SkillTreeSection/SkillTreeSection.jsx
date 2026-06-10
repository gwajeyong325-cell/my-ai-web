import { Box, Typography, LinearProgress, Chip, Card, CardContent, Grid } from '@mui/material'
import CodeIcon from '@mui/icons-material/Code'

const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React',      level: 0, note: '% 입력 예정' },
      { name: 'JavaScript', level: 0, note: '% 입력 예정' },
      { name: 'TypeScript', level: 0, note: '% 입력 예정' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js',  level: 0, note: '% 입력 예정' },
      { name: 'Python',   level: 0, note: '% 입력 예정' },
    ],
  },
  {
    category: 'Tools & Others',
    skills: [
      { name: 'Git',   level: 0, note: '% 입력 예정' },
      { name: 'Figma', level: 0, note: '% 입력 예정' },
    ],
  },
]

function SkillTreeSection() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 3, md: 6 },
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ maxWidth: 900, width: '100%', textAlign: 'center' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3, color: '#aaaaaa' }}>
          <CodeIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaaaaa' }}>
            Skill Tree
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, fontWeight: 700, mb: 2, color: '#111111' }}
        >
          여기는 Skill Tree 섹션입니다.
        </Typography>

        <Typography variant="body1" sx={{ color: '#666666', mb: 8 }}>
          기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
        </Typography>

        <Grid container spacing={3}>
          {skillGroups.map((group) => (
            <Grid item xs={12} md={4} key={group.category}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  backgroundColor: '#fafafa',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.10)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Chip
                    label={group.category}
                    size="small"
                    sx={{
                      mb: 3,
                      borderRadius: 1,
                      backgroundColor: '#111111',
                      color: '#ffffff',
                      fontWeight: 500,
                      fontSize: '0.72rem',
                      letterSpacing: '0.05em',
                    }}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {group.skills.map((skill) => (
                      <Box key={skill.name}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#111111', fontWeight: 500 }}>
                            {skill.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#aaaaaa' }}>
                            {skill.note}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={skill.level}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: 'rgba(0,0,0,0.08)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#111111',
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default SkillTreeSection
