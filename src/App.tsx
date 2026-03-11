import "../assets/css/global.css"
import { Inter_100Thin } from '@expo-google-fonts/inter/100Thin';
import { Inter_200ExtraLight } from '@expo-google-fonts/inter/200ExtraLight';
import { Inter_300Light } from '@expo-google-fonts/inter/300Light';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { Inter_800ExtraBold } from '@expo-google-fonts/inter/800ExtraBold';
import { Inter_900Black } from '@expo-google-fonts/inter/900Black';
import { Inter_100Thin_Italic } from '@expo-google-fonts/inter/100Thin_Italic';
import { Inter_200ExtraLight_Italic } from '@expo-google-fonts/inter/200ExtraLight_Italic';
import { Inter_300Light_Italic } from '@expo-google-fonts/inter/300Light_Italic';
import { Inter_400Regular_Italic } from '@expo-google-fonts/inter/400Regular_Italic';
import { Inter_500Medium_Italic } from '@expo-google-fonts/inter/500Medium_Italic';
import { Inter_600SemiBold_Italic } from '@expo-google-fonts/inter/600SemiBold_Italic';
import { Inter_700Bold_Italic } from '@expo-google-fonts/inter/700Bold_Italic';
import { Inter_800ExtraBold_Italic } from '@expo-google-fonts/inter/800ExtraBold_Italic';
import { Inter_900Black_Italic } from '@expo-google-fonts/inter/900Black_Italic';

// FONTT MONOSPACE
import { SpaceMono_400Regular } from '@expo-google-fonts/space-mono/400Regular';
import { SpaceMono_400Regular_Italic } from '@expo-google-fonts/space-mono/400Regular_Italic';
import { SpaceMono_700Bold } from '@expo-google-fonts/space-mono/700Bold';
import { SpaceMono_700Bold_Italic } from '@expo-google-fonts/space-mono/700Bold_Italic';

import { Assets as NavigationAssets } from '@react-navigation/elements';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { StatusBar} from 'react-native';
import { useFonts } from 'expo-font';
import { Navigation } from './navigation';
import AllFonts from './components/AllFonts.tsx';
import ThemeProvider,{ useTheme } from './components/ThemeProvider.tsx';
import { useColorScheme } from 'nativewind'
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL('/');






function Root({ navTheme}){
    
    const themes = useTheme();
    const { colorScheme, setColorScheme } = useColorScheme()
    
    React.useEffect(()=>{
        
        // Sembunyikan bilah navigasi sistem (immersive mode)
        NavigationBar.setVisibilityAsync('hidden');
//
        //NavigationBar.setBehaviorAsync('immersive-sticky');


        setColorScheme(themes.theme)
        return () =>{}
    },[])
    
    return (
        <>
           <Navigation
            theme={navTheme}
            linking={{
                enabled: 'auto',
                prefixes: [prefix],
            }}
            onReady={() => {
                SplashScreen.hideAsync();
            }}
            />
            <StatusBar 
                hidden={true}
                barStyle={ themes.theme == 'dark' ? "light-content" : "dark-content"}
                backgroundColor={ themes.theme == "dark" ? "#121212" : "#ffffff" }
            />
        </>
    )
}
export function App() {
  
  const [loadedFonts] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
    Inter_100Thin_Italic,
    Inter_200ExtraLight_Italic,
    Inter_300Light_Italic,
    Inter_400Regular_Italic,
    Inter_500Medium_Italic,
    Inter_600SemiBold_Italic,
    Inter_700Bold_Italic,
    Inter_800ExtraBold_Italic,
    Inter_900Black_Italic,

    // Monospace 
    SpaceMono_400Regular,
    SpaceMono_400Regular_Italic,
    SpaceMono_700Bold,
    SpaceMono_700Bold_Italic
  });

  
  if(loadedFonts){
  

  return (
    <ThemeProvider>
        <SafeAreaProvider>
            <Root />
        </SafeAreaProvider>   
    </ThemeProvider>
  );
  }else{
    return null
  }
}
