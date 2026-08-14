

import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Btn,
  Colors,
  Container,
  H1,
  H2,
  H4,
  P,
  Round,
  theme,
} from "../../constants/theme";
import DetalheIcon from "../../../assets/svg/DetalheIcon.svg";
import PerfilIcon from "../../../assets/svg/PerfilIcon.svg";
import CriarIcon from "../../../assets/svg/CriarIcon.svg";
import { Phone, MapPin } from "lucide-react-native";
// import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";
// import Feather from '@expo/vector-icons/Feather';

export default function Detalhe() {
  const detalhes = {
    id: "ID: #VS-2023-084",
    statusAgenda: "Agendada",
    titulo: "Manutenção Preventiva - Trator John Deere",
    data: "24 de Outubro, 2023 • 08:00 - 12:00",
    descricao:
      "Trator apresentando falha na injeção eletrônica de combustível. Perda de potência durante operação com carga pesada. ",
    desc2:
      "- Equipamento: Trator John Deere 8R - Horímetro: 4.520hrs - Obs: Levar scanner de diagnóstico e filtro de combustível sobressalente. ",
    endereco: "Rodovia BR-163, Km 45, Zona Rural Sorriso - MT, 78890-000",
  };

  return (
    <SafeAreaView style={{ ...Container }}>
      <View style={styles.body}>
        {/* <View style={styles.main}> */}
        <View style={styles.cardsContainer}>
          <View style={[Round, styles.cards]}>
            <Text style={[P, styles.cardsText]}>{detalhes.id}</Text>
            {/* {detalhes.id} */}
          </View>
          <View style={[Round, styles.cards, { width: "40%" }]}>
            <Text style={[P, styles.cardsText]}>{detalhes.statusAgenda}</Text>
          </View>
        </View>
        <ScrollView style={[styles.main]}>
          <View style={[styles.titulo]}>
            <Text style={[H1, { color: Colors.darknessblue }]}>
              {detalhes.titulo}
            </Text>
            <View style={styles.tituloData}>
              <DetalheIcon
                color={Colors.gray}
                width={18}
                height={24}
                style={{ marginRight: "4%" }}
              />
              <Text style={[P, styles.dataTexto, { color: Colors.gray }]}>
                {" "}
                {detalhes.data}{" "}
              </Text>
            </View>
          </View>
          <View style={styles.hr} />

          <View style={[theme.card, styles.info, {marginTop: '2%'}]}>
            <View style={styles.tituloSup}>
              <PerfilIcon color={Colors.txtBlue} />
              <Text style={[H2, { color: Colors.darknessblue }]}>
                Cliente e Local
              </Text>
            </View>
            <View style={styles.section}>
              <Image
                style={styles.img}
                source={require("../../../assets/img/logo.png")}
              />
              <View style={styles.aside}>
                <Text style={[H4]}>Fazenda São João </Text>
                <Text style={[P]}>Contato: Roberto Silva (Gerente)</Text>
                <View style={[styles.telefone]}>
                  <Phone size={16} />
                  {/* <Image source={require("../../../assets/img/logo.png")} /> */}
                  <Text style={[P]}>(11) 98765-4321</Text>
                </View>
              </View>
            </View>

            <View style={styles.hr} />

            <View style={[styles.tituloSup, { flexDirection: "column" }]}>
              <View style={[styles.tituloSup, { alignItems: "center" }]}>
                <MapPin />
                <Text style={[H4, { color: Colors.black }]}>Endereço</Text>
              </View>
              <Text style={styles.tituloSup_desc}>{detalhes.endereco}</Text>
            </View>
          </View>
          <TouchableOpacity style={[Btn, styles.button]}>
            <CriarIcon />
            <Text style={[styles.buttonText]}> Iniciar Atendimento </Text>
          </TouchableOpacity>

          <View style={[theme.card, styles.info, styles.acoes]}>
            <Text style={[P, styles.tituloAcoes]}>AÇÕES SECUNDÁRIAS</Text>
            <TouchableOpacity style={[Btn, styles.button, styles.buttonAcoes]}>
              {/* <CriarIcon /> */}
              <Text style={[styles.buttonText]}> Reagendar </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[Btn, styles.button, styles.buttonAcoes, {margin: 0}]}>
              {/* <CriarIcon /> */}
              <Text style={[styles.buttonText]}> Cancelar Visita </Text>
            </TouchableOpacity>
          </View>

          <View style={[theme.card, styles.acoes]}>
            <View>
              {/* <Image source={require("../../../assets/img/logo.png")} /> */}
              <Text style={[H2, { color: Colors.darknessblue }]}>
                Descricao do Problema
              </Text>
            </View>{" "}
            {/* titulo */}
            <View>
              <Text>{detalhes.descricao}</Text>
              <Text>{detalhes.desc2}</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    marginHorizontal: 15,
  },

  cardsContainer: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `flex-start`,
    gap: `6%`,
    height: "15%",
    width: "80%",
    // height: '%'
  },

  cards: {
    // paddingVertical: `10%`,
    // paddingHorizontal: `2%`,
    color: Colors.txtBlue,
    backgroundColor: Colors.bgcBlue,
    height: "50%",
    width: "59%",
    // textAlign: 'center',
    // alignItems: 'center',
    // letterSpacing: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.borderclr,
  },

  cardsText: {
    color: Colors.txtBlue,
  },

  main: {
    width: "100%",
    // borderColor: 'black',
    // outlineColor: 'black',
    // borderWidth: 1,
    // borderColor: Colors.gray,
    // borderRadius: 8,
    // borderStyle: 'solid',
  },

  titulo: {},

  tituloTexto: {},

  tituloData: {
    flexDirection: `row`,
    // alignItems: "center"
    alignItems: `center`,
    // justifyContent: 'center'
  },

  dataTexto: {
    ...P,
    color: "#434656",
  },

  hr: {
    marginTop: 10,
    width: "100%",
    height: ".3%",
    borderRadius: 10,
    backgroundColor: Colors.gray,
    opacity: 0.4,
  },

  info: {
    width: "99%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.grayShadow,
    borderRadius: 12,
    borderStyle: "solid",
  },

  tituloSup: {
    flexDirection: "row",
    gap: 4,
  },

  section: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 20,
    justifyContent: "center",
    // alignItems: 'center'
  },

  img: {},

  aside: {
    flexDirection: "column",
    justifyContent: "center",

    gap: "10%",
  },

  telefone: {
    flexDirection: "row",
    alignItems: "center",
    gap: "2%",
  },

  tituloSup_desc: {
    marginLeft: "15%",
  },

  button: {
    marginVertical: "10%",
    width: "90%",
    height: "7%",
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 50,
    color: Colors.white,
    gap: '2%',
    backgroundColor: Colors.btnblue
  },

  buttonText: {
    color: Colors.white,
    fontWeight: 800,
    letterSpacing: 1
  },

  tituloAcoes: {
    paddingLeft: 1,
    color: Colors.gray,
  
  },
  acoes: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    // gap: 1
    // alignItems: 'center'
    // backgroundColor: 'black'
  },

  buttonAcoes: {
    height: '25%',
    margin: 0
    
  }


});



