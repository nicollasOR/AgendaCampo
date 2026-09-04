import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/src/contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
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
  Row,
} from "@/src/constants/theme";

import Logo from "@/assets/svg/Logo.svg";
import EmailIcon from "@/assets/svg/EmailIcon.svg";
import ArrowIcon from "@/assets/svg/ArrowIcon.svg";
import CadeadoIcon from "@/assets/svg/CadeadoIcon.svg";

export default function Login() {
  const { email, setEmail, senha, setSenha, loading, erro, handleLogin } =
    useAuth();

  return (
    <SafeAreaView style={[Container, Column, Center]}>
      <StatusBar style="dark" />
      <View style={Center}>
        <Logo width={120} height={120} color={Colors.btn} />
        <Text style={[H1, { color: Colors.btn }]}>Agenda Campo</Text>
        <Text style={[H3, { color: Colors.gray }]}>
          Acesse sua conta para continuar.
        </Text>
      </View>

      <View style={CampoForm}>
        {erro && <Text style={[P, { color: Colors.red }]}>{erro}</Text>}

        <View>
          <Text style={Label}>E-mail</Text>
          <View style={CampoInput}>
            <EmailIcon color={Colors.blue} style={InputIcon} />
            <TextInput
              style={Input}
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
          <Text style={Label}>Senha</Text>
          <View style={CampoInput}>
            <CadeadoIcon color={Colors.blue} style={InputIcon} />
            <TextInput
              style={Input}
              placeholder="********"
              placeholderTextColor={Colors.inactive}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>
          <TouchableOpacity style={{ alignSelf: "flex-end" }}>
            <Text style={[H4, { color: Colors.blue }]}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={Btn} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <View style={Row}>
            <Text style={BtnText}>Acessar</Text>
            <ArrowIcon color={Colors.white} />
          </View>
        )}
      </TouchableOpacity>

      <Text style={[H4, { color: Colors.darkblue }]}>Ou...</Text>

      <TouchableOpacity
        style={[
          Btn2,
          {
            borderWidth: 2,
            borderColor: Colors.blue,
          },
        ]}
        onPress={() => router.replace("/cadastro")}
      >
        <Text style={[BtnText, { color: Colors.blue }]}>Cadastre-se</Text>
        <ArrowIcon color={Colors.blue} />
      </TouchableOpacity>

      <Text style={[P, { position: "absolute", bottom: 40 }]}>
        Uso exclusivo para técnicos e operacionais
      </Text>
    </SafeAreaView>
  );
}
