import React from "react";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  Btn,
  BtnText,
  CampoForm,
  CampoInput,
  Center,
  Colors,
  Column,
  Container,
  H1,
  H2,
  H3,
  H4,
  Input,
  InputIcon,
  Label,
  P,
} from "../../constants/theme";
import Logo from "../../../assets/svg/Logo.svg";
import EmailIcon from "../../../assets/svg/EmailIcon.svg";
import ArrowIcon from "../../../assets/svg/ArrowIcon.svg";
import CadeadoIcon from "../../../assets/svg/CadeadoIcon.svg";

export default function Login() {
  const router = useRouter();

  return (
    <SafeAreaView style={[Container, Column, Center]}>
      <View style={Center}>
        <Logo color={Colors.btn}/>
        <Text style={[H1, { color: Colors.btn }]}>AgendaCampo</Text>
        <Text style={[H3, { color: Colors.gray }]}>
          Acesse sua conta para continuar
        </Text>
      </View>
      <View style={CampoForm}>
        <Text style={Label}>E-mail</Text>
        <View style={CampoInput}>
          <EmailIcon color={Colors.blue} style={InputIcon} />
          <TextInput style={Input} placeholder="seu@email.com" />
        </View>
        <Text style={Label}>Senha</Text>
        <View style={CampoInput}>
          <CadeadoIcon color={Colors.blue} style={InputIcon} />
          <TextInput style={Input} placeholder="*******" secureTextEntry />
        </View>
        {/* Esqueci minha senha */}
        <Text style={[H4, { color: Colors.blue }]}>Esqueci minha senha</Text>
      </View>
      <TouchableOpacity style={Btn} onPress={() => router.push("/(tabs)/home")}>
        <Text style={BtnText}>Acessar</Text>
        <ArrowIcon color={Colors.white} />
      </TouchableOpacity>
      <Text style={[P, { position: "absolute", bottom: 40 }]}>
        Uso exclusivo para técnicos e operacionais
      </Text>
    </SafeAreaView>
  );
}
