import { DEFAULT_THEME } from './defaultTheme'
import { ThemeMode, StyleType } from './types'
import { useColorScheme } from 'nativewind'


export const UseStyleThemeV = (
  styles: any,
  type: StyleType,
  theme: ThemeMode,
  customStyle?: {
    light?: Record<string, any>
    dark?: Record<string, any>
  }
) => {
    
  const { colorScheme, setColorScheme } = useColorScheme()
  const baseStyle = Array.isArray(styles) ? styles : [styles]
  setColorSchem(theme)
  
  return [
    ...baseStyle,
    DEFAULT_THEME[type][theme],
    customStyle?.[theme] || {},
  ]
}


