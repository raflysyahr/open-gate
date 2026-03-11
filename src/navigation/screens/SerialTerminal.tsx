import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";

// ── Use SVG icons (recommended clean way) ──
import ErrorOutline from "@material-symbols/svg-500/outlined/error.svg";
import SignalCellularAlt from "@material-symbols/svg-500/outlined/signal_cellular_alt.svg";
import Wifi from "@material-symbols/svg-500/outlined/wifi.svg";
import Bluetooth from "@material-symbols/svg-500/outlined/bluetooth.svg";
import BatteryFull from "@material-symbols/svg-500/outlined/battery_full.svg";
import WifiOff from "@material-symbols/svg-500/outlined/wifi_off.svg";
import BluetoothDisabled from "@material-symbols/svg-500/outlined/bluetooth_disabled.svg";
import TerminalIcon from "@material-symbols/svg-500/outlined/terminal.svg";
import ArrowDownward from "@material-symbols/svg-500/outlined/arrow_downward.svg";
import Send from "@material-symbols/svg-500/outlined/send.svg";
import SettingsInputComponent from "@material-symbols/svg-500/outlined/settings_input_component.svg";
import KeyboardReturn from "@material-symbols/svg-500/outlined/keyboard_return.svg";
import FileDownload from "@material-symbols/svg-500/outlined/file_download_off-fill.svg";

// Fallback if you prefer @expo/vector-icons
// import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function SerialTerminal() {
  const isDark = true ;//useColorScheme().colorScheme === "dark";

  const bg = isDark ? "bg-background-dark" : "bg-background-light";
  const text = isDark ? "text-white" : "text-slate-900";
  const muted = isDark ? "text-slate-500" : "text-slate-500";
  const border = isDark ? "border-white/10" : "border-slate-200";

  return (
    <View className={`flex-1 ${bg} font-display ${text} min-h-screen`}>
      {/* Status bar simulation – iPhone style */}
      <View className="h-7 bg-inherit px-6 flex-row items-center justify-between text-xs font-semibold">
        <Text>9:41</Text>
        <View className="flex-row items-center gap-1.5">
          <SignalCellularAlt width={16} height={16} fill={isDark ? "white" : "black"} />
          <Wifi width={16} height={16} fill={isDark ? "white" : "black"} />
          <Bluetooth width={16} height={16} fill={isDark ? "white" : "black"} />
          <BatteryFull width={20} height={20} fill={isDark ? "white" : "black"} />
        </View>
      </View>

      {/* Disconnected banner */}
      <View className="bg-red-600 py-1.5 px-4 flex-row items-center justify-center gap-2 shadow-lg">
        <ErrorOutline width={14} height={14} fill="white" />
        <Text className="text-white text-[11px] font-bold uppercase tracking-wider">
          Disconnected
        </Text>
      </View>

      {/* Connection info bar */}
      <View className={`${bg} ${border} border-b px-4 py-2 flex-row justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-500`}>
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1.5 text-slate-400">
            <WifiOff width={14} height={14} fill="gray" />
            <Text>Home_5G</Text>
          </View>
          <View className="flex-row items-center gap-1.5 text-slate-400">
            <BluetoothDisabled width={14} height={14} fill="gray" />
            <Text>ESP32-DEV</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <View className="w-2 h-2 rounded-full bg-red-500" />
          <Text className="text-red-500/80 uppercase">No Signal</Text>
        </View>
      </View>

      {/* Header */}
      <View className={`sticky top-0 z-10 ${bg}/80 backdrop-blur-md ${border} border-b px-4 py-3`}>
        <View className="max-w-md mx-auto flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center">
              <TerminalIcon width={24} height={24} fill="#93f20d" />
            </View>
            <View>
              <Text className="text-lg font-bold text-slate-400">Serial Terminal</Text>
              <Text className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mt-1">
                Offline Mode
              </Text>
            </View>
          </View>

          <TouchableOpacity className="px-4 py-1.5 rounded-full bg-slate-200 dark:bg-white/5">
            <Text className="text-sm font-medium">Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content */}
      <View className="flex-1 flex-col max-w-md mx-auto w-full bg-black/20">
        <ScrollView
          className="flex-1 p-4 space-y-1 font-mono text-sm"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {[
            { time: "10:15:02", text: "Initializing system...", color: "text-primary" },
            { time: "10:15:03", text: "Checking flash memory... OK", color: "text-white" },
            { time: "10:15:04", text: "Connecting to WiFi: SSID_Home", color: "text-primary" },
            { time: "10:15:06", text: "WiFi Connected. IP: 192.168.1.45", color: "text-primary" },
            { time: "10:15:21", text: "Error: Connection lost.", color: "text-red-500" },
            { time: "10:15:23", text: "Attempting to reconnect...", color: "text-slate-500 italic" },
            { time: "10:15:25", text: "_", color: "text-red-500 animate-pulse" },
          ].map((item, i) => (
            <View key={i} className="flex-row gap-2">
              <Text className="text-slate-500 shrink-0">{`[${item.time}]`}</Text>
              <Text className={item.color}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Command buttons row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 py-2 border-t border-white/5 bg-background-dark flex-row gap-2"
        >
          {["RESET", "STATUS", "PING", "GPIO LOW", "DEBUG ON"].map((cmd) => (
            <TouchableOpacity
              key={cmd}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 opacity-60"
              disabled
            >
              <Text className="text-xs font-medium text-slate-600">{cmd}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input area */}
        <View className="p-4 pb-10 bg-background-light dark:bg-[#12140e] border-t border-slate-200 dark:border-white/10 shadow-2xl">
          <View className="flex-row gap-2 max-w-md mx-auto opacity-50 pointer-events-none">
            <View className="flex-1 relative">
              <TextInput
                className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 font-mono text-sm placeholder:text-slate-500"
                placeholder="Offline..."
                editable={false}
              />
            </View>
            <TouchableOpacity className="bg-slate-700 px-6 rounded-xl items-center justify-center">
              <Send width={20} height={20} fill="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center mt-3 px-1">
            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-row items-center gap-1">
                <SettingsInputComponent width={16} height={16} fill="gray" />
                <Text className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  115200 Baud
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center gap-1">
                <KeyboardReturn width={16} height={16} fill="gray" />
                <Text className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  CR+LF
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <FileDownload width={20} height={20} fill="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Floating scroll-to-bottom button */}
      <TouchableOpacity className="absolute bottom-36 right-6 bg-white/10 backdrop-blur-md border border-white/20 w-10 h-10 rounded-full items-center justify-center shadow-lg">
        <ArrowDownward width={20} height={20} fill="white" />
      </TouchableOpacity>
    </View>
  );
}
