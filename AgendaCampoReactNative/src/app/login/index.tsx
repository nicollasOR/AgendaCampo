import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAutenticacao } from "@/src/hooks/useAutenticacao";
import {
  ActivityIndicator,
  ScrollView,
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
  Center,
  Colors,
  Column,
  Container,
  H1,
  H3,
  H4,
  Input,
  InputIcon,
  Label,
  P,
  theme,
} from "@/src/constants/theme";

import Logo from "@/assets/svg/Logo.svg";
import EmailIcon from "@/assets/svg/EmailIcon.svg";
import ArrowIcon from "@/assets/svg/ArrowIcon.svg";
import CadeadoIcon from "@/assets/svg/CadeadoIcon.svg";

export default function Login() {
  const { email, setEmail, senha, setSenha, loading, erro, handleLogin } =
    useAutenticacao();

  return (
    <SafeAreaView style={[Container, Column, Center]}>
      <View style={Center}>
        <Logo color={Colors.btn} />
        <Text style={[H1, { color: Colors.btn }]}>AgendaCampo</Text>
        <Text style={[H3, { color: Colors.gray }]}>
          Acesse sua conta para continuar.
        </Text>
      </View>

      <View style={CampoForm}>
        {erro && (
          <Text style={{ color: Colors.red, textAlign: "center" }}>{erro}</Text>
        )}

        <View>
          <Text style={Label}>E-mail</Text>
          <View style={CampoInput}>
            <EmailIcon color={Colors.blue} style={InputIcon} />
            <TextInput
              style={Input}
              placeholder="seu@email.com"
              placeholderTextColor="#A0AEC0"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>

        <View>
          <Text style={Label}>Senha</Text>
          <View style={CampoInput}>
            <CadeadoIcon color={Colors.blue} style={InputIcon} />
            <TextInput
              style={Input}
              placeholder="********"
              placeholderTextColor="#A0AEC0"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>
        </View>

        <TouchableOpacity style={{ alignSelf: "flex-start" }}>
          <Text style={[H4, { color: Colors.blue }]}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[Btn, { width: "100%", gap: 8 }, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <>
            <Text style={BtnText}>Acessar</Text>
            <ArrowIcon color={Colors.white} />
          </>
        )}
      </TouchableOpacity>

      <Text style={[H4, { color: Colors.gray }]}>Ou...</Text>

      <TouchableOpacity
        style={[
          Btn2,
          {
            width: "100%",
            borderWidth: 2,
            borderColor: Colors.blue,
          },
        ]}
        onPress={() => router.replace("/cadastro")}
      >
        <Text style={[BtnText, { color: Colors.blue }]}>Cadastre-se</Text>
        <ArrowIcon color={Colors.btn} />
      </TouchableOpacity>

      <Text style={[P, { position: "absolute", bottom: 40 }]}>
        Uso exclusivo para técnicos e operacionais
      </Text>
    </SafeAreaView>
  );
}
