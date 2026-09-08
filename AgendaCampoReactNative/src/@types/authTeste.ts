export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}


export interface Usuario2 {
  usuarioID: string; // 👈 Adicione o ID aqui
  nome: string;
  email: string;
  imgURL: string | null;
}

export interface UsuarioPayload2 {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  sub?: string; // Algumas APIs .NET mandam 'sub' em vez de nameidentifier
  id?: string;
  exp: number;
  iss: string;
  aud: string;
}

export interface AuthContextDataTESTE {
  usuario: Usuario2 | null;
  token: string | null;
  email: string;
  setEmail: (email: string) => void;
  senha: string;
  setSenha: (senha: string) => void;
  loading: boolean;
  erro: string | null;
  handleLogin: () => Promise<void>;
  handleMockLogin: () => Promise<void>;
  logout: () => Promise<void>;
}
