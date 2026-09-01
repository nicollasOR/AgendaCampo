import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiLocal = "http://localhost:5100/api/";

export const api = axios.create({
  baseURL: apiLocal,
});

api.interceptors.request.use(async (config) => {

  const tokenKey = process.env.EXPO_PUBLIC_TOKEN_KEY ?? "@AgendaCampo:token";
  const token = await AsyncStorage.getItem(tokenKey);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});