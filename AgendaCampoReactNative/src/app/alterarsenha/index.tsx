import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
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
} from "@/src/constants/theme";
import Logo from "@/assets/svg/Logo.svg";
import CadeadoIcon from "@/assets/svg/CadeadoIcon.svg";
import ArrowBackIcon from "@/assets/svg/ArrowBackIcon.svg";
import ConfirmarIcon from "@/assets/svg/ConfirmarIcon.svg";
import { useState } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { atualizarSenhaHooks } from "@/src/hooks/useUsuario";
import { useAuthTESTE } from "@/src/contexts/AuthContextTESTE";

export default function AlterarSenha() {
  const router = useRouter();
  const {usuario} = useAuthTESTE()
  const[senha, setSenha] = useState<string>("")
  const[confirmarSenha, setConfirmarSenha] = useState<string>("")
  

  async function trocarSenha() {
    try
    {
      if(usuario?.usuarioID == null)
      {
        Alert.alert("Usuário não encontrado")
        return
      }

      if(!senha || !confirmarSenha)
        Alert.alert("Preencha os campos restantes!")
      if(senha !== confirmarSenha)
        Alert.alert("As senhas não se coincidem..")


      atualizarSenhaHooks(usuario?.usuarioID,senha)
      Alert.alert("Senha alterada")
      router.push("/(tabs)/home");
    }

    catch(error: any)
    {
      const message = error.response?.data || "Erro ao atualizar senha!"
      Alert.alert("Erro!", message )
    }
  }
  return (
    <SafeAreaView style={[Container, Column, Center]}>
      <StatusBar style="dark" />
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
          <TextInput
            style={Input}
            placeholder="*******"
            placeholderTextColor={Colors.inactive}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>
        <Text style={Label}>Nova Confirmar Senha</Text>
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
      <TouchableOpacity style={Btn} onPress={() => trocarSenha()}>
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
