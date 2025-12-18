import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Settings } from './store'
import { defaultSettings } from './store'

type Store = {
  settings: Settings
  setSettings: React.Dispatch<React.SetStateAction<Settings>>
}

const LOCAL_STORAGE_SETTINGS_KEY = 'rielDealSettings'

const StoreContext = createContext<Store | undefined>(undefined)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY)

    return saved
      ? { ...defaultSettings, ...JSON.parse(saved) }
      : { ...defaultSettings }
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(settings))
  }, [settings])

  return (
    <StoreContext.Provider value={{ settings, setSettings }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within StoreProvider')
  }
  return context
}
