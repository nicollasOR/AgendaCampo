// import { enderecoGET_Visita } from "./Endereco"
// import { usuarioGET_Visita } from "./Usuario"


export interface usuarioGET_Visita {
    usuarioID: string,
    nome: string,
    email: string,
    imgURL: string,
    telefone: string

}

export interface visitaGet {
    visitaID: number,
    nomeEvento: string,
    descricao: string,
    statusVisita: string,
    dataInicio: Date,
    dataTermino: Date,
    nomeCliente: string,
    logradouro: string,
    bairro: string,
    numero: number,
    cep: string
    tecnicos: usuarioGET_Visita[]
}

export interface visitaPost {
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
