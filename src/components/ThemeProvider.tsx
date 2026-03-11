


import { useState, useContext , createContext } from 'react'

import { ThemeMode , UseStyleTheme as useStyleTheme, StyleType  } from '../theme'
import { useColorScheme } from 'nativewind'

const ThemeContext = createContext<ThemeMode>();

export default function ThemeProvider({ children }){

  const [theme,setTheme] = useState("dark");
  const { colorScheme, setColorScheme } = useColorScheme()
  
  const setThemeGlobal = ()=> {
    if(theme == "dark"){
      setTheme("light")
      setColorScheme("light")
    }else{
      setTheme("dark")
      setColorScheme("dark")
    }
  }
  
  const UseStyleTheme = (
     styles: any,
     type: StyleType,
     customStyle?: {
        light?: Record<string, any>
        dark?: Record<string, any>
     }
  )=>{
      return useStyleTheme(styles,type,theme,customStyle)
  }


  return (<ThemeContext.Provider value={{ theme,setThemeGlobal,UseStyleTheme}}>{ children }</ThemeContext.Provider>)
}


export const useTheme = ()=> useContext(ThemeContext)
