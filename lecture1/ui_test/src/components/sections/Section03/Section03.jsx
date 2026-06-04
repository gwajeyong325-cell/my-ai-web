import { useState } from 'react'
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

const NAV_ITEMS = ['홈', '소개', '서비스', '연락처']

function Section03() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleNavClick = (item) => {
    alert(`"${item}" 메뉴 클릭!`)
    setDrawerOpen(false)
  }

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Navigation
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        화면 너비를 줄이면 햄버거 메뉴로 전환됩니다.
      </Typography>

      <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
              My App
            </Typography>

            {isMobile ? (
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)} edge="end">
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {NAV_ITEMS.map((item) => (
                  <Button key={item} color="inherit" onClick={() => handleNavClick(item)}>
                    {item}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">메뉴</Typography>
            <IconButton onClick={() => setDrawerOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton onClick={() => handleNavClick(item)}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}

export default Section03
