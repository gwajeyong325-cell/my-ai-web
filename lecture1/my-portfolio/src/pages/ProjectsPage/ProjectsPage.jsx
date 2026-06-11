import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Chip,
  Grid,
  Button,
  Skeleton,
  Alert,
} from '@mui/material'
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import BrushIcon from '@mui/icons-material/Brush'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import { supabase } from '../../lib/supabaseClient'

function ThumbnailImage({ src, alt }) {
  const [status, setStatus] = useState('loading')

  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '4/3',
        overflow: 'hidden',
        position: 'relative',
        background: '#e8e8e8',
      }}
    >
      {status === 'loading' && (
        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ position: 'absolute', top: 0, left: 0 }} />
      )}
      {status === 'error' && (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="caption" sx={{ color: '#aaaaaa' }}>이미지를 불러올 수 없습니다</Typography>
        </Box>
      )}
      <Box
        component="img"
        src={src}
        alt={alt}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: status === 'loaded' ? 'block' : 'none',
          transition: 'transform 0.4s ease',
        }}
      />
    </Box>
  )
}

function ProjectCard({ project, featured = false }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        backgroundColor: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: featured ? '0 4px 24px rgba(0,0,0,0.08)' : '0 2px 12px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: featured ? { xs: 'column', md: 'row' } : 'column',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        },
        '&:hover img': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box
        sx={{
          width: featured ? { xs: '100%', md: '55%' } : '100%',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <ThumbnailImage src={project.thumbnail_url} alt={project.title} />
      </Box>

      <Box
        sx={{
          p: featured ? { xs: 3, md: 4 } : 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          minHeight: featured ? { md: 300 } : 'auto',
        }}
      >
        <Box>
          {featured && (
            <Chip
              label="Featured"
              size="small"
              sx={{
                mb: 2,
                borderRadius: 1,
                backgroundColor: '#111111',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.7rem',
                letterSpacing: '0.06em',
              }}
            />
          )}

          <Typography
            variant="h3"
            sx={{
              fontSize: featured ? { xs: '1.1rem', md: '1.35rem' } : '1rem',
              fontWeight: 700,
              color: '#111111',
              mb: 1.5,
              lineHeight: 1.4,
            }}
          >
            {project.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#666666',
              lineHeight: 1.7,
              mb: 2.5,
              display: '-webkit-box',
              WebkitLineClamp: featured ? 4 : 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2.5 }}>
            {(project.tech_stack || []).map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  borderRadius: 1,
                  border: '1px solid rgba(0,0,0,0.15)',
                  backgroundColor: 'transparent',
                  color: '#444444',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  height: 24,
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            {project.period && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarTodayIcon sx={{ fontSize: 13, color: '#aaaaaa' }} />
                <Typography variant="caption" sx={{ color: '#888888', fontWeight: 500 }}>
                  {project.period}
                </Typography>
              </Box>
            )}
            {project.project_type && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PersonIcon sx={{ fontSize: 13, color: '#aaaaaa' }} />
                <Typography variant="caption" sx={{ color: '#888888', fontWeight: 500 }}>
                  {project.project_type}
                </Typography>
              </Box>
            )}
            {project.category && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <BrushIcon sx={{ fontSize: 13, color: '#aaaaaa' }} />
                <Typography variant="caption" sx={{ color: '#888888', fontWeight: 500 }}>
                  {project.category}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          {project.detail_url && (
            <Button
              variant="contained"
              size="small"
              endIcon={<OpenInNewIcon sx={{ fontSize: '0.85rem !important' }} />}
              href={project.detail_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: '#111111',
                color: '#ffffff',
                borderRadius: 1,
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                px: 2,
                py: 0.75,
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#333333', boxShadow: 'none' },
                minHeight: 44,
              }}
            >
              View Details
            </Button>
          )}
          {project.figma_url && (
            <Button
              variant="outlined"
              size="small"
              endIcon={<OpenInNewIcon sx={{ fontSize: '0.85rem !important' }} />}
              href={project.figma_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderColor: 'rgba(0,0,0,0.25)',
                color: '#444444',
                borderRadius: 1,
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                px: 2,
                py: 0.75,
                '&:hover': { borderColor: '#111111', color: '#111111', backgroundColor: 'transparent' },
                minHeight: 44,
              }}
            >
              Prototype
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

function CardSkeleton({ featured = false }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        backgroundColor: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: featured ? { xs: 'column', md: 'row' } : 'column',
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          width: featured ? { xs: '100%', md: '55%' } : '100%',
          aspectRatio: '4/3',
          flexShrink: 0,
        }}
      />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Skeleton variant="rounded" width={70} height={22} sx={{ mb: 2, borderRadius: 1 }} />
        <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="90%" height={16} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          {[80, 60, 70].map((w) => (
            <Skeleton key={w} variant="rounded" width={w} height={24} sx={{ borderRadius: 1 }} />
          ))}
        </Box>
        <Skeleton variant="rounded" width={110} height={36} sx={{ borderRadius: 1 }} />
      </Box>
    </Box>
  )
}

function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })

      if (error) {
        setError('프로젝트를 불러오는 중 오류가 발생했습니다.')
      } else {
        setProjects(data || [])
      }
      setLoading(false)
    }
    fetchProjects()
  }, [])

  const featured = projects.find((p) => p.is_featured)
  const rest = projects.filter((p) => !p.is_featured)

  return (
    <Box
      sx={{
        pt: '64px',
        minHeight: '100vh',
        background: '#f2f2f2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: { xs: 3, md: 6 },
        py: 10,
      }}
    >
      <Box sx={{ maxWidth: 1100, width: '100%' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3, color: '#aaaaaa' }}>
          <FolderSpecialIcon sx={{ fontSize: 16 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaaaaa' }}
          >
            Projects
          </Typography>
        </Box>

        <Typography
          variant="h1"
          sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, mb: 2, color: '#111111' }}
        >
          작업물
        </Typography>
        <Typography variant="body1" sx={{ color: '#666666', mb: 8, maxWidth: 520 }}>
          직접 설계하고 구현한 프로젝트들입니다. 각 프로젝트의 문제 정의부터 결과물까지 확인할 수 있습니다.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <>
            <Box sx={{ mb: 6 }}>
              <CardSkeleton featured />
            </Box>
            <Grid container spacing={3}>
              {[1, 2].map((n) => (
                <Grid item xs={12} sm={6} md={4} key={n}>
                  <CardSkeleton />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <>
            {featured && (
              <Box sx={{ mb: 6 }}>
                <ProjectCard project={featured} featured />
              </Box>
            )}

            {rest.length > 0 && (
              <>
                <Typography
                  variant="body2"
                  sx={{ color: '#aaaaaa', mb: 3, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}
                >
                  More Projects
                </Typography>
                <Grid container spacing={3}>
                  {rest.map((project) => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                      <ProjectCard project={project} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            {projects.length === 0 && !error && (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 12,
                  color: '#aaaaaa',
                }}
              >
                <FolderSpecialIcon sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
                <Typography variant="body1">아직 등록된 프로젝트가 없습니다.</Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

export default ProjectsPage
