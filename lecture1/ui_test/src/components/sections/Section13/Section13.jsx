import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Chip,
  Stack,
} from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import SaveIcon from '@mui/icons-material/Save'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import PrintIcon from '@mui/icons-material/Print'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const FILE_MENU = [
  { label: '새 파일', icon: <NoteAddIcon fontSize="small" />, group: 1 },
  { label: '열기', icon: <FolderOpenIcon fontSize="small" />, group: 1 },
  { label: '저장', icon: <SaveIcon fontSize="small" />, group: 2 },
  { label: '다른 이름으로 저장', icon: <SaveAsIcon fontSize="small" />, group: 2 },
  { label: '내보내기', icon: <FileDownloadIcon fontSize="small" />, group: 3 },
  { label: '인쇄', icon: <PrintIcon fontSize="small" />, group: 3 },
]

const ACCOUNT_MENU = [
  { label: '내 계정', icon: <AccountCircleIcon fontSize="small" />, group: 1 },
  { label: '알림 설정', icon: <NotificationsIcon fontSize="small" />, group: 1 },
  { label: '환경설정', icon: <SettingsIcon fontSize="small" />, group: 2 },
  { label: '도움말', icon: <HelpOutlineIcon fontSize="small" />, group: 2 },
  { label: '로그아웃', icon: <LogoutIcon fontSize="small" color="error" />, group: 3 },
]

function MenuButton({ label, items, color = 'primary' }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selected, setSelected] = useState(null)

  const handleOpen = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleSelect = (item) => {
    setSelected(item.label)
    handleClose()
  }

  const open = Boolean(anchorEl)
  const groups = [...new Set(items.map((i) => i.group))]

  return (
    <Box>
      <Button
        variant="contained"
        color={color}
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleOpen}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { minWidth: 200, mt: 0.5 } } }}
      >
        {groups.map((group, gi) => [
          gi > 0 && <Divider key={`divider-${group}`} />,
          ...items
            .filter((item) => item.group === group)
            .map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => handleSelect(item)}
                selected={selected === item.label}
                sx={{ py: 1 }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </MenuItem>
            )),
        ])}
      </Menu>

      <Box sx={{ mt: 1.5, minHeight: 28 }}>
        {selected && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" color="text.secondary">선택:</Typography>
            <Chip label={selected} size="small" color={color} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

function Section13() {
  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Menu
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        버튼을 클릭하면 메뉴가 열립니다. 메뉴 외부를 클릭하면 닫힙니다.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Typography variant="body2" fontWeight={500} sx={{ mb: 2 }}>
            파일 메뉴 (6개 항목 · 그룹 구분선)
          </Typography>
          <MenuButton label="파일" items={FILE_MENU} color="primary" />
        </Paper>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Typography variant="body2" fontWeight={500} sx={{ mb: 2 }}>
            계정 메뉴 (5개 항목 · 로그아웃 강조)
          </Typography>
          <MenuButton label="계정" items={ACCOUNT_MENU} color="secondary" />
        </Paper>
      </Stack>
    </Box>
  )
}

export default Section13
