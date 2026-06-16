import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const navItems = [
  { label: 'Home',       path: '/' },
  { label: 'About Me',   path: '/about' },
  { label: 'Projects',   path: '/projects' },
]

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleNav = (path) => {
    navigate(path)
    setMobileOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              color: '#111111',
            }}
            onClick={() => handleNav('/')}
          >
            Portfolio
          </Typography>

          {isMobile ? (
            <IconButton sx={{ color: '#111111' }} onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  sx={{
                    color: isActive(item.path) ? '#000000' : '#666666',
                    fontWeight: isActive(item.path) ? 700 : 400,
                    borderBottom: isActive(item.path) ? '2px solid #111111' : '2px solid transparent',
                    borderRadius: 0,
                    px: 2,
                    '&:hover': { color: '#111111', backgroundColor: 'transparent' },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { width: 240, backgroundColor: '#ffffff', borderLeft: '1px solid rgba(0,0,0,0.08)' },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#111111' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNav(item.path)}
                sx={{
                  color: isActive(item.path) ? '#000000' : '#444444',
                  borderLeft: isActive(item.path) ? '3px solid #111111' : '3px solid transparent',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default NavBar
