import axios from "axios";
import * as SecureStore from "expo-secure-store";

const apiLocal = "http://localhost:7193/api/";

export const api = axios.create({
  baseURL: apiLocal,
});




api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("Token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});