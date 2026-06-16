import { Box } from '@mui/material'
import HeroSection from '../../components/sections/HeroSection/HeroSection'
import AboutMeSection from '../../components/sections/AboutMeSection/AboutMeSection'
import SkillTreeSection from '../../components/sections/SkillTreeSection/SkillTreeSection'
import ProjectsSection from '../../components/sections/ProjectsSection/ProjectsSection'
import ContactSection from '../../components/sections/ContactSection/ContactSection'

function HomePage() {
  return (
    <Box sx={{ pt: '64px' }}>
      <HeroSection />
      <AboutMeSection />
      <SkillTreeSection />
      <ProjectsSection />
      <ContactSection />
    </Box>
  )
}

export default HomePage
