import React, { useEffect, useRef , useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
  useColorScheme,
  Pressable
} from 'react-native';
import Animited, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StaticScreenProps , useNavigation } from '@react-navigation/native';
import { scanDevices , connectToDevice} from '../../components/ble/Bluetooth.tsx';

// ─── PULSE ANIMATION ────────────────────────────────────────
function usePulseAnimation() {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(anim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const scale1 = anim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1.6] });
  const opacity1 = anim.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0.6, 0.9, 0] });

  const scale2 = anim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1.4] });
  const opacity2 = anim.interpolate({ inputRange: [0.2, 0.6, 1], outputRange: [0.5, 0.8, 0] });

  const scale3 = anim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.2] });
  const opacity3 = anim.interpolate({ inputRange: [0.4, 0.8, 1], outputRange: [0.4, 0.7, 0] });

  return { scale1, opacity1, scale2, opacity2, scale3, opacity3 };
}

// ─── DEVICE ITEM ────────────────────────────────────────────
type DeviceProps = {
  id:string;
  name: string;
  signal: string;
  type: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  bgColor: string;
  buttonText: string;
  disabled?: boolean;
  callback:any
};

function DeviceItem({ id, name, signal, type, icon, iconColor, bgColor, buttonText, disabled , callback}: DeviceProps) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  
  const goConnect = ()=> {
      console.log("id",id)
      const result = connectToDevice(id)
      callback(result)
  }

  return (
    <View
      className={`flex-row mb-2 items-center justify-between py-2 px-4 rounded-xl border ${
        isDark ? 'bg-slate-800/40 border-slate-700/50' : 'bg-white border-slate-200'
      }`}
    >
      <View className="flex-row items-center gap-4">
        <View className={`size-10 rounded-lg items-center justify-center ${bgColor}`}>
          <MaterialIcons name={icon} size={25} color={iconColor} />
        </View>
        <View>
          <Text className="font-bold text-base text-slate-900 dark:text-slate-100">{name}</Text>
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            Signal: {signal} • {type}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={goConnect}
        className={`px-2 py-2 rounded-lg ${
          disabled
            ? 'bg-slate-200 dark:bg-slate-700'
            : 'bg-primary active:opacity-90 active:scale-95'
        }`}
        disabled={disabled}
      >
        <Text
          className={`font-bold text-sm ${
            disabled ? 'text-slate-900 dark:text-slate-100' : 'text-background-dark'
          }`}
        >
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const className = (...classes)=> classes.filter(Boolean).join(" ")
const AnimatedPressable = Animited.createAnimatedComponent(Pressable);

// ─── MAIN COMPONENT ─────────────────────────────────────────
export default function AddNewDevice() {
  const scheme = useColorScheme();
  const [isScan,setIsScan] = useState(false);
  const [connectedDevice,setConnectedDevice] = useState(false)

  const [devices,setDevices] = useState([])
  const isDark = scheme === 'dark';
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const translateY = useSharedValue(128); // start hidden

  const showNotif = () => {
    translateY.value = withTiming(0, { duration: 700 });
  };
  
  const hideNotif = () => {
    translateY.value = withTiming(128, { duration: 700 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: "-50%" }, // dari -translate-x-1/2
      { translateY: translateY.value },
    ],
  }));
  
  const pulse = usePulseAnimation();
  const scanDevice = async ()=>{
    setIsScan(true)
    const result = await scanDevices();
    console.log(result)
    setDevices(result)
    setIsScan(false)
  }
  
  
  const NotifyConnect =()=>{
      showNotif()
      
      setTimeout(()=>{
          hideNotif()
      },2000)
  }

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View
        className="flex-row items-center justify-between px-4 pt-12 pb-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10"
        style={{ paddingTop: insets.top + 12 }}
      >
        <TouchableOpacity onPress={()=> navigation.goBack()} className="size-10 items-center justify-center rounded-full hover:bg-primary/10">
          <MaterialIcons name="arrow-back-ios" size={24} color={isDark ? 'white' : '#0f172a'} />
        </TouchableOpacity>

        <Text className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Add New Device
        </Text>

        <View className="size-10" />
      </View>

      {/* Scrollable Content */}
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Scanning Animation */}
        <View className="relative items-center py-12">
          <View className="relative items-center justify-center">
            <Animated.View
              className="absolute size-64 rounded-full border border-primary/20"
              style={{ transform: [{ scale: pulse.scale1 }], opacity: pulse.opacity1 }}
            />
            <Animated.View
              className="absolute size-48 rounded-full border border-primary/40"
              style={{ transform: [{ scale: pulse.scale2 }], opacity: pulse.opacity2 }}
            />
            <Animated.View
              className="absolute size-32 rounded-full border border-primary/60"
              style={{ transform: [{ scale: pulse.scale3 }], opacity: pulse.opacity3 }}
            />

            <View className="size-20 bg-primary/20 rounded-2xl items-center justify-center border border-primary/50 shadow-xl shadow-primary/30">
              <MaterialIcons name="memory" size={40} color="#25d1f4" />
            </View>
          </View>

          <View className="mt-12 items-center">

            <Text className="text-xl font-bold text-slate-900 dark:text-slate-100">
              { isScan ? "Searching for devices..." : "Devices" }
            </Text>
            
            <Text className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Make sure Bluetooth and WiFi are enabled
            </Text>
          </View>
        </View>

        {/* Nearby Devices */}
        <View className="mt-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Nearby Devices
            </Text>
            <View className="flex-row items-center gap-1.5">
              { isScan ? <View className="size-2 rounded-full bg-accent-lime animate-ping" /> :<View className="size-2 rounded-full bg-accent-lime" />}
              <Text className="text-xs font-medium text-accent-lime">{ isScan ? "Scanning" : "Device" }</Text>
            </View>
          </View>

          <View className="space-y-3 overflow-y-scroll max-h-[250px] mb-2">
            { 
                devices.length > 0 ? devices.map((data,index)=>(
                    <DeviceItem
                        id={data.id}
                        callback={(cb)=>{
                            if(cb){
                                NotifyConnect()
                            }
                        }}
                        key={index}
                        name={data.name}
                        signal="Strong"
                        type="Bluetooth"
                        icon="router"
                        iconColor="#25d1f4"
                        bgColor="bg-primary/10"
                        buttonText="Pair"
                    />)) 
                : 
                    <View className="h-[250px] flex items-center justify-center "><Text className="text-gray-700">No Devices Detected</Text></View>
           }
          </View>
          
          <TouchableOpacity onPress={()=> scanDevice()}>
             <View className=" h-[40px] px-2 rounded-lg flex justify-center items-center bg-primary text-white">
                 <Text className="text-white">Scan Devices</Text>
             </View>
          </TouchableOpacity>
          
        </View>

        {/* Manual Entry */}
        <TouchableOpacity onPress={()=> NotifyConnect()} className="mt-8 mb-12 w-full p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl items-center justify-center gap-2 active:border-primary/50 active:text-primary">
          <MaterialIcons name="add-circle-outline" size={24} color="#64748b" />
          <Text className="font-medium text-slate-500 dark:text-slate-400">
            Add Manually (IP / MAC Address)
          </Text>
        </TouchableOpacity>

        {/* Decorative gradient box */}
        <View className="items-center mb-12">
          <View className="w-full max-w-xs h-32 rounded-xl bg-gradient-to-br from-primary/5 to-accent-lime/5 items-center justify-center overflow-hidden relative">
            <View
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                backgroundSize: '16px 16px',
              }}
            />
            <Text className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
              Micro-Controller Ecosystem
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      

      {/* Bluetooth hint pill */}
      {/*<View className={className("absolute durations-700 left-1/2 -translate-x-1/2 bg-accent-lime px-3 py-1 rounded-full flex-row items-center gap-1 shadow-lg pointer-events-none h-[40px]",connectedDevice ? " bottom-28":" -bottom-[100px]" )}>*/}
      <AnimatedPressable
        className="
          absolute
          left-1/2
          bg-accent-lime
          px-3 py-1
          rounded-full
          flex-row items-center
          gap-1
          shadow-lg
          pointer-events-none
          h-[40px]
        "
        style={[
          { bottom: 28 }, // posisi final
          animatedStyle,
        ]}
      >
        <MaterialIcons name="bluetooth" size={16} color="#101f22" />
        <Text className="text-[10px] font-bold text-background-dark">BLUETOOTH ACTIVE</Text>
      </AnimatedPressable>
      {/*</View>*/}
      
    </SafeAreaView>
  );
}
