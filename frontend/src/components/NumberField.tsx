import { TextField, Typography, IconButton, Box } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

type NumberFieldProps = {
  label: string
  value: number
  onChange: (value: number) => void
  step?: number
  min?: number
  decimals?: number
  prefix?: string
  defaultValue?: number
  showArrows?: boolean
}

export default function NumberField({
  label,
  value,
  onChange,
  step,
  min = 0,
  decimals = 0,
  prefix,
  defaultValue,
  showArrows = true,
}: NumberFieldProps) {
  const clampAndFormat = (n: number) => {
    const clamped = Math.max(min, n)
    return decimals > 0
      ? Number(clamped.toFixed(decimals))
      : Math.round(clamped)
  }

  const handleInput = (raw: string) => {
    const cleaned =
      decimals > 0
        ? raw.replace(/[^0-9.]/g, '')
        : raw.replace(/\D/g, '')

    const sanitized = cleaned.replace(/^0+(?=\d)/, '')

    const next =
      sanitized === '' || sanitized === '.'
        ? 0
        : clampAndFormat(Number(sanitized))

    onChange(next)
  }

  return (
    <TextField
      label={label}
      type="text"
      sx={{ mt: 1 }}
      value={
        decimals > 0
          ? value.toFixed(decimals)
          : value
      }
      onChange={e => handleInput(e.target.value)}
      fullWidth
      InputProps={{
        startAdornment: prefix && (
          <Typography sx={{ mr: 1 }}>{prefix}</Typography>
        ),
        endAdornment: (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {showArrows && step !== undefined && (
              <>
                <IconButton
                  size="small"
                  onClick={() =>
                    onChange(clampAndFormat(value - step))
                  }
                >
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() =>
                    onChange(clampAndFormat(value + step))
                  }
                >
                  <ChevronRightIcon fontSize="small" />
                </IconButton>
              </>
            )}

            {defaultValue !== undefined && (
              <IconButton
                onClick={() => onChange(defaultValue)}
                disabled={value === defaultValue}
              >
                <RefreshIcon />
              </IconButton>
            )}
          </Box>
        ),
      }}
    />
  )
}
