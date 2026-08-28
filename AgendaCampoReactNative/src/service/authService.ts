import { api } from "./api";
import { Login, LoginResponse } from "@/src/@types/auth";

export const authService = {
  async login(
    dados: Login = { email: "a@a", senha: "a" },
  ): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("Autenticacao/login", dados);
    return data;
  },
};
