import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export const TOKEN_KEY =
  process.env.EXPO_PUBLIC_TOKEN_KEY || "@agenda_campo:token";

// Obter o IP dinamicamente a partir do servidor do Expo Metro
const getHostIp = (): string => {
  // Pega o IP/Host em que o bundler do Expo está rodando
  const debuggerHost =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoGoConfig?.debuggerHost;

  if (debuggerHost) {
    // Retorna apenas o endereço IP (removendo a porta do Metro)
    return debuggerHost.split(":")[0];
  }

  // Fallback para emulador local caso não consiga detectar
  return "10.0.2.2";
};

export const ip = getHostIp();
const BASE_URL = `http://${ip}:5100/api/`;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

console.log(`IP detectado: ${ip}`);
console.log(`api: ${api.defaults.baseURL}`);

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
