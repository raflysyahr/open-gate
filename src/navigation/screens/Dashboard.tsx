import React, { useState } from 'react';
import { Button } from '@react-navigation/elements'
import { View, Text, TouchableOpacity, Switch, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../../components/ThemeProvider.tsx'


const StyleTheme = (
  obj_style:any,
  change:string,
  theme:boolean
)=> {

  const style = Array.isArray(obj_style) ? obj_style : [obj_style]

  if(change === "text"){
    if(theme){
      return [...style,{ color:"#ffffff" }]
    }else{
      return [...style,{ color:"#121212"}]
    }
  }else{
    if(theme){
      return [...style,styles.darkBackground]
    }else{
      return [...style,styles.lightBackground]
    }
  }

}

export default function Dashboard() {
  const [otaMode, setOtaMode] = useState('Firmware');
  const [darkUI, setDarkUI] = useState(true);
  const themes = useTheme()


  const toggleDarkUI = () => themes.setThemeGlobal() //setDarkUI(previousState => !previousState);

  // Kita buat simple dropdown simulasi dengan TouchableOpacity untuk OTA Mode
  // Bisa dikembangkan lagi jika ingin dropdown yg sebenarnya
  return (
    <View style={themes.UseStyleTheme([styles.container],'background')}>
      {/* Logo dan Judul */}
      <View style={styles.logoContainer}>
        
        <Text style={themes.UseStyleTheme(styles.title,"text")}>Gates <Text className="text-red-500 font-bold text-[18px]" >Pro</Text></Text>
      </View>

      {/* Drag and drop area */}
      <TouchableOpacity style={[styles.dragDropArea, darkUI ? styles.dragDropDark : styles.dragDropLight]}>
        <Text style={themes.UseStyleTheme([styles.dragDropText, styles.dragDropMainText],"text")}>Drag and drop here</Text>
        <Text style={themes.UseStyleTheme([styles.dragDropText, styles.dragDropOrText],"text")}>or</Text>
        <Text style={themes.UseStyleTheme([styles.dragDropText, styles.dragDropSubText],"text")}>click to select (.bin) file</Text>
      </TouchableOpacity>

      {/* Settings */}
      <Text style={themes.UseStyleTheme([styles.settingsLabel],'text')}>SETTINGS</Text>

      <View style={styles.settingsRow}>
        <Text style={themes.UseStyleTheme([styles.settingsText],'text')}>OTA Mode</Text>
        <TouchableOpacity style={[styles.modeButton]}>
      
          <Text style={themes.UseStyleTheme([styles.modeButtonText],'text')}>
            {otaMode}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsRow}>
        <Text style={themes.UseStyleTheme([styles.settingsText],"text")}>Dark UI</Text>
        <Switch 
          value={themes.theme == "dark" ? true : false} 
          onValueChange={toggleDarkUI} 
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={themes.theme == 'dark' ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingsRow}>
        <Text style={themes.UseStyleTheme([styles.settingsText],'text')}>Hardware ID</Text>
        <Text style={themes.UseStyleTheme([styles.textGrey,{ fontFamily:"Inter_100Thin" }],'text')}>
          test-hardware
        </Text>
      </View>

      <View style={styles.settingsRow}>
        <Text style={themes.UseStyleTheme([styles.settingsText],'text')}>Firmware Version</Text>
        <Text style={themes.UseStyleTheme([styles.textGrey, { fontFamily: "Inter_100Thin" }],'text')}>
          1.0.0
        </Text>
      </View>
      <View>
        <Button width="100px" screen="ListMenu" style={themes.UseStyleTheme(styles.btnLogs,'text')}>See Menu</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnLogs:{
    backgroundColor:'transparent',

  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  lightBackground: {
    backgroundColor: '#FFF',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logoBox: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    marginRight: 10,
    // Simulate the cube shape with border
    borderWidth: 2,
    borderColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'white',
  },
  pro: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'red',
  },
  dragDropArea: {
    width: '90%',
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  dragDropDark: {
    borderColor: 'gray',
  },
  dragDropLight: {
    borderColor: 'gray',
  },
  dragDropText: {
    textAlign: 'center',
    fontFamily: "Inter_200ExtraLight"
  },
  dragDropMainText: {
    color: 'white',
    fontSize: 14,
  },
  dragDropOrText: {
    color: 'gray',
    marginVertical: 5,
  },
  dragDropSubText: {
    color: 'gray',
  },
  settingsLabel: {
    fontSize: 14,
    marginBottom: 10,
    letterSpacing: 2,
    fontFamily: "Inter_400Regular"
  },
  settingsRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  settingsText: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: "Inter_200ExtraLight"
  },
  modeButton: {
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,

  },
  modeButtonDark: {
    backgroundColor: '#252525',
  },
  modeButtonLight: {
    backgroundColor: '#DDD',
  },
  modeButtonText: {
    fontSize: 16,
    fontFamily: "Inter_100Thin",
  },
  textWhite: {
    color: 'white',
  },
  textBlack: {
    color: 'black',
  },
  textGrey: {
    fontSize: 12,
    fontWeight: '400',
  },
  textGreyDark: {
    color: 'grey',
  },
  textGreyLight: {
    color: '#555',
  },
});
