import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/src/contexts/AuthContext";

import { Colors, theme } from "@/src/constants/theme";

import Logo from "@/assets/svg/Logo.svg";
import ArrowIcon from "@/assets/svg/ArrowIcon.svg";
import EmailIcon from "@/assets/svg/EmailIcon.svg";
import CadeadoIcon from "@/assets/svg/CadeadoIcon.svg";

export default function Login() {
  const {
    email,
    setEmail,
    senha,
    setSenha,
    loading,
    erro,
    handleLogin,
    usuario,
  } = useAuth();

  return (
    <SafeAreaView style={[theme.container, theme.column, theme.center]}>
      <StatusBar style="dark" />
      <View style={theme.center}>
        <Logo width={120} height={120} color={Colors.btn} />
        <Text style={[theme.h1, { color: Colors.btn }]}>Agenda Campo</Text>
        <Text style={[theme.h3, { color: Colors.gray }]}>
          Acesse sua conta para continuar.
        </Text>
      </View>

      <View style={theme.column}>
        {erro && <Text style={[theme.p, { color: Colors.red }]}>{erro}</Text>}

        <View>
          <Text style={theme.label}>E-mail</Text>
          <View style={theme.campoInput}>
            <EmailIcon color={Colors.blue} style={theme.inputIcon} />
            <TextInput
              style={theme.input}
              placeholder="seu@email.com"
              placeholderTextColor={Colors.inactive}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>

        <View>
          <Text style={theme.label}>Senha</Text>
          <View style={theme.campoInput}>
            <CadeadoIcon color={Colors.blue} style={theme.inputIcon} />
            <TextInput
              style={theme.input}
              placeholder="********"
              placeholderTextColor={Colors.inactive}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>
          <TouchableOpacity style={{ alignSelf: "flex-end" }}>
            <Text style={[theme.h4, { color: Colors.blue }]}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={theme.btn}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <View style={theme.row}>
            <Text style={theme.btnText}>Acessar</Text>
            <ArrowIcon color={Colors.white} />
          </View>
        )}
      </TouchableOpacity>

      <Text style={[theme.h4, { color: Colors.darkblue }]}>Ou...</Text>

      <TouchableOpacity
        style={[
          theme.btn2,
          {
            borderWidth: 2,
            borderColor: Colors.blue,
          },
        ]}
        onPress={() => {
          router.replace("/cadastro");
        }}
      >
        <Text style={[theme.btnText, { color: Colors.blue }]}>Cadastre-se</Text>
        <ArrowIcon color={Colors.blue} />
      </TouchableOpacity>

      <Text
        style={[
          theme.p,
          { color: Colors.lightgray, position: "absolute", bottom: 40 },
        ]}
      >
        Uso exclusivo para técnicos e operacionais
      </Text>
    </SafeAreaView>
  );
}
