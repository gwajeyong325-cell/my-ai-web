import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Avatar,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import MessageIcon from '@mui/icons-material/Message'
import NotificationsIcon from '@mui/icons-material/Notifications'
import StarIcon from '@mui/icons-material/Star'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined'
import CloseIcon from '@mui/icons-material/Close'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'

const NAV_ITEMS = [
  { label: '홈', icon: <HomeIcon />, group: 'main' },
  { label: '프로필', icon: <PersonIcon />, group: 'main' },
  { label: '메시지', icon: <MessageIcon />, badge: 3, group: 'main' },
  { label: '알림', icon: <NotificationsIcon />, badge: 12, group: 'main' },
  { label: '즐겨찾기', icon: <StarIcon />, group: 'main' },
  { label: '설정', icon: <SettingsIcon />, group: 'etc' },
  { label: '도움말', icon: <HelpOutlineIcon />, group: 'etc' },
]

function Section14() {
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState('left')
  const [selected, setSelected] = useState('홈')

  const handleAnchorChange = (_, value) => {
    if (value) setAnchor(value)
  }

  const handleSelect = (label) => {
    setSelected(label)
    setOpen(false)
  }

  const mainItems = NAV_ITEMS.filter((i) => i.group === 'main')
  const etcItems = NAV_ITEMS.filter((i) => i.group === 'etc')

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Sidebar (Drawer)
      </Typography>

      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="body2" color="text.secondary">위치:</Typography>
            <ToggleButtonGroup
              value={anchor}
              exclusive
              onChange={handleAnchorChange}
              size="small"
            >
              <ToggleButton value="left">← 왼쪽</ToggleButton>
              <ToggleButton value="right">오른쪽 →</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Button
            variant="contained"
            startIcon={<MenuOpenIcon />}
            onClick={() => setOpen(true)}
          >
            사이드바 열기
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">현재 선택:</Typography>
          <Chip label={selected} color="primary" size="small" />
        </Box>
      </Box>

      <Drawer
        anchor={anchor}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 260, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* 헤더 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.dark', fontSize: 14 }}>
                U
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600}>사용자</Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>user@example.com</Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'inherit' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* 메인 메뉴 */}
          <List sx={{ flexGrow: 1, pt: 1 }}>
            <Typography variant="caption" color="text.disabled" sx={{ px: 2, display: 'block', mb: 0.5 }}>
              메뉴
            </Typography>
            {mainItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  selected={selected === item.label}
                  onClick={() => handleSelect(item.label)}
                  sx={{
                    borderRadius: 1,
                    mx: 1,
                    '&.Mui-selected': { bgcolor: 'primary.main', color: 'primary.contrastText',
                      '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                    },
                    '&.Mui-selected:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                  {item.badge && (
                    <Chip label={item.badge} size="small" color="error" sx={{ height: 20, fontSize: 10 }} />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          {/* 기타 메뉴 */}
          <List sx={{ pb: 1 }}>
            <Typography variant="caption" color="text.disabled" sx={{ px: 2, display: 'block', mb: 0.5 }}>
              기타
            </Typography>
            {etcItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  selected={selected === item.label}
                  onClick={() => handleSelect(item.label)}
                  sx={{ borderRadius: 1, mx: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}

export default Section14
