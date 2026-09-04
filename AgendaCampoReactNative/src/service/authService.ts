import { api, TOKEN_KEY } from "./api";
import { LoginRequest, LoginResponse } from "@/src/@types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authService = {
  async login(dados: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("Autenticacao/login", dados);

    if (data.token) {
      await AsyncStorage.setItem(TOKEN_KEY, data.token);
    }

    return data;
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },
};
