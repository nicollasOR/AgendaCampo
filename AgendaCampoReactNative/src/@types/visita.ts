export interface Visita {
    nomeEvento: string,
    descricao: string,
    statusVisitaId: number,
    nomeSede: string,
    dataInicio: Date,
    dataTermino: Date,
    // enderecoId: number,
    // clienteId: number | string,
    usuariosIds: number | string,
}

export interface CriarVisita {
    nomeEvento: string,
    descricao: string,
    nomeSede: string,
    dataInicio: Date,
    dataTermino: Date,
    // enderecoId: number,
    // clienteId: number | string,
    usuariosIds: number | string,
}

export interface CriarVisita2 {
    cliente: string
    nomeEvento: string,
    data: Date,
    horario: Date,
    cep: string,
    logradouro: string,
    bairro: string,
    numero: number,
    descricao: string
}