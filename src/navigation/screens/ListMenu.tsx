import { Text } from '@react-navigation/elements';
import { StaticScreenProps , useNavigation } from '@react-navigation/native';
import { StyleSheet, View , TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons ,FontAwesome6} from '@expo/vector-icons';
import { useTheme } from '../../components/ThemeProvider.tsx'


type Props = StaticScreenProps<{
  user: string;
}>;

export function ListMenu({ route }: Props) {
    
  const navigation = useNavigation();
  const themes = useTheme()  
  return (
    <View style={themes.UseStyleTheme(styles.container,'background')}>
    
        <View style={styles.customHeader}>
          <TouchableOpacity onPress={()=> navigation.goBack()}>
          <FontAwesome6 name="arrow-left-long" size={24} color={themes.theme == "dark" ? "white" :'#121212'} />
        </TouchableOpacity>

        <View/>
        </View>
        <View style={styles.content}>
      {
          [
              {
                  icon:"led-on",screen:'LedControl'},{icon:"math-log",screen:'LogDevices'}].map((mu,index)=>(
              <TouchableOpacity key={index} onPress={()=> navigation.navigate(mu.screen)}><View style={themes.UseStyleTheme(styles.button_menu,"background",{
                  dark:{
                      backgroundColor:'#403b3b'
                  }
              })}><MaterialCommunityIcons
              
               name={mu.icon} size={24} color={themes.theme == "dark" ? "#121212" :"white"} style={themes.UseStyleTheme(styles.text_button_menu,'text')}/></View></TouchableOpacity>
          ))
      }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingTop:40,
    paddingHorizontal:20
  },
  content:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    gap:10
  },
  button_menu:{
      width:60,
      height:60,
      backgroundColor:'#2062e6',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:20
  },
  text_button_menu:{
      color:'white'
  },
  customHeader:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      //paddingTop:20,
      height:40,
      width:'100%',
      backgroundColor:'transparent',
      alignItems:'center'
  }
  
});
