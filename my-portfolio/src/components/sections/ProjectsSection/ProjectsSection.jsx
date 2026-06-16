import { useState, memo } from 'react'
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
import ArrowForwardIcon  from '@mui/icons-material/ArrowForward'
import OpenInNewIcon     from '@mui/icons-material/OpenInNew'
import BrushIcon         from '@mui/icons-material/Brush'
import { useNavigate }   from 'react-router-dom'
import { usePortfolio }  from '../../../context/PortfolioContext'

// ─── 썸네일 이미지 (lazy + 에러 처리) ─────────────────────────────────────────

const ThumbnailImage = memo(function ThumbnailImage({ src, alt }) {
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
          <BrushIcon sx={{ color: '#cccccc', fontSize: 32 }} />
        </Box>
      )}
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
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
})

// ─── Featured 카드 (홈 전용 컴팩트) ─────────────────────────────────────────────

const FeaturedCard = memo(function FeaturedCard({ project }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        backgroundColor: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        transition: 'box-shadow 0.25s ease',
        '&:hover': { boxShadow: '0 8px 32px rgba(0,0,0,0.12)' },
        '&:hover img': { transform: 'scale(1.04)' },
      }}
    >
      {/* 썸네일 */}
      <Box sx={{ width: { xs: '100%', md: '52%' }, flexShrink: 0, overflow: 'hidden' }}>
        <ThumbnailImage src={project.thumbnail_url} alt={project.title} />
      </Box>

      {/* 텍스트 */}
      <Box sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
        <Box>
          <Chip
            label="Featured"
            size="small"
            sx={{ mb: 2, borderRadius: 1, backgroundColor: '#111111', color: '#ffffff', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.06em' }}
          />
          <Typography variant="h3" sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 700, color: '#111111', mb: 1.5, lineHeight: 1.4 }}>
            {project.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#666666', lineHeight: 1.8, mb: 2.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {project.description}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2.5 }}>
            {(project.tech_stack || []).slice(0, 4).map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{ borderRadius: 1, border: '1px solid rgba(0,0,0,0.15)', backgroundColor: 'transparent', color: '#444444', fontSize: '0.7rem', fontWeight: 500, height: 24 }}
              />
            ))}
          </Box>
          {project.category && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <BrushIcon sx={{ fontSize: 13, color: '#aaaaaa' }} />
              <Typography variant="caption" sx={{ color: '#888888', fontWeight: 500 }}>{project.category}</Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 3 }}>
          {project.detail_url && (
            <Button
              variant="contained"
              size="small"
              endIcon={<OpenInNewIcon sx={{ fontSize: '0.85rem !important' }} />}
              href={project.detail_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} 상세 보기`}
              sx={{ minHeight: 36 }}
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
              aria-label={`${project.title} 프로토타입`}
              sx={{ minHeight: 36 }}
            >
              Prototype
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
})

// ─── 미리보기 카드 (홈 그리드용) ────────────────────────────────────────────────

const PreviewCard = memo(function PreviewCard({ project }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        backgroundColor: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 28px rgba(0,0,0,0.10)' },
        '&:hover img': { transform: 'scale(1.05)' },
      }}
    >
      <Box sx={{ overflow: 'hidden' }}>
        <ThumbnailImage src={project.thumbnail_url} alt={project.title} />
      </Box>
      <Box sx={{ p: 2.5 }}>
        <Typography variant="h6" sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#111111', mb: 1, lineHeight: 1.4 }}>
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#666666', fontSize: '0.82rem', lineHeight: 1.7, mb: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {(project.tech_stack || []).slice(0, 3).map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{ borderRadius: 1, border: '1px solid rgba(0,0,0,0.12)', backgroundColor: 'transparent', color: '#555555', fontSize: '0.68rem', height: 22 }}
            />
          ))}
        </Box>
        {project.detail_url && (
          <Button
            variant="text"
            size="small"
            endIcon={<OpenInNewIcon sx={{ fontSize: '0.8rem !important' }} />}
            href={project.detail_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} 보기`}
            sx={{ color: '#111111', fontWeight: 600, fontSize: '0.78rem', p: 0, minHeight: 0, '&:hover': { backgroundColor: 'transparent', opacity: 0.7 } }}
          >
            View
          </Button>
        )}
      </Box>
    </Box>
  )
})

