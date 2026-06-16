import { useState, useEffect, useRef, useCallback, memo } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material'
import PersonIcon       from '@mui/icons-material/Person'
import CodeIcon         from '@mui/icons-material/Code'
import ExpandMoreIcon   from '@mui/icons-material/ExpandMore'
import PhotoCameraIcon  from '@mui/icons-material/PhotoCamera'
import AddIcon          from '@mui/icons-material/Add'
import EditIcon         from '@mui/icons-material/Edit'
import CheckIcon        from '@mui/icons-material/Check'
import { usePortfolio } from '../../context/PortfolioContext'

// ─── 상수 ──────────────────────────────────────────────────────────────────────

const CATEGORY_COLORS = {
  Design:           { bg: '#111111', text: '#ffffff' },
  Frontend:         { bg: '#444444', text: '#ffffff' },
  Framework:        { bg: '#666666', text: '#ffffff' },
  Backend:          { bg: '#333333', text: '#ffffff' },
  'Tools & Others': { bg: '#555555', text: '#ffffff' },
}

const AVAILABLE_CATEGORIES = ['Design', 'Frontend', 'Framework', 'Backend', 'Tools & Others']

// ─── 섹션 콘텐츠 렌더러 ─────────────────────────────────────────────────────────

const SectionContent = memo(function SectionContent({ section, onUpdateContent, onSaved }) {
  const [editingStep, setEditingStep] = useState(null)
  const [editText, setEditText]       = useState('')

  const startEdit = (step, description) => {
    setEditingStep(step)
    setEditText(description)
  }

  const saveEdit = (stepId) => {
    const updated = section.content.map((c) =>
      c.step === stepId ? { ...c, description: editText } : c
    )
    onUpdateContent?.(updated)
    onSaved?.()
    setEditingStep(null)
  }

  const handleKeyDown = (e, stepId) => {
    if (e.key === 'Enter') { e.preventDefault(); saveEdit(stepId) }
    if (e.key === 'Escape') setEditingStep(null)
  }

  // ── 텍스트형 ──
  if (section.type === 'text') {
    return (
      <Box sx={{ borderLeft: '3px solid #111111', pl: 3, py: 1 }}>
        <Typography
          variant="body1"
          sx={{ color: '#333333', lineHeight: 2, fontSize: { xs: '1rem', md: '1.1rem' }, whiteSpace: 'pre-line', fontStyle: 'italic' }}
        >
          {section.content}
        </Typography>
      </Box>
    )
  }

  // ── 리스트형 ──
  if (section.type === 'list') {
    return (
      <Stack direction="row" flexWrap="wrap" gap={1.5} role="list">
        {section.content.map((item) => (
          <Chip
            key={item}
            label={item}
            role="listitem"
            sx={{
              borderRadius: 1,
              border: '1px solid rgba(0,0,0,0.18)',
              backgroundColor: 'transparent',
              color: '#111111',
              fontWeight: 500,
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
            }}
          />
        ))}
      </Stack>
    )
  }

  // ── 프로세스형 — 인라인 편집 지원 ──
  if (section.type === 'process') {
    return (
      <Grid container spacing={2}>
        {section.content.map((item) => (
          <Grid item xs={12} sm={6} key={item.step}>
            <Box
              sx={{
                p: 3,
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 2,
                backgroundColor: '#fafafa',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' },
                '&:hover .edit-btn': { opacity: 1 },
              }}
            >
              <Typography variant="caption" sx={{ color: '#aaaaaa', fontWeight: 700, letterSpacing: '0.12em' }}>
                {item.step}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#111111', my: 0.5, fontSize: '1rem' }}>
                {item.label}
              </Typography>

              {editingStep === item.step ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <TextField
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, item.step)}
                    size="small"
                    autoFocus
                    fullWidth
                    variant="standard"
                    inputProps={{ 'aria-label': `${item.label} 설명 편집` }}
                    sx={{ '& input': { fontSize: '0.875rem', color: '#444444' } }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => saveEdit(item.step)}
                    aria-label="저장"
                    sx={{ color: '#111111' }}
                  >
                    <CheckIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: '#666666', flex: 1 }}>
                    {item.description}
                  </Typography>
                  {onUpdateContent && (
                    <Tooltip title="설명 수정 (클릭)">
                      <IconButton
                        size="small"
                        className="edit-btn"
                        onClick={() => startEdit(item.step, item.description)}
                        aria-label={`${item.label} 설명 수정`}
                        sx={{ color: '#cccccc', '&:hover': { color: '#111111' }, opacity: 0, transition: 'opacity 0.15s' }}
                      >
                        <EditIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    )
  }

  return null
})

// ─── 스킬 바 ────────────────────────────────────────────────────────────────────

const SkillBar = memo(function SkillBar({ skill, animated, onEditLevel }) {
  const [hovered, setHovered] = useState(false)
  const color = CATEGORY_COLORS[skill.category] ?? CATEGORY_COLORS['Tools & Others']

  return (
    <Box onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
        <Typography variant="body2" sx={{ color: '#111111', fontWeight: 500 }}>
          {skill.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="caption" sx={{ color: '#888888' }}>{skill.level}%</Typography>
          {hovered && onEditLevel && (
            <Tooltip title="레벨 수정">
              <IconButton
                size="small"
                onClick={() => onEditLevel(skill)}
                aria-label={`${skill.name} 레벨 수정`}
                sx={{ color: '#aaaaaa', p: 0.25, '&:hover': { color: '#111111' } }}
              >
                <EditIcon sx={{ fontSize: 12 }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
      <LinearProgress
        variant="determinate"
        value={animated ? skill.level : 0}
        aria-label={`${skill.name} 숙련도 ${skill.level}%`}
        sx={{
          height: 5,
          borderRadius: 3,
          backgroundColor: 'rgba(0,0,0,0.07)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: color.bg,
            borderRadius: 3,
            transition: 'transform 1s ease !important',
          },
        }}
      />
    </Box>
  )
})

// ─── 스킬 추가 다이얼로그 ────────────────────────────────────────────────────────

const AddSkillDialog = memo(function AddSkillDialog({ open, onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', level: 50, category: 'Frontend' })
  const handleChange = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const handleAdd = () => {
    if (!form.name.trim()) return
    onAdd({ ...form, id: Date.now(), showAsMain: false })
    setForm({ name: '', level: 50, category: 'Frontend' })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth aria-labelledby="add-skill-title">
      <DialogTitle id="add-skill-title" sx={{ fontWeight: 700, color: '#111111' }}>스킬 추가</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <TextField
            label="기술명"
            value={form.name}
            onChange={handleChange('name')}
            fullWidth
            size="small"
            autoFocus
            inputProps={{ 'aria-required': true }}
          />
          <FormControl fullWidth size="small">
            <InputLabel>카테고리</InputLabel>
            <Select value={form.category} label="카테고리" onChange={handleChange('category')}>
              {AVAILABLE_CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
          <Box>
            <Typography variant="body2" sx={{ color: '#444444', mb: 1 }}>숙련도: {form.level}%</Typography>
            <Slider
              value={form.level}
              onChange={(_, v) => setForm((p) => ({ ...p, level: v }))}
              min={0} max={100} step={5} marks
              aria-label="숙련도"
              sx={{ color: '#111111' }}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ color: '#666666' }}>취소</Button>
        <Button onClick={handleAdd} variant="contained" disabled={!form.name.trim()}>추가</Button>
      </DialogActions>
    </Dialog>
  )
})

// ─── 스킬 레벨 편집 다이얼로그 ──────────────────────────────────────────────────

const EditLevelDialog = memo(function EditLevelDialog({ skill, onClose, onSave }) {
  const [level, setLevel] = useState(skill?.level ?? 50)

  useEffect(() => { if (skill) setLevel(skill.level) }, [skill])

  return (
    <Dialog open={Boolean(skill)} onClose={onClose} maxWidth="xs" fullWidth aria-labelledby="edit-level-title">
      <DialogTitle id="edit-level-title" sx={{ fontWeight: 700, color: '#111111' }}>
        {skill?.name} 레벨 수정
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Typography variant="body2" sx={{ color: '#444444', mb: 1 }}>숙련도: {level}%</Typography>
          <Slider
            value={level}
            onChange={(_, v) => setLevel(v)}
            min={0} max={100} step={5} marks
            aria-label={`${skill?.name ?? ''} 숙련도`}
            sx={{ color: '#111111' }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ color: '#666666' }}>취소</Button>
        <Button onClick={() => { onSave(skill.id, level); onClose() }} variant="contained">저장</Button>
      </DialogActions>
    </Dialog>
  )
})

// ─── 메인 페이지 ────────────────────────────────────────────────────────────────

function AboutPage() {
  const { basicInfo, sections, skills, setPhoto, addSkill, updateSkillLevel, updateSectionContent } = usePortfolio()

  const [animated, setAnimated]       = useState(false)
  const [expandedSection, setExpanded] = useState('what-i-believe')
  const [addDialogOpen, setAddDialog] = useState(false)
  const [editTarget, setEditTarget]   = useState(null)
  const [snackbar, setSnackbar]       = useState({ open: false, message: '' })
  const fileInputRef                  = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400)
    return () => clearTimeout(t)
  }, [])

  const showSnackbar = useCallback((message) => {
    setSnackbar({ open: true, message })
  }, [])

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }, [])

  const handlePhotoChange = useCallback((e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(URL.createObjectURL(file))
      showSnackbar('프로필 사진이 업데이트되었습니다')
    }
  }, [setPhoto, showSnackbar])

  const handleAccordion = useCallback((id) => (_, open) => {
    setExpanded(open ? id : false)
  }, [])

  const handleUpdateSkillLevel = useCallback((id, level) => {
    updateSkillLevel(id, level)
    showSnackbar('스킬 레벨이 업데이트되었습니다')
  }, [updateSkillLevel, showSnackbar])

  const handleAddSkill = useCallback((skill) => {
    addSkill(skill)
    showSnackbar(`${skill.name} 스킬이 추가되었습니다`)
  }, [addSkill, showSnackbar])

  const categories = [...new Set(skills.map((s) => s.category))]

  return (
    <Box
      component="main"
      sx={{
        pt: '64px',
        minHeight: '100vh',
        background: '#f7f7f7',
        px: { xs: 3, md: 6 },
        py: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ maxWidth: 800, width: '100%' }}>

        {/* ── 페이지 헤더 ── */}
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <PersonIcon sx={{ fontSize: 16, color: '#aaaaaa' }} aria-hidden="true" />
          <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaaaaa' }}>
            About Me
          </Typography>
        </Box>
        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, mb: 6, color: '#111111' }}>
          박수영
        </Typography>

        {/* ── 기본 정보 카드 ── */}
        <Card sx={{ mb: 5, borderRadius: 3 }} component="section" aria-label="기본 정보">
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Grid container spacing={4} alignItems="center">

              {/* 프로필 사진 */}
              <Grid item xs={12} sm="auto">
                <Box
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click() }}
                  aria-label="프로필 사진 업로드"
                  sx={{
                    width: 120, height: 120, borderRadius: '50%',
                    border: '2px dashed rgba(0,0,0,0.2)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', overflow: 'hidden', mx: { xs: 'auto', sm: 0 },
                    backgroundColor: '#fafafa',
                    transition: 'border-color 0.2s',
                    '&:hover, &:focus-visible': { borderColor: '#111111', outline: '2px solid #111111', outlineOffset: 2 },
                  }}
                >
                  {basicInfo.photo ? (
                    <Box
                      component="img"
                      src={basicInfo.photo}
                      alt="프로필 사진"
                      loading="lazy"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <>
                      <PhotoCameraIcon sx={{ color: '#aaaaaa', mb: 0.5 }} aria-hidden="true" />
                      <Typography variant="caption" sx={{ color: '#aaaaaa', fontSize: '0.65rem', textAlign: 'center' }}>
                        사진 업로드
                      </Typography>
                    </>
                  )}
                </Box>
                <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handlePhotoChange} aria-hidden="true" />
              </Grid>

              {/* 기본 정보 */}
              <Grid item xs={12} sm>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#111111', mb: 2 }}>
                  {basicInfo.name}
                </Typography>
                <Stack spacing={1.5} component="dl">
                  {[
                    { label: '학력', value: basicInfo.education },
                    { label: '전공', value: basicInfo.major },
                    { label: '경력', value: basicInfo.experience },
                  ].map(({ label, value }) => (
                    <Box key={label} sx={{ display: 'flex', gap: 2.5, alignItems: 'baseline' }}>
                      <Typography component="dt" variant="caption" sx={{ color: '#aaaaaa', fontWeight: 600, letterSpacing: '0.08em', minWidth: 30 }}>
                        {label}
                      </Typography>
                      <Typography component="dd" variant="body2" sx={{ color: '#444444', m: 0 }}>{value}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* ── 콘텐츠 섹션 ── */}
        <Box component="section" aria-label="소개 섹션" sx={{ mb: 6 }}>
          {sections.map((section) => (
            <Accordion
              key={section.id}
              expanded={expandedSection === section.id}
              onChange={handleAccordion(section.id)}
              elevation={0}
              sx={{
                mb: 1.5,
                borderRadius: '12px !important',
                border: '1px solid rgba(0,0,0,0.08)',
                backgroundColor: '#ffffff',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { boxShadow: '0 4px 20px rgba(0,0,0,0.07)' },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${section.id}-content`}
                id={`${section.id}-header`}
                sx={{ px: { xs: 3, md: 4 }, py: 1.5 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#aaaaaa', display: 'block', fontWeight: 500 }}>
                      {section.subtitle}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#111111', fontSize: '1rem' }}>
                      {section.title}
                    </Typography>
                  </Box>
                  {section.showInHome && (
                    <Chip
                      label="홈 표시"
                      size="small"
                      sx={{ borderRadius: 1, backgroundColor: '#111111', color: '#ffffff', fontSize: '0.65rem', height: 20, fontWeight: 600 }}
                    />
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails id={`${section.id}-content`} sx={{ px: { xs: 3, md: 4 }, pb: 4 }}>
                <SectionContent
                  section={section}
                  onUpdateContent={
                    section.type === 'process'
                      ? (newContent) => updateSectionContent(section.id, newContent)
                      : undefined
                  }
                  onSaved={() => showSnackbar('Design Process가 업데이트되었습니다')}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* ── 스킬 섹션 ── */}
        <Box component="section" aria-label="기술 스택">
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CodeIcon sx={{ fontSize: 16, color: '#aaaaaa' }} aria-hidden="true" />
            <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaaaaa' }}>
              Skills
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 5, color: '#111111' }}>
            기술 스택
          </Typography>

          <Grid container spacing={3}>
            {categories.map((category) => {
              const catSkills = skills.filter((s) => s.category === category).sort((a, b) => b.level - a.level)
              const color = CATEGORY_COLORS[category] ?? CATEGORY_COLORS['Tools & Others']
              return (
                <Grid item xs={12} sm={6} md={4} key={category}>
                  <Card
                    sx={{
                      height: '100%', borderRadius: 3,
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(0,0,0,0.10)' },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Chip
                        label={category}
                        size="small"
                        sx={{ mb: 3, borderRadius: 1, backgroundColor: color.bg, color: color.text, fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.05em' }}
                      />
                      <Stack spacing={2.5}>
                        {catSkills.map((skill) => (
                          <SkillBar
                            key={skill.id}
                            skill={skill}
                            animated={animated}
                            onEditLevel={setEditTarget}
                          />
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setAddDialog(true)}
              aria-label="새 스킬 추가"
              sx={{
                px: 4,
              }}
            >
              스킬 추가
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ── 다이얼로그 ── */}
      <AddSkillDialog open={addDialogOpen} onClose={() => setAddDialog(false)} onAdd={handleAddSkill} />
      <EditLevelDialog skill={editTarget} onClose={() => setEditTarget(null)} onSave={handleUpdateSkillLevel} />

      {/* ── 저장 피드백 스낵바 ── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity="success"
          variant="filled"
          sx={{ borderRadius: 2, backgroundColor: '#111111', color: '#ffffff', '& .MuiAlert-icon': { color: '#ffffff' } }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AboutPage
