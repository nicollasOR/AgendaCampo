import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import {
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
} from "../../constants/theme";
import Logo from "../../../assets/svg/Logo.svg";
import CadeadoIcon from "../../../assets/svg/CadeadoIcon.svg";
import ConfirmarIcon from "../../../assets/svg/ConfirmarIcon.svg";
import ArrowBackIcon from "../../../assets/svg/ArrowBackIcon.svg";

export default function AlterarSenha() {
  const router = useRouter();

  return (
    <SafeAreaView style={[Container, Column, Center]}>
      <View style={Center}>
        <Logo color={Colors.btn} />
        <Text style={[H1, { color: Colors.btn }]}>AgendaCampo</Text>
        <Text style={[H3, { color: Colors.gray }]}>
          Altere a senha da sua conta
        </Text>
      </View>
      <View style={CampoForm}>
        <Text style={Label}>Nova Senha</Text>
        <View style={CampoInput}>
          <CadeadoIcon color={Colors.blue} style={InputIcon} />
          <TextInput style={Input} placeholder="*******" secureTextEntry />
        </View>
        <Text style={Label}>Nova Confirmar Senha</Text>
        <View style={CampoInput}>
          <CadeadoIcon color={Colors.blue} style={InputIcon} />
          <TextInput style={Input} placeholder="*******" secureTextEntry />
        </View>
      </View>
      <TouchableOpacity style={Btn} onPress={() => router.push("/(tabs)/home")}>
        <ConfirmarIcon color={Colors.white} />
        <Text style={BtnText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          Btn2,
          {
            borderWidth: 2,
            borderColor: Colors.blue,
          },
        ]}
        onPress={() => router.replace("/(tabs)/perfil")}
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
