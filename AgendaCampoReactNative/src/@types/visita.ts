export interface Visita {
    nomeEvento: string,
    descricao: string,
    nomeSede: string,
    Logradouro: string,
    Bairro: string,
    Numero: number,
    Cep: string,
    clienteNome: string,
    dataInicio: Date,
    dataTermino: Date,
    usuariosIds: number | string,
    statusVisitaBit: boolean
}

export interface CriarVisita {
    nomeEvento: string,
    nomeSede: string,
    cliente: string,
    dataInicial: Date,
    dataFinal: Date,
    horario: Date,
    cep: string,
    logradouro: string,
    bairro: string,
    numero: number,
    descricao: string,
    tecnicos: string[]
}