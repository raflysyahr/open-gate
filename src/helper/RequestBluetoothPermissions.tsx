import { PermissionsAndroid, Platform } from 'react-native'

export async function requestBluetoothPermissions() {
  if (Platform.OS === 'android') {
    
    if (Platform.Version >= 31) {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ])

      return result
    } else {
      const result = await PermissionsAndroid.request(
        
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )

      return result
    }
  }
}


export async function requestClassicPermissions() {
  if (Platform.OS === 'android') {

    if (Platform.Version >= 31) {
      const perms = [
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ]
      const result = await PermissionsAndroid.requestMultiple(perms)
      console.log(result)
      return Object.values(result).every(v => v === 'granted')
    }else{
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )

      return result
    }
  }
  
}
