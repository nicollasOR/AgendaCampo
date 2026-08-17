import React from "react";
import { useRouter } from "expo-router";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import EmailIcon from "../../../assets/svg/email.svg";
import CadeadoIcon from "../../../assets/svg/cadeado.svg";
import { Image } from "react-native";

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={styles.card}>

        <Image source={require("../../../assets/img/logo.png")}
        style={styles.logo}/>

          <Text style={styles.titulo}>
            AgendaCampo
          </Text>

          <Text style={styles.descricao}>
            Acesse sua conta para continuar.
          </Text>

        <View style={styles.campo}>

          <Text style={styles.email}>
            E-mail
          </Text>

          <View style={styles.inputContainer}>
            <EmailIcon width={20} height={20} color={"#003EC7"} />

            <TextInput
              style={styles.input}
              placeholder="  seu@email.com"
            />
          </View>


          <Text style={styles.senha}>
            Senha
          </Text>

          <View style={styles.inputContainer}>
            <CadeadoIcon width={20} height={20} color={"#003EC7"} />

            <TextInput
              style={styles.input}
              placeholder="  *******"
              secureTextEntry
            />
          </View>


          {/* Esqueci minha senha */}
          <Text style={styles.senhaesquecida}>
            Esqueci minha senha
          </Text>


          <TouchableOpacity style={styles.botao}>
            <Text style={styles.textobotao}>
              Acessar
            </Text>
          </TouchableOpacity>


          <View style={styles.footer}>
            <Text>
              Uso exclusivo para técnicos e operacionais
            </Text>
          </View>

        </View>

      </View>

    </View>
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

  logo:{
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