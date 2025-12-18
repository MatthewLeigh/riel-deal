import { ThemeProvider, CssBaseline } from '@mui/material'
import SwipeContainer from './components/SwipeContainer'
import { StoreProvider } from './state/StoreContext'
import theme from './theme'

export default function App() {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SwipeContainer />
      </ThemeProvider>
    </StoreProvider>
  )
}
