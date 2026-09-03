import { api, TOKEN_KEY } from "./api";
import { LoginRequest, LoginResponse, Usuario } from "@/src/@types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const USER_KEY = "@agenda_campo:usuario";

export const authService = {
  async login(dados: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("Autenticacao/login", dados);

    if (data.token) {
      await AsyncStorage.setItem(TOKEN_KEY, data.token);
    }

    return data;
  },

  async usuario(email: string): Promise<Usuario> {
    const { data } = await api.get<Usuario>(`Usuario/email/${email}`);
    return data;
  },

  async logout(): Promise<void> {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  async saveUser(usuario: Usuario): Promise<void> {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(usuario));
  },

  async getUser(): Promise<Usuario | null> {
    const usuarioJson = await AsyncStorage.getItem(USER_KEY);
    return usuarioJson ? JSON.parse(usuarioJson) : null;
  },
};
