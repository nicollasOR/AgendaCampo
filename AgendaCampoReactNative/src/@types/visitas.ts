
export interface usuarioGET_Visita {
    usuarioID: string,
    nome: string,
    email: string,
    imgURL: string
}

export interface visitaGetHome {
    visitaID: number,
    nomeEvento: string,
    statusVisita: string,
    logradouro: string, 
    numero: number,
    bairro: string, 
    dataInicio: Date,
    dataTermino: Date
}

export interface visitaGet {
    visitaID: number,
    nomeEvento: string,
    descricao: string,
    statusVisita: string,
    logradouro: string, 
    numero: number,
    bairro: string, 
    dataInicio: Date,
    dataTermino: Date,
    nomeCliente: string,
    cep: string,
    tecnicos: usuarioGET_Visita[]
}

export interface visitaPatch {
    
    dataInicio: Date    | string,
    dataTermino: Date   | string,
}

export interface visitaPost{
    visitaID: number,
    nomeSede: string,
    descricao: string,

    
    statusVisitaId: number,
    clienteId: string,
    logradouro: string, 
    numero: number,
    bairro: string, 
    dataInicio: Date,
    dataTermino: Date,
    usuariosIds: string[]
}