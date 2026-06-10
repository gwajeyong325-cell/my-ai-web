import { useState, useEffect } from 'react'
import {
  Box, Typography, Divider, TextField, Button,
  MenuItem, Select, FormControl, Collapse,
} from '@mui/material'
import { supabase } from '../../../lib/supabaseClient'

const EMAIL = 'piaoxiuying03@gmail.com'

const socialLinks = [
  { label: 'BEHANCE',   href: 'https://www.behance.net/gwajeyong325' },
  { label: 'GITHUB',    href: 'https://github.com/gwajeyong325-cell' },
  { label: 'INSTAGRAM', href: 'https://instagram.com/xiuoyz' },
]

const EMOJIS = ['💡', '✨', '🔥', '👏', '💬']
const SOURCES = ['Google', 'Behance', 'Instagram', 'Friend', 'School', 'Other']

const initialForm = {
  name: '',
  message: '',
  emoji_reaction: '💡',
  email: '',
  social_link: '',
  occupation: '',
  source: '',
}

function SocialLink({ label, href }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: 'inline-block',
        fontFamily: '"Roboto Mono", "Courier New", monospace',
        fontSize: { xs: '0.8rem', md: '0.9rem' },
        fontWeight: 500,
        letterSpacing: '0.12em',
        color: hovered ? '#111111' : '#888888',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        cursor: 'pointer',
        py: 0.5,
      }}
    >
      {hovered ? `[ ${label} ]` : label}
    </Box>
  )
}

function GuestbookEntry({ entry }) {
  return (
    <Box sx={{ py: 3, borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <Typography sx={{ fontSize: '1.1rem' }}>{entry.emoji_reaction || '💡'}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#ffffff' }}>
          {entry.name || '익명'}
        </Typography>
        {entry.occupation && (
          <Typography variant="caption" sx={{ color: '#aaaaaa' }}>
            · {entry.occupation}
          </Typography>
        )}
        <Typography variant="caption" sx={{ color: '#cccccc', ml: 'auto' }}>
          {new Date(entry.created_at).toLocaleDateString('ko-KR', {
            year: 'numeric', month: 'short', day: 'numeric',
          })}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: '#444444', lineHeight: 1.8, pl: 3.5 }}>
        {entry.message}
      </Typography>
      {entry.source && (
        <Typography variant="caption" sx={{ color: '#cccccc', pl: 3.5, display: 'block', mt: 0.5 }}>
          via {entry.source}
        </Typography>
      )}
    </Box>
  )
}

