import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useImage } from "@/src/hooks/useImage";
import { useAuth } from "@/src/contexts/AuthContext";
import { useImagePicker } from "@/src/hooks/useImagePicker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Btn,
  Btn2,
  BtnText,
  CampoForm,
  CampoInput,
  CampoInputImg,
  Center,
  Colors,
  Column,
  Container,
  H1,
  H3,
  Input,
  InputIcon,
  InputImg,
  Label,
  P,
  Row,
  TextImg,
} from "@/src/constants/theme";
import Logo from "@/assets/svg/Logo.svg";
import CriarIcon from "@/assets/svg/CriarIcon.svg";
import EmailIcon from "@/assets/svg/EmailIcon.svg";
import PerfilIcon from "@/assets/svg/PerfilIcon.svg";
import UploadIcon from "@/assets/svg/UploadIcon.svg";
import CadeadoIcon from "@/assets/svg/CadeadoIcon.svg";
import ArrowBackIcon from "@/assets/svg/ArrowBackIcon.svg";
import EditarPerfilIcon from "@/assets/svg/EditarPerfilIcon.svg";
import { atualizarUsuarioHooks } from "@/src/hooks/useUsuario";
import { useAuthTESTE } from "@/src/contexts/AuthContextTESTE";
import { criarUsuario } from "@/src/service/usuarioService";

export default function Cadastro() {
  const router = useRouter();
  const { usuario } = useAuthTESTE();
  const {id: idParams} = useLocalSearchParams<{ id: string }>();

  const usuarioId = usuario?.usuarioID || idParams ;
  // const usuarioId = usuario?.usuarioID || id || (usuario as any)?.usuarioId ||
  //   (usuario as any)?.id || usuarioId2//|| (usuario as any)?.id
  

  const { imagem, selecionarOpcaoImagem } = useImagePicker();

  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  let telaEditar = false;
  if (usuarioId != null || usuarioId != undefined) telaEditar = true;
  // console.log(`${usuarioId} + ${id} + ${usuario?.usuarioID}`)
  
  
  // useEffect(() => {
  //   // usuario?.nome ?? setNome(usuario?.nome)
  //   if (usuario?.nome) setNome(usuario.nome);
  // }, [usuario]);
  useEffect(() => {
    if(usuario?.nome){
      setNome(usuario.nome)
    }
  })
  const criarUser =  async () => {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios!");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem!");
      return;
    }
    try
    {
      await criarUsuario({
        nome,
        email,
        senha
      })

      Alert.alert("Sucesso", "usuário cadastrado com sucesso")
      router.replace("/login")
    }

    catch(error: any)
    {
const resposta = error?.response?.data;
  const mensagem = typeof resposta === "string" 
    ? resposta 
    : resposta?.message || "Erro ao cadastrar";

  Alert.alert("Erro", mensagem);
    }
  }
  const atualizarUsuario = async () => {
if (usuarioId == null) {
      console.log(usuarioId)
      console.log(`teste ${usuario?.usuarioID}`)
      Alert.alert("Usuário não encontrado!");
      return;
    }
    
      try {
        const dados = {
          nome,
          senha,
          img: imagem as any,
        };
        console.log(dados);
        console.log("eita id", usuarioId);
        await atualizarUsuarioHooks(usuarioId, dados);
        Alert.alert(
          "Sucesso..",
          `Usuário ${dados.nome}, atualizado com sucesso!`,
        );
      } catch (error: any) {
        const mensagemErro =
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Erro ao atualizar!";

          console.log(mensagemErro)

        Alert.alert(mensagemErro);
        console.log(mensagemErro)
      }
  }

  async function salvarUsuario() {
 
    if (telaEditar) {
      await atualizarUsuario()
    }
    else {
      await criarUser()
    }
  }

  const { getImagemUrl } = useImage();
  const fotoPerfilUri = getImagemUrl(usuario?.imgURL);

  return (
    <SafeAreaView style={[Container, Column, Center]}>
      <StatusBar style="dark" />
      <View style={Center}>
        <View style={telaEditar ? Row : Center}>
          <Logo
            width={telaEditar ? 60 : 120}
            height={telaEditar ? 60 : 120}
            color={Colors.btn}
          />
          <Text style={[H1, { color: Colors.btn }]}>Agenda Campo</Text>
        </View>
        <Text style={[H3, { color: Colors.gray }]}>
          {telaEditar
            ? "Edite as informações do seu perfil"
            : "Crie uma conta para continuar"}
        </Text>
      </View>

      <View style={CampoForm}>
        {telaEditar && (
          <View style={Center}>
            <Text style={Label}>Foto de Perfil</Text>
            <TouchableOpacity
              style={[
                CampoInputImg,
                fotoPerfilUri ? "" : { borderStyle: "dashed" },
              ]}
              onPress={selecionarOpcaoImagem}
              activeOpacity={0.7}
            >
              {fotoPerfilUri ? (
                <>
                  <Image
                    source={{ uri: fotoPerfilUri }}
                    style={InputImg}
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
                  <Text style={[TextImg, { color: Colors.btn }]}>
                    Subir Imagem
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

        <View>
          <Text style={Label}>Nome</Text>
          <View style={CampoInput}>
            <PerfilIcon color={Colors.blue} style={InputIcon} />
            <TextInput
              style={Input}
              placeholder="Nome"
              placeholderTextColor={Colors.inactive}
              // value={usuario?.nome ? usuario.nome : nome}
              value={nome}
              onChangeText={setNome}
            />
          </View>
        </View>

        {!telaEditar && (
          <View>
            <Text style={Label}>E-mail</Text>
            <View style={CampoInput}>
              <EmailIcon color={Colors.blue} style={InputIcon} />
              <TextInput
                style={Input}
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

        <View>
          <Text style={Label}>Senha</Text>
          <View style={CampoInput}>
            <CadeadoIcon color={Colors.blue} style={InputIcon} />
            <TextInput
              style={Input}
              placeholder="*******"
              placeholderTextColor={Colors.inactive}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>
        </View>

        {!telaEditar && (
          <View>
            <Text style={Label}>Confirmar Senha</Text>
            <View style={CampoInput}>
              <CadeadoIcon color={Colors.blue} style={InputIcon} />
              <TextInput
                style={Input}
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

      <TouchableOpacity style={Btn} onPress={salvarUsuario}>
        <CriarIcon color={Colors.white} />
        <Text style={BtnText}>
          {telaEditar ? "Salvar Alterações" : "Criar Conta"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          Btn2,
          {
            borderWidth: 2,
            borderColor: Colors.blue,
          },
        ]}
        onPress={
          telaEditar
            ? () => router.replace("/(tabs)/perfil")
            : () => router.replace("/login")
        }
      >
        <ArrowBackIcon color={Colors.blue} />
        <Text style={[BtnText, { color: Colors.blue }]}>Voltar</Text>
      </TouchableOpacity>

      <Text style={[P, { position: "absolute", bottom: 40 }]}>
        Uso exclusivo para técnicos e operacionais
      </Text>
    </SafeAreaView>
  );
}
