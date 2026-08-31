import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const plataforma = Platform.OS === `android` ? `10.0.0.2` : `localhost`
const porta = process.env.EXPO_PUBLIC_API
const apiLocal = "http://localhost:7193/api/";
const porta2 = "5100"
const enderecoAPI = process.env.EXPO_PUBLIC_API_URL || `http://${plataforma}:${porta2}`
export const api = axios.create({
  baseURL: enderecoAPI,
});




api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("Token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});