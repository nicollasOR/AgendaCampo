import { formatarData } from "../utils/converterData";
import { api } from "./api";

export interface visitaPost {
  agendamentoID: number;
  enderecoID: number;
  titulo: string;
  descricao?: string;
  statusRealizado?: boolean;
  dataInicio?: Date;
  dataTermino?: Date;
  nomeSede?: string;
}

export interface visitaGet extends visitaPost {
  visitaID: number;
  logradouroEndereco?: string;
  nomeCliente?: string;
}

class visitaPostDTO {
  static toFormData(dados: visitaPost): FormData {
    const formData = new FormData();

    formData.append("agendamentoId", dados.agendamentoID.toString());
    formData.append("enderecoId", dados.enderecoID.toString());
    if (dados.descricao) formData.append("descricao", dados.descricao);
    if (dados.nomeSede) formData.append("nomeSede", dados.nomeSede);

    formData.append("nomeEvento", dados.titulo);

    const dataInicioDTO = formatarData(dados.dataInicio);
    const dataTerminoDTO = formatarData(dados.dataTermino);

    if (dataInicioDTO) formData.append("dataInicio", dataInicioDTO);
    if (dataTerminoDTO) formData.append("dataTermino", dataTerminoDTO);

    return formData;
    // formData.append("dataInicio", dados.dataInicio?.toISOString())
  }
}

export async function listarVisitas() {
  try {
    const response = api.get("Visita");
    return response;
  } catch (error: any) {
    throw new Error(error.response);
  }
}

export async function listarVisitasID(visitaID: number) {
  try {
    const response = await api.get("Visita" + visitaID);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function listarVisitas_usuarioID(usuarioId: string) {
  try {
    const response = await api.get(`Visitas/${usuarioId}`);
    return response;
  } catch (error: any) {
    throw new Error(error.response);
  }
}

export async function listarVisitasFuturas(dataAtual: Date) {
  try {
    const response = await api.get("Data" + dataAtual);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
}

export async function cadastrarVisita(dados: visitaPost) {
  try {
    const formData = visitaPostDTO.toFormData(dados);
    await api.post("Visita", dados);
  } catch (Error: any) {
    throw new Error(Error.response.data);
  }
}
