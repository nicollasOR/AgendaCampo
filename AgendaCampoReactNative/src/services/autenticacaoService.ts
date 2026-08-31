import { LoginRequest, LoginResponse } from "../@types/autenticacao";
import { api } from "../app/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export const autenticacaoService = {
  async Login(dados: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("Autenticacao/login", dados);

    if (data.token) {
      const tokenKey = process.env.EXPO_PUBLIC_TOKEN_KEY ?? "@AgendaCampo:token";
      await AsyncStorage.setItem(tokenKey, data.token);
    }

    return data;
  }
};