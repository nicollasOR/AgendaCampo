
export interface usuarioGET_Visita {
    usuarioID: string,
    nome: string,
    email: string,
    imgURL: string
}

export interface enderecoGET_Visita{
    enderecoId: number,
    logradouro: string,
    bairro: string,
    numero: number,
    cep: string
}

export interface visitaGetHome {
    visitaID: number,
    nomeEvento: string,
    statusVisita: string,
    logradouroEndereco: string,
    dataInicio: Date,
    dataTermino: Date
}

export interface visitaGet {
    visitaID: number,
    nomeEvento: string,
    descricao: string,
    statusVisita: string,
    endereco: enderecoGET_Visita[],
    dataInicio: Date,
    dataTermino: Date,
    logradouroEndereco: string,
    nomeCliente: string,
    tecnicos: usuarioGET_Visita[]
}

export interface visitaPost{
    visitaID: number,
    nomeSede: string,
    descricao: string,

    
    statusVisitaId: number,
    clienteId: string,
    enderecoId: number,
    dataInicio: Date,
    dataTermino: Date,
    usuariosIds: string[]
      
}