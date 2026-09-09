import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/src/contexts/AuthContext";
import { atualizarSenhaHooks } from "@/src/hooks/useUsuario";

import { Colors, theme } from "@/src/constants/theme";

import Logo from "@/assets/svg/Logo.svg";
import CadeadoIcon from "@/assets/svg/CadeadoIcon.svg";
import ArrowBackIcon from "@/assets/svg/ArrowBackIcon.svg";
import ConfirmarIcon from "@/assets/svg/ConfirmarIcon.svg";

export default function AlterarSenha() {
  const router = useRouter();
  const { usuario } = useAuth();
  const [senha, setSenha] = useState<string>("");
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  async function trocarSenha() {
    try {
      if (usuario?.usuarioID == null) {
        Alert.alert("Erro", "Usuário não encontrado!");
        return;
      }

      if (!senha.trim() || !confirmarSenha.trim()) {
        Alert.alert("Atenção", "Preencha os campos restantes!");
        return;
      }

      if (senha !== confirmarSenha) {
        Alert.alert("Atenção", "As senhas não coincidem!");
        return;
      }

      await atualizarSenhaHooks(usuario?.usuarioID, senha);
      Alert.alert("Sucesso", "Senha alterada com sucesso!");
      router.push("/(tabs)/home");
    } catch (error: any) {
      const message = error.response?.data || "Erro ao atualizar senha!";
      Alert.alert("Erro", message);
    }
  }

  return (
    <SafeAreaView style={[theme.container, theme.column, theme.center]}>
      <StatusBar style="dark" />
      <View style={theme.center}>
        <Logo color={Colors.btn} />
        <Text style={[theme.h1, { color: Colors.btn }]}>AgendaCampo</Text>
        <Text style={[theme.h3, { color: Colors.gray }]}>
          Altere a senha da sua conta
        </Text>
      </View>

      <View style={theme.campoForm}>
        <Text style={theme.label}>Nova Senha</Text>
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

        <Text style={theme.label}>Confirmar Nova Senha</Text>
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

      <TouchableOpacity style={theme.btn} onPress={trocarSenha}>
        <ConfirmarIcon color={Colors.white} />
        <Text style={theme.btnText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          theme.btn2,
          {
            borderWidth: 2,
            borderColor: Colors.blue,
          },
        ]}
        onPress={() => router.replace("/(tabs)/perfil")}
      >
        <ArrowBackIcon color={Colors.blue} />
        <Text style={[theme.btnText, { color: Colors.blue }]}>Voltar</Text>
      </TouchableOpacity>

      <Text style={[theme.p, { position: "absolute", bottom: 40 }]}>
        Uso exclusivo para técnicos e operacionais
      </Text>
    </SafeAreaView>
  );
}
