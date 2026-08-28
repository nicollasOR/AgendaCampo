import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  Box3,
  Btn,
  Btn2,
  BtnText,
  CampoForm,
  CampoInput,
  Center,
  Colors,
  Column,
  Container,
  H1,
  H3,
  Input,
  InputIcon,
  Label,
  P,
} from "@/src/constants/theme";
import Logo from "@/assets/svg/Logo.svg";
import CriarIcon from "@/assets/svg/CriarIcon.svg";
import EmailIcon from "@/assets/svg/EmailIcon.svg";
import PerfilIcon from "@/assets/svg/PerfilIcon.svg";
import CadeadoIcon from "@/assets/svg/CadeadoIcon.svg";
import ArrowBackIcon from "@/assets/svg/ArrowBackIcon.svg";

export default function Cadastro() {
  const router = useRouter();

  return (
    <SafeAreaView style={[Container, Column, Center]}>
      <View style={Center}>
        <Logo color={Colors.btn} />
        <Text style={[H1, { color: Colors.btn }]}>AgendaCampo</Text>
        <Text style={[H3, { color: Colors.gray }]}>
          Crie uma conta para continuar
        </Text>
      </View>
      <View style={CampoForm}>
        <Text style={Label}>Nome</Text>
        <View style={CampoInput}>
          <PerfilIcon color={Colors.blue} style={InputIcon} />
          <TextInput style={Input} placeholder="Nome" />
        </View>
        <Text style={Label}>E-mail</Text>
        <View style={CampoInput}>
          <EmailIcon color={Colors.blue} style={InputIcon} />
          <TextInput style={Input} placeholder="Nome@email.com" />
        </View>
        <Text style={Label}>Senha</Text>
        <View style={CampoInput}>
          <CadeadoIcon color={Colors.blue} style={InputIcon} />
          <TextInput style={Input} placeholder="*******" secureTextEntry />
        </View>
        <Text style={Label}>Confirmar Senha</Text>
        <View style={CampoInput}>
          <CadeadoIcon color={Colors.blue} style={InputIcon} />
          <TextInput style={Input} placeholder="*******" secureTextEntry />
        </View>
      </View>
      <TouchableOpacity style={Btn} onPress={() => router.push("/(tabs)/home")}>
        <CriarIcon color={Colors.white} />
        <Text style={BtnText}>Criar Conta</Text>
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
