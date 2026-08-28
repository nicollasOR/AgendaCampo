import {
  createContext,
  createElement,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { authService } from "@/src/service/authService";
import {
  AuthContextData,
  Login,
  Usuario,
  UsuarioPayload,
} from "@/src/@types/auth";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY ?? "chaveToken";

export function decodificarToken(token: string): Usuario | null {
  try {
    const decoded = jwtDecode<UsuarioPayload>(token);

    return {
      nome: decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ],
      email:
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ],
    };
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(TOKEN_KEY)
      .then((tokenSalvo) => {
        if (tokenSalvo) {
          const usuarioDecodificado = decodificarToken(tokenSalvo);
          if (usuarioDecodificado) {
            setToken(tokenSalvo);
            setUsuario(usuarioDecodificado);
          } else {
            AsyncStorage.removeItem(TOKEN_KEY);
          }
        }
      })
      .catch((error) => console.error("Erro ao carregar token:", error))
      .finally(() => setLoading(false));
  }, []);

  async function login(dados: Login) {
    const resposta = await authService.login(dados);

    if (resposta.token) {
      await AsyncStorage.setItem(TOKEN_KEY, resposta.token);
      setToken(resposta.token);
      setUsuario(decodificarToken(resposta.token));
    }
  }

  async function logout() {
    await AsyncStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUsuario(null);
    router.replace("/login");
  }

  return createElement(
    AuthContext.Provider,
    { value: { usuario, token, loading, login, logout } },
    children,
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
