import { BleManager } from 'react-native-ble-plx'
import { requestBluetoothPermissions, requestClassicPermissions }from '../../helper/RequestBluetoothPermissions.tsx';
import { Buffer } from 'buffer'
import { Linking } from 'react-native'

import RNBluetoothClassic from 'react-native-bluetooth-classic'

export async function classicScanDevices() {
  const granted = await requestClassicPermissions()

  if (!granted) {
    console.log("Permission denied")
    return
  }

  const enabled = await RNBluetoothClassic.isBluetoothEnabled()
  console.log("Bluetooth enabled?", enabled)


  const devicesRaw = await RNBluetoothClassic.getBondedDevices() // list paired devices
  const devices = devicesRaw.map(device => ({
    id: device.id,
    name: device.name,
    bonded: device.bonded,
    type: device.type
  }))

  console.log("Paired devices:", devices)

  const unpaired = await RNBluetoothClassic.startDiscovery() // scan new
  console.log(unpaired)
  console.log("Found devices:", unpaired)

  return unpaired
}

const manager = new BleManager();

export async function scanDevices() {
  const granted = await requestBluetoothPermissions()
  console.log("Permission granted:", granted)

  if (!granted) return []

  return new Promise((resolve) => {
    const devices: any[] = []

    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        console.log("Bluetooth ready")

        manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log("Scan error:", error)
            manager.stopDeviceScan()
            resolve([])
          }

          if (device?.name) {
            /**
             * {"id": "98:A3:16:F0:C7:06", "isConnectable": true, "localName": "ESP32_IOT", "manufacturerData": null, "mtu": 23, "name": "ESP32_IOT", "overflowServiceUUIDs": null, "rawScanRecord": "AgEGCglFU1AzMl9JT1QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", "rssi": -42, "serviceData": null, "serviceUUIDs": null, "solicitedServiceUUIDs": null, "txPowerLevel": null}
            */
            console.log("Found device:", device.name)
            devices.push({ 
              name:device.name,
              id:device.id,
              isConnectable:device.isConnectable,
              manufacturerData:device.manufacturerData
            })
          }
          
          if (device?.manufacturerData){

            const raw = Buffer.from(device.manufacturerData, 'base64');

            const companyId = raw.readUInt16LE(0);
            const flag = raw[2];

            if (flag === 0x00) {
                console.log(device.name,"Device belum setup");
            }

            if (flag === 0x01) {
                console.log(device.name,"Device siap Quick Start");
            }
          }
          
        })

        subscription.remove() // stop listening state
      }
    }, true)



    // Timeout 10 detik untuk scan
    setTimeout(() => {

      const UniqDevices = Object.values(
          devices.reduce((acc, device) => {
            if (!acc[device.id] || device.rssi > acc[device.id].rssi) {
                acc[device.id] = device;
            }
            return acc;
            }, {})
      );

      manager.stopDeviceScan()
      resolve(UniqDevices)
    }, 3000)
  })
}






export async function connectToDevice(deviceId) {
  const device = await manager.connectToDevice(deviceId)
  await device.discoverAllServicesAndCharacteristics()

  console.log("Connected to:", device.name)
  return device
}



export async function readData(device, serviceUUID, characteristicUUID) {
  const characteristic = await device.readCharacteristicForService(
    serviceUUID,
    characteristicUUID
  )

  const value = characteristic.value
  console.log("Raw base64:", value)
}




export async function writeData(device, serviceUUID, characteristicUUID, text) {
  const base64 = Buffer.from(text).toString('base64')

  await device.writeCharacteristicWithResponseForService(
    serviceUUID,
    characteristicUUID,
    base64
  )
}


