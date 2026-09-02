import { toFormData } from "axios";
import { api } from "./api";

export interface usuarioPOST {
  nome?: string;
  email?: string;
  senha?: string;
}

export async function listarUsuario() {
  try {
    const response = await api.get("Usuario");
    return response.data;
  } catch (Error: any) {
    throw new Error(Error.response.data);
  }
}

class usuarioPostMethod {
  static toFormData(dados: usuarioPOST): FormData {
    const formData = new FormData();

    if (dados.nome && dados.email && dados.senha) {
      formData.append("nome", dados.nome);
      formData.append("email", dados.email);
      formData.append("senha", dados.senha);
    }

    return formData;
  }
}

export async function criarUsuario(dados: usuarioPOST) {
  try {
    const response = toFormData(dados);
    await api.post("Usuario", dados);
    console.log(`Bem vindo, ${dados.nome}!`);
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function buscarUsuarioID(usuarioID: string) {
  try {
    const response = await api.get(`Usuario${usuarioID}`);
    return response.data;
  } catch (error: any) {}
}
