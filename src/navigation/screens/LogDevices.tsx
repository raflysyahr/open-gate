import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons , FontAwesome6} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../components/ThemeProvider.tsx';

export default function LogDevices() {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [dataReceived, setDataReceived] = useState(false); // Untuk contoh, bisa dikendalikan
  const themes = useTheme();

  const [dataLog,setDataLog] = useState([
    "Intialize firmware...",
    "Set Wifi connection...."
  ]);

  

  return (
    <View style={themes.UseStyleTheme(styles.container,'background')}>
      {/* Header */}
      <View style={themes.UseStyleTheme([{ marginTop:20 , marginBottom:10 ,height:40,display:"flex",flexDirection:'row',alignItems:'center',justifyContent:'space-between'}],'background')}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <FontAwesome6 name="arrow-left-long" size={24} color={themes.theme == "dark" ? "white" :'#121212'} />
        </TouchableOpacity>
        <View />
      </View>
      <View style={themes.UseStyleTheme(styles.header,'background',{
          dark:{
              backgroundColor:'#332f2f'
          },
          light:{
              backgroundColor:'#f2e9f6'
          }
      })}>
        <Text style={themes.UseStyleTheme(styles.title,'text')}>Select Device</Text>
        <MaterialCommunityIcons name="link" size={24} color={themes.theme == "dark" ? "white" :'#121212'}/>
        <MaterialCommunityIcons name="dots-vertical" size={24} color={themes.theme == "dark" ? "white" :'#121212'} />
      </View>

      {/* Konten Tengah */}
      <View style={themes.UseStyleTheme([styles.content,dataLog.length == 0 ? {
        justifyContent: "center",
        alignItems:'center'
      } : {}],'background')}>
        {
          dataLog.length == 0 ?
            <Text style={themes.UseStyleTheme(styles.noDataText,'text')}>
              No data received ye
            </Text>
          : dataLog.map((text,index)=>(
            <Text key={index} style={themes.UseStyleTheme([styles.textLog],'text',{
                dark:{
                    color:'#36c75c'
                }
            })}>{text}</Text>
          ))
        }
      </View>

      {/* Input dan tombol Kirim */}
      <View style={themes.UseStyleTheme(styles.footer,'text')}>
        <TextInput
          style={styles.input}
          placeholder="Type message to send..."
          placeholderTextColor="#bbb"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          style={themes.UseStyleTheme([styles.sendButton, { opacity: message.trim() ? 1 : 0.8 }],'background',{
              dark:{
                  backgroundColor:'blue'
              }
          })}
          disabled={!message.trim()}
          onPress={() => {
            // Fungsi untuk mengirim pesan
            console.log("Sending message:", message);
            
            if(message.startsWith('/clear')){
                setDataLog([])
            }else{
                setDataLog([...dataLog, message])
            }    
            setMessage("")
          }}
        >
          <MaterialCommunityIcons name="send" size={20} color={themes.theme == "dark" ? "white" :'#666'} />
          <Text style={themes.UseStyleTheme(styles.sendText,'text')}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textLog:{
    fontSize:13,
    fontFamily:'SpaceMono_400Regular',
    color:'black'
  },
  container: {
    flex: 1,
    backgroundColor: "#faf6fc", // Warna background mirip tone soft pink
    padding: 16
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2e9f6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 40,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter_300Light",
  },
  content: {
    flex: 1,
    paddingHorizontal:20
  },
  noDataText: {
    color: "#777",
    fontFamily: "SpaceMono_400Regular",
    fontSize: 13,
  },
  footer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 12,
    color: "#999",
    fontSize: 13,
    fontFamily: "Inter_300Light",
  },
  sendButton: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sendText: {
    color: "#666",
    fontSize: 13,
    marginLeft: 6,
    fontFamily: "Inter_300Light",
  },
});
