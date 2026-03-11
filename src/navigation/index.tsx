import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import Home from './screens/Home';
import { ListMenu } from './screens/ListMenu';
import { Settings } from './screens/Settings';
import { Updates } from './screens/Updates';
import { NotFound } from './screens/NotFound';
import Dashboard from './screens/Dashboard.tsx';
import LoadFonts from '../components/LoadFonts.tsx'
import LogDevices from './screens/LogDevices.tsx';
import LedControl from './screens/LedControl.tsx';
import SerialTerminal from './screens/SerialTerminal.tsx';
import AddNewDevice from './screens/AddNewDevice.tsx';


const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Feed',
        tabBarStyle:{ display:'none' },
        headerShown:false,
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Updates: {
      screen: Updates,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
        tabBarStyle:{ display:'none' }
      },
    },
    ListMenu: {
      screen: ListMenu,
      options:{
          headerShown:false
      },
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    LogDevices:{
      screen:LogDevices,
      options:({ navigation })=>({
        presentation:'modal',
        headerShown:false
      })
    },
    LedControl:{
      screen:LedControl,
      options:({ navigation })=>({
        presentation:'modal',
        headerShown:false
      })
    },
    SerialTerminal:{
      screen:SerialTerminal,
      options:({ navigation })=>({
        presentation:'modal',
        headerShown:false
      })
    },
    AddNewDevice:{
      screen:AddNewDevice,
      options:({ navigation })=>({
        presentation:'modal',
        headerShown:false
      })
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
