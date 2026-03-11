import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import mqtt from 'mqtt';

export default function LedControl() {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [ledStatus, setLedStatus] = useState('OFF'); // Status lokal LED
  const [msg,setMsg] = useState("-")

  // Konfigurasi MQTT
  const brokerUrl = 'ws://192.168.1.2:9001'; // Ganti dengan broker Anda
  const topic = 'esp32s3/blink'; // Topik untuk kontrol LED

  useEffect(() => {
    // Koneksi ke broker MQTT
    const mqttClient = mqtt.connect(brokerUrl,{
      clientId: 'react_native_' + Math.random().toString(16).substr(2, 8),
      keepalive: 60,
      clean: true,
      protocol: 'ws'
    });

    mqttClient.on('connect', () => {
      setIsConnected(true);

      setMsg('Terhubung ke MQTT broker');
    });

    mqttClient.on('error', (err) => {
      console.error('Error MQTT:', err);
      setIsConnected(false);
      Alert.alert('Error', 'Gagal terhubung ke MQTT broker');
      setMsg("Gagal terhubung ke MQTT broker")
    });

    mqttClient.on('offline', () => {
      setIsConnected(false);
      setMsg('MQTT offline');
    });

    setClient(mqttClient);

    // Cleanup saat unmount
    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  // Fungsi untuk mengirim pesan MQTT
  const sendMessage = (message) => {
    if (client && isConnected) {
      client.publish(topic, message, { qos: 0, retain: false }, (err) => {
        if (err) {
          Alert.alert('Error', 'Gagal mengirim pesan');
        } else {
          setLedStatus(message); // Update status lokal
          console.log(`Pesan dikirim: ${message}`);
        }
      });
    } else {
      Alert.alert('Error', 'Tidak terhubung ke MQTT');
    }
  };

  const goConnect = ()=>{
    const mqttClient = mqtt.connect(brokerUrl,{
      clientId: 'react_native_' + Math.random().toString(16).substr(2, 8),
      keepalive: 60,
      clean: true,
      protocol: 'ws'
    });
    mqttClient.on('connect', () => {
      setIsConnected(true);
      Alert.alert("Terhubung ke Mqtt broker");
      setMsg("Terhubung ke MQTT")
    })

    mqttClient.on('error', (err) => {
      setMsg(`'Error MQTT ${err}`);
      setIsConnected(false);
      Alert.alert('Error', 'Gagal terhubung ke MQTT broker');
    })

    mqttClient.on('offline', () => {
      setIsConnected(false);
      setMsg('MQTT offline');
    })

    setClient(mqttClient);

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kontrol LED via MQTT</Text>
      <Text>Message: {msg}</Text>
      <Text style={styles.status}>
        Status Koneksi: {isConnected ? 'Terhubung' : 'Tidak Terhubung'}
      </Text>
      <Text style={styles.status}>Status LED: {ledStatus}</Text>

      <View style={styles.buttonContainer}>
      { "RED,GREEN,BLUE,CYAN,WHITE,MAGENTA,YELLOW,PURPLE,ORANGE".split(",").map((COLOR,index)=>(
        <TouchableOpacity
        key={index}
          style={[styles.button, { borderWidth:1,borderStyle:"solid",borderColor: `${COLOR.toLowerCase()}` }]}
          onPress={() => sendMessage(COLOR)}
        >
          <Text style={styles.buttonText}>{COLOR.toLowerCase()}</Text>
        </TouchableOpacity>
      ))}

      </View>
      <TouchableOpacity
      onPress={goConnect}
      style={[styles.button,{ backgroundColor:"blue",color:"white",marginTop:3 }]}
      ><Text style={{ color:"white"}}>Reconnect</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap:"wrap",
    width: '100%',
  },
  button: {
    margin:2,
    padding: 2,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    borderRadius: 10,
    width: 130,
    height:40,
    alignItems: 'center',
    fontFamily:"Droid Sans Mono",
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily:"Droid Sans Mono"
  },
});