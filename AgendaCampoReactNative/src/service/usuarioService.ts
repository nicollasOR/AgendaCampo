import { api } from "./api";

import { Image } from "react-native";

import { Usuario } from "@/src/@types/auth";

export interface usuarioPOST {
  nome: string;
  email: string;
  senha: string;
  imageUri?: Image | string | null;
  telefone?: string;
}

export interface usuarioPUT {
  nome: string;
  senha: string;
  Img?: Image;
}

export const UsuarioService = {
  async listarUsuario(): Promise<Usuario[]> {
    const resposta = await api.get<Usuario[]>("Usuario");
    return resposta.data;
  },
};

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
    const formData = new FormData();

    formData.append("nome", dados.nome);
    formData.append("email", dados.email);
    formData.append("senha", dados.senha);

    const response = await api.post("Usuario", formData);
    // nao precisa passar o header ("Descobrindo da pior forma como sempre")
    console.log("testando retorno..", response.data);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.mensagem ||
      error.response?.data?.message ||
      "Não foi possível cadastrar o usuário " + dados.nome;

    throw new Error(message);
  }
}

export async function atualizarUsuario(
  id: string,
  dados: usuarioPUT | FormData,
) {
  try {
    let payload: FormData;

    if (dados instanceof FormData) {
      payload = dados;
    } else {
      payload = new FormData();
      payload.append("nome", dados.nome);
      payload.append("senha", dados.senha);

      // Pega o objeto da imagem enviado
      const foto: any = (dados as any).img || (dados as any).Img;
      if (foto && typeof foto === "object" && foto.uri) {
        payload.append("img", {
          uri: foto.uri,
          name: foto.name || `foto_${Date.now()}.jpg`,
          type: foto.mimeType || foto.type || "image/jpeg",
        } as any);
      }
    }

    const response = await api.put(`Usuario/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    const mensagemErro =
      error.response?.data?.message ||
      error.message ||
      "Erro ao atualizar usuário!";
    throw new Error(mensagemErro);
  }
}

export async function atualizarSenha(usuarioID: string, senha: string) {
  try {
    const response = await api.patch(`Usuario/${usuarioID}`, { senha });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
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
