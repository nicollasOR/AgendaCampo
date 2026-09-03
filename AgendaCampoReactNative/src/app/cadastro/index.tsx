import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";
import { useImagePicker } from "@/src/hooks/useImagePicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
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

export default function Cadastro() {
  const router = useRouter();
  const { imagem, selecionarOpcaoImagem } = useImagePicker();

  const [nome, setNome] = useState<string | undefined>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const telaEditar = true;

  // if (telaEditar) {
  //   const { usuario } = useAuth();
  //   setNome(usuario?.nome);
  // }

  return (
    <SafeAreaView style={[Container, Column, Center]}>
      <View style={Center}>
        {telaEditar ? (
          <View style={Row}>
            <Logo width={60} height={60} color={Colors.btn} />
            <Text style={[H1, { color: Colors.btn }]}>AgendaCampo</Text>
          </View>
        ) : (
          <>
            <Logo color={Colors.btn} />
            <Text style={[H1, { color: Colors.btn }]}>AgendaCampo</Text>
          </>
        )}
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
              style={CampoInputImg}
              onPress={selecionarOpcaoImagem}
              activeOpacity={0.7}
            >
              {imagem ? (
                <Image
                  source={{ uri: imagem.uri }}
                  style={InputImg}
                  resizeMode="cover"
                />
              ) : (
                <>
                  <UploadIcon color={Colors.blue} />
                  <Text style={[TextImg, { color: Colors.btn }]}>
                    Subir Imagem
                  </Text>
                </>
              )}
            </TouchableOpacity>
            {imagem && (
              <Text style={[P, { color: Colors.btn }]}>{imagem.name}</Text>
            )}
          </View>
        )}

        <Text style={Label}>Nome</Text>
        <View style={CampoInput}>
          <PerfilIcon color={Colors.blue} style={InputIcon} />
          <TextInput
            style={Input}
            placeholder="Nome"
            placeholderTextColor={Colors.inactive}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {!telaEditar && (
          <>
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
          </>
        )}

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

        {!telaEditar && (
          <>
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
          </>
        )}
      </View>

      <TouchableOpacity style={Btn}>
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
        onPress={() => router.replace("/login")}
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
