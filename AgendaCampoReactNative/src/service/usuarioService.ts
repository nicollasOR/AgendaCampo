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
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao listar usuários");
  }
}

export async function listarUsuarioImg(id: string) {
  try {
    const response = await api.get(`Usuario/img/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao carregar imagem");
  }
}

export async function criarUsuario(dados: usuarioPOST) {
  try {
    await api.post("Usuario", dados);
    console.log(`Bem-vindo, ${dados.nome}!`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao criar usuário");
  }
}

export async function buscarUsuarioID(usuarioID: string) {
  try {
    const response = await api.get(`Usuario/${usuarioID}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar usuário");
  }
}
