import { useState, useMemo, useEffect } from 'react'
import { Box, CardContent, Typography, Paper, Grid, IconButton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useStore } from '../state/StoreContext'
import BackgroundImage from './BackgroundImage'
import backgroundImage from '../assets/image.png'
import NumberField from './NumberField'

export default function ChangeCheckerPage() {
  const { settings } = useStore()

  const [costUSD, setCostUSD] = useState(0)
  const [costKHR, setCostKHR] = useState(0)
  const [paidUSD, setPaidUSD] = useState(0)
  const [paidKHR, setPaidKHR] = useState(0)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const costTotalUSD = costUSD + costKHR / settings.usdToKhr
    const paidTotalUSD = paidUSD + paidKHR / settings.usdToKhr
    setOffset(Math.abs(Math.floor(costTotalUSD - paidTotalUSD)))
  }, [costUSD, costKHR, paidUSD, paidKHR])

  const round = (value: number, unit: number) =>
    Math.round(value / unit) * unit

  const compute = useMemo(() => {
    const costTotalUSD = costUSD + costKHR / settings.usdToKhr
    const paidTotalUSD = paidUSD + paidKHR / settings.usdToKhr
    const diffUSD = paidTotalUSD - costTotalUSD
    const absDiff = Math.abs(diffUSD)

    const usdDefault = Math.floor(absDiff)
    const maxOffset = usdDefault

    const usdRounded = Math.min(Math.max(offset, 0), maxOffset)

    const khrRemainder = round((absDiff - usdRounded) * settings.usdToKhr, settings.roundingKhr)

    let status = ''
    if (absDiff <= settings.roundingUsd / 2) status = '(Exact Payment)'
    else if (diffUSD > 0) status = `(They owe you)`
    else status = `(You owe them)`

    return { status, usdRounded, khrRemainder, diffUSD, usdDefault }
  }, [costUSD, costKHR, paidUSD, paidKHR, settings, offset])

  const { status, usdRounded, khrRemainder, diffUSD, usdDefault } = compute

  const handleClear = () => {
    setCostUSD(0)
    setCostKHR(0)
    setPaidUSD(0)
    setPaidKHR(0)
    setOffset(0)
  }

  const handleIncrement = () => setOffset(prev => Math.min(prev + 1, usdDefault))
  const handleDecrement = () => setOffset(prev => Math.max(prev - 1, 0))

  return (
    <Box sx={{ position: 'relative', p: 2, height: '100%', overflowY: 'auto' }}>
      <Paper sx={{ p: 2, opacity: 0.9 }}>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 0 }}>
          <Typography variant="h4" sx={{ flex: '1' }}>Change</Typography>
          <IconButton onClick={handleClear} disabled={diffUSD === 0}>
            <RefreshIcon />
          </IconButton>
        </Box>

        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', my: 2 }} />

        <Box
          sx={{
            mb: 2,
            mx: 'auto',
            maxWidth: '100%',
            background: '#333',
            minHeight: 120,
            borderRadius: 1,
            boxShadow: 2,
            px: 2,
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#fff',
              fontFamily: 'monospace',
              fontSize: '1.2rem',
              letterSpacing: 2,
              userSelect: 'none',
              width: '100%'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', flex: 1 }}>
              <IconButton onClick={handleDecrement} disabled={offset <= 0} size="small" sx={{ color: '#fff', mb: '2px' }}>
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
              <Box sx={{ textAlign: 'center', mx: 1 }}>
                <Typography variant="body2" sx={{ color: '#aaa', fontSize: '0.8rem' }}>USD</Typography>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                  ${usdRounded.toLocaleString()}
                </Typography>
              </Box>
              <IconButton onClick={handleIncrement} disabled={offset >= usdDefault} size="small" sx={{ color: '#fff', mb: '2px' }}>
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box sx={{ textAlign: 'center', flex: 0 }}>
              <Typography variant="body2" sx={{ color: '#aaa', fontSize: '0.8rem' }}>+</Typography>
            </Box>

            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="body2" sx={{ color: '#aaa', fontSize: '0.8rem' }}>KHR</Typography>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                ៛{khrRemainder.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" sx={{ color: '#888', fontSize: '0.9rem' }}>{status}</Typography>
        </Box>

        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', my: 2 }} />

        <CardContent sx={{ px: 0 }}>
          <Typography variant="h6" gutterBottom>Cost</Typography>
          <Grid container spacing={2}>
            <NumberField
              label="USD"
              value={costUSD}
              onChange={setCostUSD}
              prefix="$"
              step={1}
              defaultValue={0}
            />
            <NumberField
              label="KHR"
              value={costKHR}
              onChange={setCostKHR}
              prefix="៛"
              step={1000}
              defaultValue={0}
            />
          </Grid>
        </CardContent>

        <CardContent sx={{ px: 0 }}>
          <Typography variant="h6" gutterBottom>Paid</Typography>
          <Grid container spacing={2}>
            <NumberField
              label="USD"
              value={paidUSD}
              onChange={setPaidUSD}
              prefix="$"
              step={1}
              defaultValue={0}
            />
            <NumberField
              label="KHR"
              value={paidKHR}
              onChange={setPaidKHR}
              prefix="៛"
              step={1000}
              defaultValue={0}
            />
          </Grid>
        </CardContent>

      </Paper>
      <BackgroundImage image={backgroundImage} />
    </Box>
  )
}
