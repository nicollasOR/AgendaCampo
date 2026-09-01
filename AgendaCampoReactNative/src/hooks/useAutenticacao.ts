import { useState } from 'react';
import { useRouter } from 'expo-router';
import { autenticacaoService } from '../services/autenticacaoService';
import { Keyboard } from 'react-native';

export function useAutenticacao() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const router = useRouter();

  async function handleLogin() {
    Keyboard.dismiss();
    setErro(null);

    const emailFormatado = email.trim().toLowerCase();
    const senhaFormatada = senha.trim();

    if (!emailFormatado || !senhaFormatada) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);

      const payload = { email: emailFormatado, senha: senhaFormatada };
      await autenticacaoService.Login(payload);

      router.replace('/(tabs)/home');

    } catch (error: any) {
      console.log(">>> Status do Erro:", error.response?.status);
      console.log(">>> Dados da Resposta:", error.response?.data);

      const status = error.response?.status;

      if (status === 400 || status === 401) {
        const mensagemCustomizada = typeof error.response?.data === 'string' 
          ? error.response.data 
          : error.response?.data?.message;

        setErro(mensagemCustomizada || 'E-mail ou senha inválidos.');
      } else if (!error.response) {
        setErro('Não foi possível conectar ao servidor. Verifique sua conexão.');
      } else {
        setErro('Ocorreu um erro no servidor. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    email,
    setEmail,
    senha,
    setSenha,
    loading,
    erro,
    handleLogin,
  };
}