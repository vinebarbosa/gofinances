import React from 'react'
import { ThemeProvider } from 'styled-components'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import AppLoading from 'expo-app-loading'

import theme from './src/global/theme'
import { Dashboard } from './src/screens/Dashboard'
import { Register } from './src/screens/Register'
import { CategorySelect } from './src/screens/CategorySelect'

function App(){
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })
  
  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>
  )
}

export default App