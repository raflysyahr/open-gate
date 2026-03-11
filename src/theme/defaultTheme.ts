import { ThemeMode, StyleType } from './types'

export const DEFAULT_THEME: Record<
  StyleType,
  Record<ThemeMode, Record<string, any>>
> = {
  text: {
    light: { color: '#121212' },
    dark: { color: '#ffffff' },
  },
  background: {
    light: { backgroundColor: '#ffffff' },
    dark: { backgroundColor: '#121212' },
  },
}