function ContactSection() {
  const [form, setForm] = useState(initialForm)
  const [showOptional, setShowOptional] = useState(false)
  const [entries, setEntries] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEntries()
  }, [])

  async function fetchEntries() {
    const { data } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)
    if (data) setEntries(data)
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.message.trim()) {
      setError('메시지를 입력해 주세요.')
      return
    }
    setSubmitting(true)
    setError('')
    const payload = {
      name: form.name.trim() || '익명',
      message: form.message.trim(),
      emoji_reaction: form.emoji_reaction,
      email: form.email.trim() || null,
      social_link: form.social_link.trim() || null,
      occupation: form.occupation.trim() || null,
      source: form.source || null,
    }
    const { error: sbError } = await supabase.from('guestbook').insert([payload])
    setSubmitting(false)
    if (sbError) {
      setError('전송 중 오류가 발생했습니다. 다시 시도해 주세요.')
    } else {
      setSubmitted(true)
      setForm(initialForm)
      fetchEntries()
    }
  }

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
      backgroundColor: '#1e1e1e',
      color: '#ffffff',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
      '&.Mui-focused fieldset': { borderColor: 'rgba(255,255,255,0.8)' },
      '& input': { color: '#ffffff' },
      '& textarea': { color: '#ffffff' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'rgba(255,255,255,0.8)' },
  }

  return (
    <Box sx={{ background: '#111111' }}>
      {/* ── Contact + Social ── */}
      <Box
        sx={{
          maxWidth: 1100,
          mx: 'auto',
          px: { xs: 4, md: 8 },
          py: { xs: 10, md: 16 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 8, md: 4 },
          alignItems: 'start',
        }}
      >
        {/* Left — headline */}
        <Box>
          <Typography
            sx={{
              fontSize: { xs: '0.7rem', md: '0.72rem' },
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#555555',
              mb: 4,
              fontWeight: 500,
            }}
          >
            Contact
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.8rem', md: '2.6rem' },
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#ffffff',
              mb: 2,
            }}
          >
            Let's create<br />meaningful<br />experiences.
          </Typography>
        </Box>

        {/* Right — email + social */}
        <Box>
          {/* Email CTA */}
          <Typography
            sx={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#555555',
              mb: 2,
              fontWeight: 500,
            }}
          >
            Email
          </Typography>
          <Box
            component="a"
            href={`mailto:${EMAIL}`}
            sx={{
              display: 'inline-block',
              fontSize: { xs: '0.85rem', md: '0.95rem' },
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#ffffff',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
              pb: 0.5,
              mb: 6,
              transition: 'border-color 0.2s',
              '&:hover': { borderColor: '#ffffff' },
            }}
          >
            {EMAIL}
          </Box>

          {/* Social */}
          <Typography
            sx={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#555555',
              mb: 2,
              fontWeight: 500,
            }}
          >
            Social
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {socialLinks.map((s) => (
              <SocialLink key={s.label} label={s.label} href={s.href} />
            ))}
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mx: { xs: 4, md: 8 } }} />

      {/* ── Guestbook ── */}
      <Box
        sx={{
          maxWidth: 1100,
          mx: 'auto',
          px: { xs: 4, md: 8 },
          py: { xs: 8, md: 12 },
        }}
      >
        <Typography
          sx={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#555555',
            mb: 2,
            fontWeight: 500,
          }}
        >
          Guestbook
        </Typography>
        <Typography
          sx={{ fontSize: { xs: '1.4rem', md: '1.8rem' }, fontWeight: 700, color: '#ffffff', mb: 8 }}
        >
          방명록을 남겨주세요.
        </Typography>

        {/* Form */}
        {submitted ? (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '1.5rem', mb: 1 }}>✨</Typography>
            <Typography sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }}>감사합니다!</Typography>
            <Typography variant="body2" sx={{ color: '#888888', mb: 3 }}>
              방명록이 등록되었습니다.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setSubmitted(false)}
              sx={{
                borderRadius: 0,
                borderColor: 'rgba(255,255,255,0.2)',
                color: '#ffffff',
                '&:hover': { borderColor: '#ffffff', backgroundColor: 'transparent' },
              }}
            >
              또 남기기
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 10 }}>
            {/* Emoji selector */}
            <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
              {EMOJIS.map((emoji) => (
                <Box
                  key={emoji}
                  onClick={() => setForm((p) => ({ ...p, emoji_reaction: emoji }))}
                  sx={{
                    fontSize: '1.4rem',
                    cursor: 'pointer',
                    opacity: form.emoji_reaction === emoji ? 1 : 0.3,
                    transition: 'opacity 0.15s',
                    '&:hover': { opacity: 0.8 },
                  }}
                >
                  {emoji}
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                name="name"
                label="이름 (비워두면 익명)"
                value={form.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                size="small"
                sx={inputSx}
              />
              <TextField
                name="message"
                label="메시지 *"
                value={form.message}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={inputSx}
              />

              {error && (
                <Typography variant="caption" sx={{ color: '#ff6b6b' }}>
                  {error}
                </Typography>
              )}

              {/* Optional toggle */}
              <Box
                onClick={() => setShowOptional((v) => !v)}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  color: '#555555',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  userSelect: 'none',
                  width: 'fit-content',
                }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 1,
                    backgroundColor: '#555555',
                    transition: 'transform 0.2s',
                    transform: showOptional ? 'rotate(45deg) translate(2px, -3px)' : 'none',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: 16,
                      height: 1,
                      backgroundColor: '#555555',
                      top: 0,
                      left: 0,
                      transform: showOptional ? 'rotate(90deg)' : 'rotate(90deg)',
                      opacity: showOptional ? 0 : 1,
                      transition: 'opacity 0.2s',
                    },
                  }}
                />
                추가 정보 (선택)
              </Box>

              <Collapse in={showOptional}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                  <TextField
                    name="email"
                    label="이메일 (비공개)"
                    value={form.email}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={inputSx}
                  />
                  <TextField
                    name="social_link"
                    label="SNS 링크 (Behance, Instagram 등)"
                    value={form.social_link}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={inputSx}
                  />
                  <TextField
                    name="occupation"
                    label="소속 / 직업"
                    value={form.occupation}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={inputSx}
                  />
                  <FormControl fullWidth size="small">
                    <Select
                      name="source"
                      value={form.source}
                      onChange={handleChange}
                      displayEmpty
                      sx={{
                        borderRadius: 0,
                        backgroundColor: '#1e1e1e',
                        color: form.source ? '#ffffff' : 'rgba(255,255,255,0.4)',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.15)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.4)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.8)' },
                        '& .MuiSvgIcon-root': { color: 'rgba(255,255,255,0.5)' },
                      }}
                    >
                      <MenuItem value="" disabled sx={{ color: '#888888' }}>
                        어떻게 알게 되셨나요?
                      </MenuItem>
                      {SOURCES.map((s) => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Collapse>

              <Button
                type="submit"
                disabled={submitting}
                sx={{
                  mt: 1,
                  borderRadius: 0,
                  backgroundColor: '#ffffff',
                  color: '#111111',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  py: 1.5,
                  fontSize: '0.8rem',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                  '&:disabled': { backgroundColor: 'rgba(255,255,255,0.3)', color: '#888888' },
                }}
              >
                {submitting ? '전송 중...' : 'LEAVE A NOTE'}
              </Button>
            </Box>
          </Box>
        )}

        {/* Entries */}
        {entries.length > 0 && (
          <Box>
            <Typography
              sx={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#555555',
                mb: 1,
                fontWeight: 500,
              }}
            >
              {entries.length} notes
            </Typography>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 0 }} />
            {entries.map((entry) => (
              <GuestbookEntry key={entry.id} entry={entry} />
            ))}
          </Box>
        )}

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mt: 10, mb: 4 }} />
        <Typography variant="body2" sx={{ color: '#333333', textAlign: 'center' }}>
          © 2025 Portfolio. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}

export default ContactSection
