import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import MailIcon from '@mui/icons-material/Mail'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Settings from './pages/Settings'

const SIDEBAR_WIDTH = 240

const navItems = [
  { label: '홈', icon: <HomeIcon />, path: '/' },
  { label: '소개', icon: <InfoIcon />, path: '/about' },
  { label: '연락처', icon: <MailIcon />, path: '/contact' },
  { label: '설정', icon: <SettingsIcon />, path: '/settings' },
]

function Layout() {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(!open)} edge="start" sx={{ mr: 1 }}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          {navItems.map((item) => (
            <Button key={item.path} color="inherit" onClick={() => navigate(item.path)}>
              {item.label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Drawer
          variant="permanent"
          sx={{
            width: open ? SIDEBAR_WIDTH : 0,
            flexShrink: 0,
            transition: 'width 0.3s',
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
              boxSizing: 'border-box',
              top: '64px',
              height: 'calc(100% - 64px)',
              transform: open ? 'none' : `translateX(-${SIDEBAR_WIDTH}px)`,
              transition: 'transform 0.3s',
              overflowX: 'hidden',
            },
          }}
        >
          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            mt: '64px',
            ml: open ? `${SIDEBAR_WIDTH}px` : 0,
            transition: 'margin-left 0.3s',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
      </Box>

    </Box>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
