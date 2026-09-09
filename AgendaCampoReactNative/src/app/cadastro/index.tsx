import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useImage } from "@/src/hooks/useImage";
import { useAuth } from "@/src/contexts/AuthContext";
import { criarUsuario } from "@/src/service/usuarioService";
import { useImagePicker } from "@/src/hooks/useImagePicker";
import { atualizarUsuarioHooks } from "@/src/hooks/useUsuario";

import { Colors, theme } from "@/src/constants/theme";

import Logo from "@/assets/svg/Logo.svg";
import CriarIcon from "@/assets/svg/CriarIcon.svg";
import EmailIcon from "@/assets/svg/EmailIcon.svg";
import PerfilIcon from "@/assets/svg/PerfilIcon.svg";
import UploadIcon from "@/assets/svg/UploadIcon.svg";
import CadeadoIcon from "@/assets/svg/CadeadoIcon.svg";
import ArrowBackIcon from "@/assets/svg/ArrowBackIcon.svg";
import EditarPerfilIcon from "@/assets/svg/EditarPerfilIcon.svg";

export default function Cadastro() {
  const router = useRouter();
  const { usuario } = useAuth();

  // Recebe modo ('criar' | 'editar') e id via URL/parâmetros
  const params = useLocalSearchParams<{
    id?: string;
    mode?: "criar" | "editar";
  }>();

  // Definição do estado de modo (Cadastrar x Editar)
  const [modo, setModo] = useState<"criar" | "editar">("criar");

  const usuarioId = usuario?.usuarioID || params.id;

  // Define modo inicial com base nos parâmetros da rota ou usuário logado
  useEffect(() => {
    if (params.mode) {
      setModo(params.mode);
    } else if (usuarioId) {
      setModo("editar");
    } else {
      setModo("criar");
    }
  }, [params.mode, usuarioId]);

  const telaEditar = modo === "editar";

  const { imagem, selecionarOpcaoImagem } = useImagePicker();

  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  useEffect(() => {
    if (telaEditar && usuario?.nome) {
      setNome(usuario.nome);
    }
  }, [telaEditar, usuario]);

  const criarUser = async () => {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios!");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem!");
      return;
    }

    try {
      await criarUsuario({ nome, email, senha });
      Alert.alert("Sucesso", `Usuário ${nome}, cadastrado com sucesso!`);
      router.replace("/login");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  const atualizarUsuario = async () => {
    if (!usuarioId) {
      Alert.alert("Erro", `Usuário ${nome} não encontrado para edição!`);
      return;
    }

    try {
      const dados = {
        nome,
        senha,
        img: imagem as any,
      };

      await atualizarUsuarioHooks(usuarioId, dados);
      Alert.alert("Sucesso", `Usuário ${dados.nome}, atualizado com sucesso!`);
    } catch (error: any) {
      const mensagemErro =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Erro ao atualizar!";

      Alert.alert("Erro", mensagemErro);
    }
  };

  async function salvarUsuario() {
    if (telaEditar) {
      await atualizarUsuario();
      router.replace("/(tabs)/perfil");
    } else {
      await criarUser();
    }
  }

  const { getImagemUrl } = useImage();
  const fotoPerfilUri = getImagemUrl(usuario?.imgURL);

  return (
    <SafeAreaView style={[theme.container, theme.column, theme.center]}>
      <StatusBar style="dark" />

      {usuario && (
        <View style={theme.row}>
          <TouchableOpacity
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              backgroundColor: !telaEditar ? Colors.btn : Colors.inactive,
            }}
            onPress={() => setModo("criar")}
          >
            <Text style={{ color: Colors.white, fontWeight: "bold" }}>
              Criar Conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              backgroundColor: telaEditar ? Colors.btn : Colors.inactive,
            }}
            onPress={() => setModo("editar")}
          >
            <Text style={{ color: Colors.white, fontWeight: "bold" }}>
              Editar Perfil
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={theme.center}>
        <View style={telaEditar ? theme.row : theme.center}>
          <Logo
            width={telaEditar ? 60 : 120}
            height={telaEditar ? 60 : 120}
            color={Colors.btn}
          />
          <Text style={[theme.h1, { color: Colors.btn }]}>Agenda Campo</Text>
        </View>
        <Text style={[theme.h3, { color: Colors.gray }]}>
          {telaEditar
            ? "Edite as informações do seu perfil"
            : "Crie uma conta para continuar"}
        </Text>
      </View>

      <View style={theme.column}>
        {telaEditar && (
          <View style={theme.center}>
            <Text style={theme.label}>Foto de Perfil</Text>
            <TouchableOpacity
              style={[
                theme.campoInputImg,
                fotoPerfilUri ? undefined : { borderStyle: "dashed" },
              ]}
              onPress={selecionarOpcaoImagem}
              activeOpacity={0.7}
            >
              {fotoPerfilUri ? (
                <>
                  <Image
                    source={{ uri: fotoPerfilUri }}
                    style={theme.inputImg}
                    resizeMode="cover"
                  />
                  <EditarPerfilIcon
                    color={Colors.white}
                    width={32}
                    height={32}
                    style={{ position: "absolute" }}
                  />
                </>
              ) : (
                <>
                  <UploadIcon color={Colors.blue} />
                  <Text style={[theme.textImg, { color: Colors.btn }]}>
                    Subir Imagem
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

        <View style={theme.campoForm}>
          <Text style={theme.label}>Nome</Text>
          <View style={theme.campoInput}>
            <PerfilIcon color={Colors.blue} style={theme.inputIcon} />
            <TextInput
              style={theme.input}
              placeholder="Nome"
              placeholderTextColor={Colors.inactive}
              value={nome}
              onChangeText={setNome}
            />
          </View>
        </View>

        {!telaEditar && (
          <View style={theme.campoForm}>
            <Text style={theme.label}>E-mail</Text>
            <View style={theme.campoInput}>
              <EmailIcon color={Colors.blue} style={theme.inputIcon} />
              <TextInput
                style={theme.input}
                placeholder="Nome@email.com"
                placeholderTextColor={Colors.inactive}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        )}

        <View style={theme.campoForm}>
          <Text style={theme.label}>Senha</Text>
          <View style={theme.campoInput}>
            <CadeadoIcon color={Colors.blue} style={theme.inputIcon} />
            <TextInput
              style={theme.input}
              placeholder="*******"
              placeholderTextColor={Colors.inactive}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>
        </View>

        {!telaEditar && (
          <View style={theme.campoForm}>
            <Text style={theme.label}>Confirmar Senha</Text>
            <View style={theme.campoInput}>
              <CadeadoIcon color={Colors.blue} style={theme.inputIcon} />
              <TextInput
                style={theme.input}
                placeholder="*******"
                placeholderTextColor={Colors.inactive}
                secureTextEntry
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity style={theme.btn} onPress={salvarUsuario}>
        <CriarIcon color={Colors.white} />
        <Text style={theme.btnText}>
          {telaEditar ? "Salvar Alterações" : "Criar Conta"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          theme.btn2,
          {
            borderWidth: 2,
            borderColor: Colors.blue,
          },
        ]}
        onPress={
          telaEditar
            ? () => router.replace("/(tabs)/perfil")
            : () => router.replace(usuario ? "/(tabs)/perfil" : "/login")
        }
      >
        <ArrowBackIcon color={Colors.blue} />
        <Text style={[theme.btnText, { color: Colors.blue }]}>Voltar</Text>
      </TouchableOpacity>

      <Text style={[theme.p, { position: "absolute", bottom: 20 }]}>
        Uso exclusivo para técnicos e operacionais
      </Text>
    </SafeAreaView>
  );
}
