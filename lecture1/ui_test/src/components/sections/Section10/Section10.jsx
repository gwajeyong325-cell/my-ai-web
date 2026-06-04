import { useState } from 'react'
import { Box, Typography, Paper, Chip } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const INITIAL_ITEMS = [
  { id: '1', label: 'React 학습', emoji: '⚛️' },
  { id: '2', label: 'CSS 정리', emoji: '🎨' },
  { id: '3', label: 'API 연동', emoji: '🔗' },
  { id: '4', label: '테스트 작성', emoji: '🧪' },
  { id: '5', label: '배포 설정', emoji: '🚀' },
]

function DraggableItem({ item, isDragging, done, onDragStart, onDragEnd }) {
  return (
    <Box
      draggable
      onDragStart={(e) => onDragStart(e, item.id)}
      onDragEnd={onDragEnd}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        py: 1,
        borderRadius: 1.5,
        bgcolor: done ? 'success.light' : 'background.default',
        border: '1px solid',
        borderColor: done ? 'success.main' : 'divider',
        cursor: 'grab',
        opacity: isDragging ? 0.3 : 1,
        transition: 'opacity 0.15s, box-shadow 0.15s',
        userSelect: 'none',
        '&:hover': {
          boxShadow: 2,
          borderColor: done ? 'success.dark' : 'primary.main',
        },
        '&:active': { cursor: 'grabbing' },
      }}
    >
      <DragIndicatorIcon fontSize="small" sx={{ color: 'text.disabled', flexShrink: 0 }} />
      <Typography variant="body2" sx={{ mr: 'auto' }}>
        {item.emoji} {item.label}
      </Typography>
      {done && <CheckCircleOutlineIcon fontSize="small" sx={{ color: 'success.dark' }} />}
    </Box>
  )
}

function DropZone({ zone, items, overZone, draggingId, done, onDragOver, onDragLeave, onDrop, onDragStart, onDragEnd }) {
  const isOver = overZone === zone

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {done ? '✅ 완료' : '📋 할 일'}
        </Typography>
        <Chip label={items.length} size="small" color={done ? 'success' : 'default'} />
      </Box>

      <Paper
        variant="outlined"
        onDragOver={(e) => onDragOver(e, zone)}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, zone)}
        sx={{
          minHeight: 240,
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: isOver
            ? done ? 'success.main' : 'primary.main'
            : 'divider',
          bgcolor: isOver
            ? done ? 'rgba(46,125,50,0.06)' : 'rgba(25,118,210,0.06)'
            : 'transparent',
          transition: 'border-color 0.15s, background-color 0.15s',
        }}
      >
        {items.length === 0 ? (
          <Typography
            variant="body2"
            color="text.disabled"
            sx={{ m: 'auto', textAlign: 'center' }}
          >
            {done ? '여기에 드롭하세요' : '아이템을 되돌려 놓으세요'}
          </Typography>
        ) : (
          items.map((item) => (
            <DraggableItem
              key={item.id}
              item={item}
              isDragging={draggingId === item.id}
              done={done}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))
        )}
      </Paper>
    </Box>
  )
}

function Section10() {
  const [todoItems, setTodoItems] = useState(INITIAL_ITEMS)
  const [doneItems, setDoneItems] = useState([])
  const [draggingId, setDraggingId] = useState(null)
  const [overZone, setOverZone] = useState(null)

  const handleDragStart = (e, id) => {
    setDraggingId(id)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', id)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
    setOverZone(null)
  }

  const handleDragOver = (e, zone) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setOverZone(zone)
  }

  const handleDragLeave = () => setOverZone(null)

  const handleDrop = (e, targetZone) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')

    if (targetZone === 'done') {
      const item = todoItems.find((i) => i.id === id)
      if (item) {
        setTodoItems((prev) => prev.filter((i) => i.id !== id))
        setDoneItems((prev) => [...prev, item])
      }
    } else {
      const item = doneItems.find((i) => i.id === id)
      if (item) {
        setDoneItems((prev) => prev.filter((i) => i.id !== id))
        setTodoItems((prev) => [...prev, item])
      }
    }

    setDraggingId(null)
    setOverZone(null)
  }

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Drag & Drop
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        아이템을 드래그하여 오른쪽 완료 영역으로 옮기거나 되돌릴 수 있습니다.
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <DropZone
          zone="todo"
          items={todoItems}
          overZone={overZone}
          draggingId={draggingId}
          done={false}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
        <DropZone
          zone="done"
          items={doneItems}
          overZone={overZone}
          draggingId={draggingId}
          done={true}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      </Box>
    </Box>
  )
}

export default Section10
