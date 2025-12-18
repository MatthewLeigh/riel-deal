import { useState, useEffect } from 'react'
import { useStore } from '../state/StoreContext'
import { Box, Typography, Paper, Button, Grid, CardContent, IconButton } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import { sum } from '../util/conversions'

import NumberField from './NumberField'



const usdNotes = [1, 5, 10, 20, 50, 100]
const khrNotes = [1000, 2000, 5000, 10000, 20000, 50000, 100000]

export default function CalculatorPage() {
  const { settings } = useStore()

  const [khrTally, setKhrTally] = useState<number>(0)
  const [usdTally, setUsdTally] = useState<number>(0)
  const [totals, setTotals] = useState<{ aud: number, khr: number, usd: number }>({ aud: 0, khr: 0, usd: 0 })
  const [isAdd, setIsAdd] = useState(true)

  const handleAdd = (currency: 'USD' | 'KHR', amount: number) => {
    if (currency === 'USD') setUsdTally(usdTally + amount)
    else setKhrTally(khrTally + amount)
  }

  const handleSubtract = (currency: 'USD' | 'KHR', amount: number) => {
    if (currency === 'USD') setUsdTally(Math.max(0, usdTally - amount))
    else setKhrTally(Math.max(0, khrTally - amount))
  }

  const handleNotePress = (currency: 'USD' | 'KHR', amount: number) => {
    if (isAdd) handleAdd(currency, amount)
    else handleSubtract(currency, amount)
  }

  const handleClear = () => {
    setUsdTally(0)
    setKhrTally(0)
  }

  useEffect(() => {
    setTotals(sum(settings, 0, khrTally, usdTally))
  }, [khrTally, usdTally, settings])

  return (
    <Box sx={{ position: 'relative', p: 2, height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
      <Paper sx={{ p: 2, opacity: 0.9 }}>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 0 }}>
          <Typography variant="h4" sx={{ flex: '1' }}>
            Calculator
          </Typography>
          {isAdd ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0 }}>
              <IconButton>
                <AddCircleIcon color='primary' />
              </IconButton>
              <IconButton onClick={() => setIsAdd(false)} >
                <RemoveCircleOutlineOutlinedIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0 }}>
              <IconButton onClick={() => setIsAdd(true)} >
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton>
                <RemoveCircleIcon color='primary' />
              </IconButton>
            </Box>
          )}
          <IconButton onClick={() => handleClear()} disabled={totals.usd == 0}>
            <RefreshIcon
            />
          </IconButton>
        </Box>

        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', my: 2 }} />

        <Box
          sx={{
            mb: 2,
            mx: 'auto',
            maxWidth: '100%',
            background: '#333',
            borderRadius: 1,
            boxShadow: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 120,
            color: '#fff',
            fontFamily: 'monospace',
            fontSize: '1.2rem',
            letterSpacing: 2,
            userSelect: 'none',
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography variant="body2" sx={{ color: '#aaa', fontSize: '0.8rem' }}>
              USD
            </Typography>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
              ${totals.usd.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography variant="body2" sx={{ color: '#aaa', fontSize: '0.8rem' }}>
              KHR
            </Typography>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
              ៛{(totals.khr / 1000).toLocaleString()}k
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography variant="body2" sx={{ color: '#aaa', fontSize: '0.8rem' }}>
              AUD
            </Typography>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
              ${Math.round(totals.aud).toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', my: 2 }} />

        <CardContent sx={{ px: 0 }}>
          <NumberField
            label="USD"
            value={usdTally}
            onChange={setUsdTally}
            prefix="$"
            step={1}
            defaultValue={0}
          />
          <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', mt: 2 }}>
            {usdNotes.map(note => (
              <Button
                key={note}
                variant="contained"
                color="primary"
                onClick={() => handleNotePress('USD', note)}
              >
                {isAdd ? `+ $${note}` : `- $${note}`}
              </Button>
            ))}
          </Grid>
        </CardContent>


        <CardContent sx={{ px: 0 }}>
          <NumberField
            label="KHR"
            value={khrTally}
            onChange={setKhrTally}
            prefix="៛"
            step={100}
            defaultValue={0}
          />
          <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', mt: 2 }}>
            {khrNotes.map(note => (
              <Button
                key={note}
                variant="contained"
                color="secondary"
                onClick={() => handleNotePress('KHR', note)}
              >
                {isAdd
                  ? `+ ៛${note % 1000 === 0 ? note / 1000 + 'k' : note}`
                  : `- ៛${note % 1000 === 0 ? note / 1000 + 'k' : note}`}
              </Button>
            ))}
          </Grid>
        </CardContent>

      </Paper>
    </Box>
  )
}
