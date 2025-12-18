import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#cc6839' },
    secondary: { main: '#cc6839' },
    background: { default: '#111', paper: '#111' },
    text: { primary: '#fff', secondary: '#e47643' },
  },
  typography: {
    fontFamily: 'Noto Sans JP, Roboto, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
})

export default theme