// ─── 스켈레톤 ──────────────────────────────────────────────────────────────────

function FeaturedSkeleton() {
  return (
    <Box sx={{ borderRadius: 3, backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Skeleton variant="rectangular" sx={{ width: { xs: '100%', md: '52%' }, aspectRatio: '4/3', flexShrink: 0 }} />
      <Box sx={{ p: 4, flexGrow: 1 }}>
        <Skeleton variant="rounded" width={70} height={22} sx={{ mb: 2, borderRadius: 1 }} />
        <Skeleton variant="text" width="75%" height={30} sx={{ mb: 1.5 }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          {[60, 80, 55].map((w) => <Skeleton key={w} variant="rounded" width={w} height={24} sx={{ borderRadius: 1 }} />)}
        </Box>
        <Skeleton variant="rounded" width={110} height={36} sx={{ borderRadius: 1 }} />
      </Box>
    </Box>
  )
}

function PreviewSkeleton() {
  return (
    <Box sx={{ borderRadius: 3, backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '4/3' }} />
      <Box sx={{ p: 2.5 }}>
        <Skeleton variant="text" width="70%" height={22} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" sx={{ mb: 1.5 }} />
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {[55, 65, 50].map((w) => <Skeleton key={w} variant="rounded" width={w} height={22} sx={{ borderRadius: 1 }} />)}
        </Box>
      </Box>
    </Box>
  )
}

// ─── 메인 섹션 ──────────────────────────────────────────────────────────────────

const ProjectsSection = memo(function ProjectsSection() {
  const navigate = useNavigate()
  const { homeProjects, projectsLoading, projectsError } = usePortfolio()
  const { featured, previews } = homeProjects

  const isEmpty = !projectsLoading && !projectsError && !featured && previews.length === 0

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 3, md: 6 },
        background: '#f2f2f2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ maxWidth: 1000, width: '100%' }}>

        {/* ── 헤더 ── */}
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <FolderSpecialIcon sx={{ fontSize: 16, color: '#aaaaaa' }} aria-hidden="true" />
          <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaaaaa' }}>
            Projects
          </Typography>
        </Box>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, fontWeight: 700, mb: 2, color: '#111111' }}>
          작업물
        </Typography>
        <Typography variant="body2" sx={{ color: '#aaaaaa', mb: 6, fontStyle: 'italic' }}>
          대표 프로젝트 · 전체 목록은 Projects 탭에서 확인
        </Typography>

        {/* ── 에러 ── */}
        {projectsError && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>{projectsError}</Alert>
        )}

        {/* ── 로딩 ── */}
        {projectsLoading && (
          <>
            <Box sx={{ mb: 4 }}><FeaturedSkeleton /></Box>
            <Grid container spacing={3} sx={{ mb: 5 }}>
              {[1, 2, 3].map((n) => (
                <Grid item xs={12} sm={6} md={4} key={n}><PreviewSkeleton /></Grid>
              ))}
            </Grid>
          </>
        )}

        {/* ── 빈 상태 ── */}
        {isEmpty && (
          <Box sx={{ textAlign: 'center', py: 10, color: '#aaaaaa' }}>
            <FolderSpecialIcon sx={{ fontSize: 40, mb: 1.5, opacity: 0.3 }} />
            <Typography variant="body2">아직 등록된 프로젝트가 없습니다.</Typography>
          </Box>
        )}

        {/* ── Featured ── */}
        {!projectsLoading && featured && (
          <Box sx={{ mb: 5 }}>
            <FeaturedCard project={featured} />
          </Box>
        )}

        {/* ── Preview Grid ── */}
        {!projectsLoading && previews.length > 0 && (
          <>
            <Typography variant="caption" sx={{ color: '#aaaaaa', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', mb: 2.5 }}>
              More Projects
            </Typography>
            <Grid container spacing={3} sx={{ mb: 5 }}>
              {previews.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <PreviewCard project={project} />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* ── 전체 보기 버튼 ── */}
        {!projectsLoading && !isEmpty && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/projects')}
              aria-label="전체 작업물 보기"
              sx={{ px: 5 }}
            >
              전체 작업물 보기
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
})

export default ProjectsSection
