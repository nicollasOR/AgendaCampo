export interface Login {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}

export interface Usuario {
  nome: string;
  email: string;
  img: string;
}

export interface UsuarioPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  exp: number;
  iss: string;
  aud: string;
}

export interface AuthContextData {
  usuario: Usuario | null;
  token: string | null;
  loading: boolean;
  login: (dados: Login) => Promise<void>;
  logout: () => Promise<void>;
}

export interface ImgUpload {
  uri: string;
  name?: string;
  mimeType?: string;
}
