import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { authService } from "@/src/service/authService";
import { AuthContextData, Usuario } from "@/src/@types/auth";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

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
      const tokenSalvo = await authService.getToken();
      if (tokenSalvo) {
        setToken(tokenSalvo);
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

      const payload = { email: emailFormatado, senha: senhaFormatada };
      const response = await authService.login(payload);

      setToken(response.token);
      setUsuario({ email: emailFormatado });

      setEmail("");
      setSenha("");

      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.log(">>> Erro completo:", error);
      console.log(">>> Status do Erro:", error.response?.status);
      console.log(">>> Dados da Resposta:", error.response?.data);

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
