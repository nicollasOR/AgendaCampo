export interface LoginRequest {
 email: string,
 senha: string
}

export interface LoginResponse {
    token: string
}

export interface Usuario {
id: string,
nome: string,
email: string
}

