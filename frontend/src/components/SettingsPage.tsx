import { Box, Typography, Paper, CardContent, IconButton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useStore } from '../state/StoreContext'
import { defaultSettings } from '../state/store'
import NumberField from './NumberField'


export default function SettingsPage() {
  const { settings, setSettings } = useStore()

  const handleChange = <K extends keyof typeof settings>(
    key: K,
    value: (typeof settings)[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleClear = () => {
    setSettings(defaultSettings)
  }

  return (
    <Box sx={{ position: 'relative', p: 2, height: '100%', overflowY: 'auto', pb: 10 }}>
      <Paper sx={{ p: 2, opacity: 0.9 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 0 }}>
          <Typography variant="h4">Settings</Typography>
          <IconButton onClick={handleClear}><RefreshIcon /></IconButton>
        </Box>

        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', my: 2 }} />


        <Typography variant="h6" gutterBottom>
          Exchange Rates
        </Typography>

        <CardContent sx={{ px: 0 }}>
          <NumberField
            label="USD → KHR"
            value={settings.usdToKhr}
            onChange={v => handleChange('usdToKhr', v)}
            step={50}
            prefix="៛"
            defaultValue={defaultSettings.usdToKhr}
          />
        </CardContent>

        <CardContent sx={{ px: 0 }}>
          <NumberField
            label="USD → AUD"
            value={settings.usdToAud}
            onChange={v => handleChange('usdToAud', v)}
            step={0.01}
            decimals={2}
            prefix="$"
            defaultValue={defaultSettings.usdToAud}
          />
        </CardContent>
      </Paper>
    </Box>
  )
}
