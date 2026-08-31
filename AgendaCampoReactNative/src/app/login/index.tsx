import React from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Btn,
  BtnText,
  CampoForm,
  CampoInput,
  Center,
  Colors,
  Container,
  H1,
  H3,
  Input,
  InputIcon,
  Label,
} from "../../constants/theme";
import Logo from "../../../assets/svg/Logo.svg";
import EmailIcon from "../../../assets/svg/EmailIcon.svg";
import ArrowIcon from "../../../assets/svg/ArrowIcon.svg";
import CadeadoIcon from "../../../assets/svg/CadeadoIcon.svg";
import { useAutenticacao } from "../../hooks/useAutenticacao";

export default function Login() {
  const {
    email,
    setEmail,
    senha,
    setSenha,
    loading,
    erro,
    handleLogin,
  } = useAutenticacao();

  return (
    <SafeAreaView style={[Container, { justifyContent: "center", alignItems: "center" }]}>
      <View style={{ width: "85%", maxWidth: 360, alignItems: "center", gap: 20 }}>
        
        <View style={[Center, { gap: 8 }]}>
          <Logo width={88} height={68} color={Colors.blue} />
          <Text style={[H1, { color: Colors.blue, fontWeight: "bold", marginTop: 8 }]}>
            AgendaCampo
          </Text>
          <Text style={[H3, { color: Colors.gray, textAlign: "center", fontSize: 16 }]}>
            Acesse sua conta para continuar.
          </Text>
        </View>

        <View style={[CampoForm, { width: "100%", gap: 14 }]}>
          {erro && (
            <Text style={{ color: "red", textAlign: "center", marginBottom: 6 }}>
              {erro}
            </Text>
          )}

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

          <TouchableOpacity style={{ alignSelf: "flex-start", marginTop: 4 }}>
            <Text style={{ color: Colors.blue, fontWeight: "600", fontSize: 14 }}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            Btn,
            {
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              paddingVertical: 14,
              borderRadius: 12,
              marginTop: 10,
            },
            loading && { opacity: 0.7 },
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <>
              <Text style={BtnText}>Acessar</Text>
              <ArrowIcon color={Colors.white} width={18} height={18} />
            </>
          )}
        </TouchableOpacity>

        <Text style={{ fontSize: 12, color: Colors.gray, textAlign: "center", marginTop: 12 }}>
          Uso exclusivo para técnicos e operacionais.
        </Text>
      </View>
    </SafeAreaView>
  );
}