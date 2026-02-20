import { Platform } from 'react-native';
import Constants from 'expo-constants';

let API_BASE = Constants.expoConfig.extra.API_BASE;

if (Platform.OS === 'android') {
  API_BASE = API_BASE.replace('host.docker.internal', '10.0.2.2');
}

export default API_BASE;