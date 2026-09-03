import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Keyboard } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { authService } from "@/src/service/authService";
import { AuthContextData, Usuario, UsuarioPayload } from "@/src/@types/auth";

const USER_KEY = "@agenda_campo:usuario";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function decodificarToken(token: string): Usuario | null {
  try {
    const decoded = jwtDecode<UsuarioPayload>(token);
    const nome =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
      "Usuário";
    const email =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ] || "";

    return {
      nome,
      email,
      img: "",
    };
  } catch (err) {
    console.log("Erro ao decodificar token JWT:", err);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function carregarDadosArmazenados() {
      try {
        const tokenSalvo = await authService.getToken();
        const usuarioSalvo = await AsyncStorage.getItem(USER_KEY);

        if (tokenSalvo) {
          setToken(tokenSalvo);

          if (usuarioSalvo) {
            setUsuario(JSON.parse(usuarioSalvo));
          } else {
            const usuarioDecodificado = decodificarToken(tokenSalvo);
            if (usuarioDecodificado) {
              setUsuario(usuarioDecodificado);
            }
          }
        }
      } catch (error) {
        console.log("Erro ao carregar dados do AsyncStorage", error);
      }
    }
    carregarDadosArmazenados();
  }, []);

  async function handleLogin() {
    Keyboard.dismiss();
    setErro(null);

    const emailFormatado = email.trim().toLowerCase();
    const senhaFormatada = senha.trim();

    if (!emailFormatado || !senhaFormatada) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      // 1. Chamada HTTP para autenticação
      const response = await authService.login({
        email: emailFormatado,
        senha: senhaFormatada,
      });

      // 2. Extração do nome vindo das Claims do JWT
      const usuarioDecodificado = decodificarToken(response.token);

      const dadosUsuario: Usuario = {
        email: emailFormatado,
        nome: usuarioDecodificado?.nome || "Usuário",
        img: "",
      };

      setToken(response.token);
      setUsuario(dadosUsuario);

      // 3. Gravação local no AsyncStorage
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(dadosUsuario));

      setEmail("");
      setSenha("");

      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.log(">>> Erro completo:", error);
      const status = error.response?.status;

      if (status === 400 || status === 401) {
        const mensagemCustomizada =
          typeof error.response?.data === "string"
            ? error.response.data
            : error.response?.data?.message;

        setErro(mensagemCustomizada || "E-mail ou senha inválidos.");
      } else if (!error.response) {
        setErro(
          "Não foi possível conectar ao servidor.\nVerifique sua conexão.",
        );
      } else {
        setErro("Ocorreu um erro no servidor. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await authService.logout();
    await AsyncStorage.removeItem(USER_KEY);
    setToken(null);
    setUsuario(null);
    setEmail("");
    setSenha("");
    setErro(null);
    router.replace("/login");
  }

  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        usuario,
        token,
        email,
        setEmail,
        senha,
        setSenha,
        loading,
        erro,
        handleLogin,
        logout,
      },
    },
    children,
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
