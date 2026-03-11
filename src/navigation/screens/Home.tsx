import { View, Text, Pressable, ImageBackground, Animated } from "react-native";
import { useState } from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { StaticScreenProps , useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { useTheme } from "../../components/ThemeProvider.tsx";
import bgTrans from '../../../assets/image/bg_trans.png'
import { scanDevices } from '../../components/ble/Bluetooth.tsx';

import MQTTBroker from '../../../modules/mqtt-broker';













export default function Home() {

  
  const ping = useRef(new Animated.Value(0)).current;
  const themes = useTheme()
  const navigation = useNavigation();
  const [deviceBluetooth,setDeviceBluetooth] = useState([])
  
  useEffect(() => {
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(ping, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(ping, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const scale = ping.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.5],
  });

  const opacity = ping.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 0],
  });

  const ScanningEsp = async()=> {
    const result = await  scanDevices();
    console.log("devices: ",result)
    setDeviceBluetooth([result])
  }

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      {/* Top App Bar */}
      <View className="flex-row items-center justify-between p-4 pt-4pb-2">
        <View  className="w-12 flex flex-row h-12 justify-center">
          <Pressable onPress={()=> themes.setThemeGlobal()}>
            <MaterialIcons name="settings" size={24} color={ themes.theme == "dark" ? "#ffffff" : "#121212"} />
          </Pressable>
        </View>

        <Pressable className="w-12 h-12 items-center justify-center">
          <MaterialIcons name="notifications" size={24} color={ themes.theme == "dark" ? "#ffffff" : "#121212"} />
          <View className="absolute top-3 right-3">
            <Animated.View
              style={{
                position: "absolute",
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#ccff00",
                transform: [{ scale }],
                opacity,
              }}
            />
            <View className="w-2 h-2 rounded-full bg-accent-lime" />
          </View>
        </Pressable>
      </View>

      {/* Hero Section */}
      <View className="flex w-full justify-center flex-row py-2 ">
        <ImageBackground
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9yyDEQ3BhVwD39ZxJRMVq4DKQjsX25vPIVvObkiecRNovmu0BPELaLaBABCiI688S40Gt2_NFlkW2y8dzXKLZv1HLODg2ngp5A4OGwKDsJAb0hKGY8akJh3Od09LW_ol-vdsdwJqOg3v5LVHGkO1Fe11JOgix4cBATpYFklehy44fgkD5VD0uASqXFvJyG0Z6cmsNce3uhvqK23uaSprq0t2ytq9FqmswdOzeRfZqekmWE_M-OJvoKQkLO_gDnmz41VGvdYvyVWsG",
          }}
          blurRadius={5}
          resizeMode="cover"
          className="rounded-xl overflow-hidden w-[230px] min-h-[230px] border border-primary/20"
        >
          <LinearGradient
            colors={["rgba(5,5,5,0.8)", "rgba(13,89,242,0.1)"]}
            className="flex-1 items-center justify-center"
          >
            <View className="items-center">
              <ImageBackground
                source={bgTrans}
                blurRadius={5}
                borderRadius={10}
                className="flex mt-4 mb-2 items-center justify-center w-[100px] h-[100px]">
                <MaterialIcons
                  name="memory"
                  size={64}
                  color="#0d59f2"
                />
              </ImageBackground>
              

              <View className="flex-row items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-accent-lime/30">
                <View className="w-2 h-2 rounded-full bg-accent-lime" />
                <Text className="text-[10px] font-bold tracking-widest text-accent-lime">
                  SYSTEM READY
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      {/* Headline */}
      <Text className="px-6 dark:text-slate-600 pt-2 pb-2 text-[20px] font-bold tracking-tight">
        Welcome Back
      </Text>

      {/* Summary */}
      <View className="px-6 py-1">
        <Text className="text-slate-600 dark:text-slate-400 text-md">
          Your workspace is ready.
        </Text>

        {/* Last Session */}
        <Pressable
        onPress={()=> navigation.navigate("SerialTerminal")}
        className="mt-4 p-2 rounded-xl bg-primary/5 border border-primary/10 flex-row gap-4">
          <View className="p-2 bg-primary/20 rounded-lg">
            <MaterialIcons name="sensors" size={20} color="#0d59f2" />
          </View>
          <View>
            <Text className="text-xs uppercase tracking-wider text-slate-500 font-bold">
              Last Connected
            </Text>
            <Text className="text-sm font-medium dark:text-slate-600">
              ESP32-Room1{" "}
              <Text className="text-slate-500 font-normal">
                (2 hours ago)
              </Text>
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Actions */}
      <View className="mt-auto px-6 py-8 gap-4">
        <Pressable onPress={()=> MQTTBroker.stopBroker()} className="h-14 rounded-xl bg-primary flex-row items-center justify-center gap-3">
          <MaterialIcons name="wifi" size={24} color="white" />
          <Text className="text-white text-lg font-bold">Quick Connect</Text>
        </Pressable>

        <Pressable 
        onPress={()=> navigation.navigate("AddNewDevice")}
        className="h-14 rounded-xl border-2 border-slate-200 dark:border-slate-800 flex-row items-center justify-center gap-3">
          <MaterialIcons name="add-circle" size={24} />
          <Text className="text-lg font-bold dark:text-white">Add New Device</Text>
        </Pressable>
      </View>

      {/* Footer */}
      <View className="pb-8 px-6 items-center">
       
         <Text className="text-accent-lime">System Online</Text>       
        
      </View>

      <View className="h-6" />
    </View>
  );
}
