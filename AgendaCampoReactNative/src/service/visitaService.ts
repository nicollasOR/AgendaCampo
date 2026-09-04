import { CriarVisita, Visita, VisitaGet, visitaPatch } from "../@types/visita";
import { api } from "./api";

function juntarDataHora(data: Date, horario: Date): Date {
  const dataHora = new Date(data);
  dataHora.setHours(
    horario.getHours(),
    horario.getMinutes(),
    horario.getSeconds(),
  );
  return dataHora;
}

// Formata o CEP para garantir o padrão "00000-000"
function formatarCep(cep: string): string {
  const apenasNumeros = cep.replace(/\D/g, "");
  return apenasNumeros.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

export const visitaService = {
  async agendar(dados: CriarVisita): Promise<Visita> {
    const dataInicio = juntarDataHora(dados.dataInicial, dados.horario);

    const payload = {
      nomeEvento: dados.nomeEvento,
      descricao: dados.descricao,
      nomeSede: dados.nomeSede,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      numero: Number(dados.numero) || 0,
      cep: formatarCep(dados.cep),
      clienteNome: dados.cliente,
      dataInicio: dataInicio.toISOString(),
      dataTermino: dados.dataFinal.toISOString(),
      tecnicos: dados.tecnicos,
    };

    const resposta = await api.post<Visita>("Visita", payload);
    return resposta.data;
  },

  async listar(): Promise<VisitaGet[]> {
    const response = await api.get<VisitaGet[]>("Visita");
    return response.data;
  },

  async buscarPorId(id: number): Promise<VisitaGet> {
    const response = await api.get<VisitaGet>(`Visita/${id}`);
    return response.data;
  },

  async listarFuturasVisitas(): Promise<VisitaGet[]> {
    const response = await api.get<VisitaGet[]>("Visita/futurasVisitas");
    console.log(response);
    return response.data;
  },

  async remover(id: number): Promise<VisitaGet> {
    const response = await api.delete<VisitaGet>("Visita/" + id);
    return response.data;
  },

  // async reagendar(id: number, dados: visitaPatch) : Promise<visitaPatch>{
  //     const response = await api.patch<visitaPatch>("Visita/reagendar" + id, dados)
  //     return response.data
  // }

  async reagendar(id: number, dados: visitaPatch) {
    const response = await api.patch(`Visita/reagendar${id}`, dados);
  },
};
