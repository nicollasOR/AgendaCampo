import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY ?? "chaveToken";

const host = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const apiLocal = `http://${host}:7082/api/`;

export const api = axios.create({
  baseURL: apiLocal,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
