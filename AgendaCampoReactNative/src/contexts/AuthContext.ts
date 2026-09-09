import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Keyboard } from "react-native";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { authService } from "@/src/service/authService";
import { Usuario, UsuarioPayload, AuthContextData } from "@/src/@types/auth";

const USER_KEY = "@agenda_campo:usuario";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function decodificarToken(token: string): Usuario | null {
  try {
    const decoded: any = jwtDecode<UsuarioPayload>(token);
    // console.log(`\n JSON do Token: \n ${JSON.stringify(decoded, null, 2)}`);

    // Mapeia todas as variações conhecidas de ID em tokens JWT do ASP.NET Core
    const usuarioID =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ] ||
      decoded["nameidentifier"] ||
      decoded["sub"] ||
      decoded["id"] ||
      decoded["usuarioID"] ||
      decoded["usuarioId"] ||
      "";

    const nome =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
      "Usuário";

    const email =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ] ||
      decoded["email"] ||
      "";

    return {
      usuarioID,
      nome,
      email,
      imgURL: null,
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
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function carregarDadosArmazenados() {
      try {
        setLoading(true);
        const tokenSalvo = await authService.getToken();
        const usuarioSalvo = await authService.getUser();

        // retornando usuarioSalvo no celular
        if (usuarioSalvo) {
          setUsuario(usuarioSalvo);
        }

        if (tokenSalvo) {
          setToken(tokenSalvo);
          const usuarioDecodificado = decodificarToken(tokenSalvo);
          const emailBusca = usuarioDecodificado?.email;

          // A partir da busca do usuario pelo email, busca todos seus dados..
          if (emailBusca) {
            try {
              const dadosUsuarioApi: any =
                await authService.usuario(emailBusca);

              // Trata qualquer variação de nome de chave vindo do backend (C# PascalCase ou JSON camelCase)
              const idEncontrado =
                dadosUsuarioApi?.usuarioID ||
                dadosUsuarioApi?.usuarioId ||
                dadosUsuarioApi?.id ||
                usuarioDecodificado?.usuarioID ||
                "";

              const usuarioAtualizado: Usuario = {
                usuarioID: idEncontrado,
                nome:
                  dadosUsuarioApi.nome ||
                  usuarioDecodificado?.nome ||
                  "Usuário",
                email: dadosUsuarioApi.email || emailBusca,
                imgURL: dadosUsuarioApi.imgURL || null,
              };

              setUsuario(usuarioAtualizado);
              await authService.saveUser(usuarioAtualizado);
            } catch (apiError) {
              console.log(
                "Aviso: Falha ao buscar dados na API. Mantendo cache local.",
              );
              // Fallback se nao tiver cache nem API, usa o JWT decodificado
              if (!usuarioSalvo && usuarioDecodificado) {
                setUsuario(usuarioDecodificado);
              }
            }
          } else if (!usuarioSalvo && usuarioDecodificado) {
            setUsuario(usuarioDecodificado);
          }
        }
      } catch (error) {
        console.log("Erro ao carregar dados do AsyncStorage:", error);
      } finally {
        setLoading(false);
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

      const response = await authService.login({
        email: emailFormatado,
        senha: senhaFormatada,
      });

      setToken(response.token);

      // Decodifica o token como primeiro plano de contingência para obter o ID
      const usuarioDecodificado = decodificarToken(response.token);

      const dadosUsuarioApi: any = await authService.usuario(emailFormatado);

      // Busca o ID em de TODAS as formas possiveis (parte triste)
      const idDetectado =
        dadosUsuarioApi?.usuarioID ||
        dadosUsuarioApi?.usuarioId ||
        dadosUsuarioApi?.id ||
        usuarioDecodificado?.usuarioID ||
        "";

      const dadosUsuario: Usuario = {
        usuarioID: idDetectado, //ou pega do login, cache/ ou salvo mesmo
        nome: dadosUsuarioApi.nome || usuarioDecodificado?.nome || "Usuário",
        email: dadosUsuarioApi.email || emailFormatado,
        imgURL: dadosUsuarioApi.imgURL || null,
      };

      setUsuario(dadosUsuario);
      await authService.saveUser(dadosUsuario as any);

      setEmail("");
      setSenha("");

      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.log(">>> Erro no login:", error);
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

  async function handleMockLogin() {
    Keyboard.dismiss();
    setErro(null);
    setLoading(true);

    try {
      const usuarioMock: Usuario = {
        usuarioID: "75a1fb7f-8280-4ead-a74d-5fd5328bbd4f",
        nome: "Usuário de Teste",
        email: "teste@exemplo.com",
        imgURL: "",
      };

      const tokenMock = "mock-jwt-token-para-testes-locais";

      setToken(tokenMock);
      setUsuario(usuarioMock);

      await authService.saveUser(usuarioMock as any);
      router.replace("/(tabs)/home");
    } catch (err) {
      setErro("Erro ao efetuar login de teste.");
    } finally {
      setLoading(false);
    }
  }

  function atualizarEstadoUsuario(novosDados: Partial<Usuario>) {
    setUsuario((prev) => {
      if (!prev) return null;
      const usuarioAtualizado = { ...prev, ...novosDados };
      authService.saveUser(usuarioAtualizado);
      return usuarioAtualizado;
    });
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
        handleMockLogin,
        logout,
        atualizarEstadoUsuario,
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
