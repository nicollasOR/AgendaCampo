import { CriarVisita, Visita } from "../@types/visita";
import { api } from "./api";

function juntarDataHora(data: Date, horario: Date) {
  const dataHora = new Date(data);

  dataHora.setHours(
    horario.getHours(),
    horario.getMinutes(),
    horario.getSeconds()
  );

  return dataHora;
}


export const visitaService = {
  async agendar(dados: CriarVisita): Promise<Visita> {
    const formData = new FormData();

    const dataInicio = juntarDataHora(
      dados.dataInicial,
      dados.horario
    );

    formData.append('nomeEvento', dados.nomeEvento);
    formData.append('descricao', dados.descricao);
    formData.append('nomeSede', dados.nomeSede);
    formData.append('logradouro', dados.logradouro);
    formData.append('bairro', dados.bairro);
    formData.append('numero', String(dados.numero));
    formData.append('cep', dados.cep);
    formData.append('clienteNome', dados.cliente);
    formData.append('dataInicio', dataInicio.toISOString());
    formData.append('dataTermino', dados.dataFinal.toISOString());

    const resposta = await api.post<Visita>("Visita", formData);

    console.log(resposta.data)

    return resposta.data;
  }

}

// class visitaPostDTO {
//   static toFormData(dados: CriarVisita): FormData {
//     const formData = new FormData();

//     formData.append("agendamentoId", dados.agendamentoID.toString());
//     formData.append("enderecoId", dados.enderecoID.toString());
//     if (dados.descricao) formData.append("descricao", dados.descricao);
//     if (dados.nomeSede) formData.append("nomeSede", dados.nomeSede);

//     formData.append("nomeEvento", dados.titulo);

//     const dataInicioDTO = formatarData(dados.dataInicio);
//     const dataTerminoDTO = formatarData(dados.dataTermino);

//     if (dataInicioDTO) formData.append("dataInicio", dataInicioDTO);
//     if (dataTerminoDTO) formData.append("dataTermino", dataTerminoDTO);

//     return formData;
//     // formData.append("dataInicio", dados.dataInicio?.toISOString())
//   }
// }

// export async function listarVisitas() {
//   try {
//     const response = api.get("Visita");
//     return response;
//   } catch (error: any) {
//     throw new Error(error.response);
//   }
// }

// export async function listarVisitasID(visitaID: number) {
//   try {
//     const response = await api.get("Visita" + visitaID);
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response.data);
//   }
// }

// export async function listarVisitas_usuarioID(usuarioId: string) {
//   try {
//     const response = await api.get(`Visitas/${usuarioId}`);
//     return response;
//   } catch (error: any) {
//     throw new Error(error.response);
//   }
// }

// export async function listarVisitasFuturas(dataAtual: Date) {
//   try {
//     const response = await api.get("Data" + dataAtual);
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response);
//   }
// }

// export async function cadastrarVisita(dados: CriarVisita) {



//   try {
//     const formData = visitaPostDTO.toFormData(dados);
//     await api.post("Visita", dados);

//     static toFormData(dados: CriarVisita): FormData {
//     const formData = new FormData();

//     formData.append("agendamentoId", dados.agendamentoID.toString());
//     formData.append("enderecoId", dados.enderecoID.toString());
//     if (dados.descricao) formData.append("descricao", dados.descricao);
//     if (dados.nomeSede) formData.append("nomeSede", dados.nomeSede);

//     formData.append("nomeEvento", dados.titulo);

//     const dataInicioDTO = formatarData(dados.dataInicio);
//     const dataTerminoDTO = formatarData(dados.dataTermino);

//     if (dataInicioDTO) formData.append("dataInicio", dataInicioDTO);
//     if (dataTerminoDTO) formData.append("dataTermino", dataTerminoDTO);

//     return formData;
//     // formData.append("dataInicio", dados.dataInicio?.toISOString())
//   }
//   } catch (Error: any) {
//     throw new Error(Error.response.data);
//   }
// }
