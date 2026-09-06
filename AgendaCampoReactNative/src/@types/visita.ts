export interface Visita {
  nomeEvento: string;
  descricao: string;
  nomeSede: string;
  Logradouro: string;
  Bairro: string;
  Numero: number;
  Cep: string;
  clienteNome: string;
  dataInicio: Date;
  dataTermino: Date;
  usuariosIds: number | string;
  // statusVisitaBit: boolean
}

export interface VisitaGet {
  visitaID: number;
  nomeEvento: string;
  descricao: string;
  statusVisita: string;
  logradouro: string;
  numero: number;
  bairro: string;
  dataInicio: Date;
  dataTermino: Date;
  nomeCliente: string;
  cep: string;
  tecnicos: usuarioGET_Visita[];
}

export interface CriarVisita {
  nomeEvento: string;
  nomeSede: string;
  cliente: string;
  dataInicial: Date;
  dataFinal: Date;
  horario: Date;
  cep: string;
  logradouro: string;
  bairro: string;
  numero: string;
  descricao: string;
  tecnicos: string[];
}

export interface usuarioGET_Visita {
  usuarioID: string;
  nome: string;
  email: string;
  imgURL: string;
}

export interface visitaPatch {
  dataInicio: Date | string;
  dataTermino: Date | string;
}

export interface visitaPost {
  visitaID: number;
  nomeSede: string;
  descricao: string;

  statusVisitaId: number;
  clienteId: string;
  logradouro: string;
  numero: number;
  bairro: string;
  dataInicio: Date;
  dataTermino: Date;
  usuariosIds: string[];
}
