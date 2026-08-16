import * as SecureStore from "expo-secure-store";
import { api } from "./api";

let autenticao: string = "Autenticacao"

export async function login(email: string, senha: string) {
  try {
    const response = await api.post(`${autenticao}/login`, {email, senha});

    const token = response.data.token;

    await SecureStore.setItemAsync("Token", token);
  } catch (error: any) {
    throw new Error("Email ou senha inválidos");
  }
}

export async function logout() {
  await SecureStore.deleteItemAsync("Token"); // deletando o token btw
}