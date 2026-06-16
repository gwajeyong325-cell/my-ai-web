import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

const PortfolioContext = createContext()

export function usePortfolio() {
  return useContext(PortfolioContext)
}

// ─── 초기 데이터 ────────────────────────────────────────────────────────────────

const INITIAL_BASIC_INFO = {
  name: '박수영 Park Su Young',
  education: '계명대학교 시각디자인과 재학',
  major: '웹디자인',
  experience: '신입',
  photo: '',
}

const INITIAL_SECTIONS = [
  {
    id: 'what-i-believe',
    title: 'What I Believe',
    subtitle: '디자인 철학',
    content: 'good design is not only beautiful,\nbut also easy to understand and use.',
    showInHome: true,
    type: 'text',
  },
  {
    id: 'interested-in',
    title: "What I'm Interested In",
    subtitle: '관심 분야',
    content: ['Accessibility', 'Mobility Service', 'Entertainment UX', 'Design Systems'],
    showInHome: false,
    type: 'list',
  },
  {
    id: 'how-i-work',
    title: 'Design Process',
    subtitle: 'How I Work',
    content: [
      { step: '01', label: 'Research',  description: '문제를 이해합니다.' },
      { step: '02', label: 'Define',    description: '핵심 문제를 정의합니다.' },
      { step: '03', label: 'Design',    description: '해결책을 설계합니다.' },
      { step: '04', label: 'Test',      description: '사용자 경험을 검증합니다.' },
    ],
    showInHome: true,
    type: 'process',
  },
]

const INITIAL_SKILLS = [
  { id: 1, name: 'Photoshop',   level: 90, category: 'Design',   showAsMain: true  },
  { id: 2, name: 'Illustrator', level: 90, category: 'Design',   showAsMain: true  },
  { id: 3, name: 'Indesign',    level: 70, category: 'Design',   showAsMain: false },
  { id: 4, name: 'Figma',       level: 80, category: 'Design',   showAsMain: true  },
  { id: 5, name: 'HTML',        level: 30, category: 'Frontend', showAsMain: false },
  { id: 6, name: 'CSS',         level: 30, category: 'Frontend', showAsMain: false },
]

// ─── Provider ──────────────────────────────────────────────────────────────────

export function PortfolioProvider({ children }) {
  const [basicInfo, setBasicInfoState] = useState(INITIAL_BASIC_INFO)
  const [sections, setSections]        = useState(INITIAL_SECTIONS)
  const [skills, setSkills]            = useState(INITIAL_SKILLS)

  // ── 프로젝트 (Supabase) ──
  const [projects, setProjects]           = useState([])
  const [projectsLoading, setProjecLoad]  = useState(true)
  const [projectsError, setProjectsError] = useState(null)

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (error) setProjectsError('프로젝트를 불러오는 중 오류가 발생했습니다.')
        else setProjects(data ?? [])
        setProjecLoad(false)
      })
  }, [])

  // 프로필 사진 업데이트
  const setPhoto = useCallback((url) => {
    setBasicInfoState((prev) => ({ ...prev, photo: url }))
  }, [])

  // 스킬 추가
  const addSkill = useCallback((skill) => {
    setSkills((prev) => [...prev, skill])
  }, [])

  // 스킬 레벨 수정
  const updateSkillLevel = useCallback((id, level) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, level } : s)))
  }, [])

  // 섹션 콘텐츠 수정 (Design Process 설명 등)
  const updateSectionContent = useCallback((sectionId, newContent) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, content: newContent } : s))
    )
  }, [])

  // ── 홈 탭용 파생 데이터 ──
  const homeData = useMemo(
    () => ({
      sections: sections.filter((s) => s.showInHome),
      topSkills: [...skills].sort((a, b) => b.level - a.level).slice(0, 4),
      basicInfo,
    }),
    [sections, skills, basicInfo]
  )

  // 홈 탭 Projects 미리보기 (featured 1개 + 나머지 최대 3개)
  const homeProjects = useMemo(() => ({
    featured: projects.find((p) => p.is_featured) ?? null,
    previews: projects.filter((p) => !p.is_featured).slice(0, 3),
  }), [projects])

  return (
    <PortfolioContext.Provider
      value={{
        basicInfo,
        sections,
        skills,
        setPhoto,
        addSkill,
        updateSkillLevel,
        updateSectionContent,
        homeData,
        projects,
        projectsLoading,
        projectsError,
        homeProjects,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}
