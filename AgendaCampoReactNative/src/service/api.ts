import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TOKEN_KEY = "@agenda_campo:token";

const BASE_URL = "http://10.0.2.2:5100/api/";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
