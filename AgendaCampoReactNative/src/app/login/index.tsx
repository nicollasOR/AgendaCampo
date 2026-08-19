import React from "react";
import { useRouter } from "expo-router";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import EmailIcon from "../../../assets/svg/EmailIcon.svg";
import CadeadoIcon from "../../../assets/svg/CadeadoIcon.svg";
import SetaIcon from "../../../assets/svg/FlechaIcon.svg"
import { Image } from "react-native";
import { Btn, Btn2, CampoForm, CampoInput, Colors, Column, Container, H1, H2, H3, Input, InputIcon, P } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();

  return (
    <SafeAreaView style={Container} edges={["top", "left", "right"]}>

      {/* <View style={styles.card}> */}

      <Image source={require("../../../assets/img/logo.png")}
        style={styles.logo} />

      <Text style={[H2, { color: Colors.btn }]}>
        AgendaCampo
      </Text>

      <Text style={[H3, { color: Colors.gray }]}>
        Acesse sua conta para continuar.
      </Text>

      <View style={[Column, CampoForm]}>

        <Text style={[P, { color: Colors.black, fontWeight: '500' }, styles.campoInput]}>
          E-mail
        </Text>

        <View style={[CampoInput]}>
          <EmailIcon width={20} height={20} color={"#003EC7"} style={InputIcon} />

          <TextInput
            style={[Input]}
            placeholder="  seu@email.com"
          />
        </View>


        <Text style={[P, { color: Colors.black, fontWeight: '500' }, styles.campoInput]}>
          Senha
        </Text>

        <View style={[CampoInput]}>

          <CadeadoIcon width={20} height={20} color={"#003EC7"} style={[InputIcon ]} />
          <TextInput
            style={[Input]}
            placeholder="  *******"
            secureTextEntry
          />
        </View>


        {/* Esqueci minha senha */}
        <Text style={[P, {color: Colors.btn}]}>
          Esqueci minha senha
        </Text>


        <TouchableOpacity style={[Btn, {borderRadius: 10}]} onPress={() => router.push("/tabs/home")}>
          <Text style={styles.textobotao}>
            Acessar
          </Text>
          <SetaIcon width={20} height={20} color={Colors.white}/>
        </TouchableOpacity>


        <View style={styles.footer}>
          <Text>
            Uso exclusivo para técnicos e operacionais
          </Text>
        </View>

      </View>

      {/* </View> */}

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    padding: 23,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },

  logo: {
    width: 70,
    height: 30,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  titulo: {
    color: "#003EC7",
    fontSize: 30,
    marginTop: 30,
    textAlign: "center"
  },

  descricao: {
    margin: 8,
    fontWeight: "300",
    fontSize: 20,
    textAlign: "center"
  },

  campoInput: {
    marginBottom: `2%`
  },

  campo: {
    margin: 35,
  },

  email: {
    fontWeight: "600",
    marginBottom: 8,
  },

  senha: {
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
  },


  inputContainer: {
    width: 300,
    height: 45,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D0D5E2",
    borderRadius: 8,
    paddingHorizontal: 12,

    flexDirection: "row",
    alignItems: "center",
  },


  input: {
    flex: 1,
    marginLeft: 8,
  },

  senhaesquecida: {
    marginTop: 20,
    color: "#003EC7",
  },

  botao: {
    width: 300,
    marginTop: 20,
    height: 50,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#003EC7",
    justifyContent: "center",
    alignItems: "center",
  },

  textobotao: {
    color: "#FFFFFF",
    fontSize: 18,
  },

  footer: {
    marginTop: 40,
    fontWeight: "300",
    alignItems: "center",
  },

});