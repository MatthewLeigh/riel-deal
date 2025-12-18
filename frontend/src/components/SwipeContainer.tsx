import { useState, useRef } from 'react'
import CalculatorPage from './CalculatorPage'
import ChangeCheckerPage from './ChangeCheckerPage'
import SettingsPage from './SettingsPage'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import CalculateIcon from '@mui/icons-material/Calculate'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'

const pages = [
  { component: <SettingsPage />, label: 'Settings', icon: <SettingsIcon /> },
  { component: <CalculatorPage />, label: 'Calculator', icon: <CalculateIcon /> },
  { component: <ChangeCheckerPage />, label: 'Change', icon: <CurrencyExchangeIcon /> }
]

export default function SwipeContainer() {
  const [index, setIndex] = useState(1)
  const startX = useRef<number | null>(null)

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => (startX.current = e.touches[0].clientX)
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return
    const delta = e.changedTouches[0].clientX - startX.current
    if (delta > 60 && index > 0) setIndex(index - 1)
    if (delta < -60 && index < pages.length - 1) setIndex(index + 1)
    startX.current = null
  }

  return (
    <div 
      style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '768px', margin: 'auto' }} 
      onTouchStart={onTouchStart} 
      onTouchEnd={onTouchEnd}
    >
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          height: '100%',
          transition: 'transform 0.3s',
          transform: `translateX(-${index * 100}%)`,
        }}>
          {pages.map((p, i) => (
            <div key={i} style={{ minWidth: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
              {p.component}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1300
        }}
      >
        <BottomNavigation value={index} onChange={(_, newVal) => setIndex(newVal)}>
          {pages.map((p, i) => (
            <BottomNavigationAction key={i} label={p.label} icon={p.icon} />
          ))}
        </BottomNavigation>
      </Paper>
    </div>
  )
}
