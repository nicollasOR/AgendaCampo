export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}

export interface Usuario {
  nome: string;
  email: string;
  imgURL: string | null;
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

export interface ImgUpload {
  uri: string;
  name: string;
  mimeType: string;
}
