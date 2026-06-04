import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Chip,
  Stack,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'

const MODALS = [
  {
    id: 'info',
    trigger: '정보 모달',
    triggerColor: 'primary',
    triggerVariant: 'contained',
    icon: <InfoOutlinedIcon />,
    title: '안내',
    body: '이 작업은 정상적으로 완료되었습니다. 변경사항이 저장되었으니 계속 진행하세요.',
    confirmLabel: '확인',
    confirmColor: 'primary',
  },
  {
    id: 'warning',
    trigger: '경고 모달',
    triggerColor: 'warning',
    triggerVariant: 'contained',
    icon: <WarningAmberIcon color="warning" />,
    title: '주의',
    body: '저장하지 않은 변경사항이 있습니다. 페이지를 나가면 작업 내용이 사라집니다.',
    confirmLabel: '나가기',
    confirmColor: 'warning',
  },
  {
    id: 'danger',
    trigger: '삭제 확인 모달',
    triggerColor: 'error',
    triggerVariant: 'outlined',
    icon: <DeleteOutlineIcon color="error" />,
    title: '정말 삭제하시겠습니까?',
    body: '이 항목을 삭제하면 복구할 수 없습니다. 삭제를 계속 진행하시겠습니까?',
    confirmLabel: '삭제',
    confirmColor: 'error',
  },
]

function Section08() {
  const [openId, setOpenId] = useState(null)
  const [lastAction, setLastAction] = useState(null)

  const handleOpen = (id) => setOpenId(id)
  const handleClose = () => setOpenId(null)

  const handleConfirm = (modal) => {
    setLastAction({ type: 'confirm', label: modal.confirmLabel, id: modal.id })
    handleClose()
  }

  const handleCancel = (modal) => {
    setLastAction({ type: 'cancel', id: modal.id })
    handleClose()
  }

  const activeModal = MODALS.find((m) => m.id === openId)

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Modal (Dialog)
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
        {MODALS.map((modal) => (
          <Button
            key={modal.id}
            variant={modal.triggerVariant}
            color={modal.triggerColor}
            onClick={() => handleOpen(modal.id)}
          >
            {modal.trigger}
          </Button>
        ))}
      </Stack>

      {lastAction && (
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">마지막 동작:</Typography>
          <Chip
            label={lastAction.type === 'confirm' ? `"${lastAction.label}" 클릭` : `"${lastAction.id}" 모달 취소`}
            size="small"
            color={lastAction.type === 'confirm' ? 'primary' : 'default'}
          />
        </Box>
      )}

      {activeModal && (
        <Dialog open={Boolean(openId)} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              pr: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {activeModal.icon}
              {activeModal.title}
            </Box>
            <IconButton
              onClick={handleClose}
              size="medium"
              sx={{
                color: 'text.secondary',
                '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <DialogContentText>{activeModal.body}</DialogContentText>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button variant="outlined" color="inherit" onClick={() => handleCancel(activeModal)}>
              취소
            </Button>
            <Button
              variant="contained"
              color={activeModal.confirmColor}
              onClick={() => handleConfirm(activeModal)}
              autoFocus
            >
              {activeModal.confirmLabel}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  )
}

export default Section08
