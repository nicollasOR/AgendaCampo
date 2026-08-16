

import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList

} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Btn,
  Center,
  Colors,
  Column,
  Container,
  H1,
  H2,
  H3,
  H4,
  P,
  Round,
  theme,
} from "../../constants/theme";
import DetalheIcon from "../../../assets/svg/DetalheIcon.svg";
import PerfilIcon from "../../../assets/svg/PerfilIcon.svg";
import CriarIcon from "../../../assets/svg/CriarIcon.svg";
import EditarIcon from "../../../assets/svg/EditarIcon.svg";
import CancelarIcon from "../../../assets/svg/CancelarIcon.svg";
import { Phone, MapPin, Scroll, FileText } from "lucide-react-native";
import { useEffect, useState } from "react";
import { listarVisitasID, visitaGet } from "../api/visitaService";
// import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";
// import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";
// import Feather from '@expo/vector-icons/Feather';

export default function Detalhe() {

  const[visita, setVisita] = useState<visitaGet>()
  let visitaID: number = 2

  async function buscarVisitaID() {
    try {
      const response = await listarVisitasID(Number(visitaID))
      setVisita(response.data)
    } catch (error: any) {
      return error.response.data
    }
  }



  useEffect(() => {
    setTimeout(() => {
      buscarVisitaID()
    }, 1000);
  }, [])

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

  const client = {

    nome: `Fazenda São João`

  }

  // function dividirNome(nome:string) {
  //   if(client)
  //     for(let i = 0; i < name.length; i++)
  //   {
  //     i = nome.length[i]
  //   }
    
  // }


  return (
    <SafeAreaView style={[{ ...Container }]}>
      <View style={[styles.body, {backgroundColor: `transparent`}]}>
        {/* <View style={styles.main}> */}
        <View style={[styles.cardsContainer, { paddingHorizontal: 0, backgroundColor: `transparent` }]}>
          <View style={[Round, styles.cards]}>
            <Text style={[P, styles.cardsText]}>{detalhes.id}</Text>
          </View>
          <View style={[Round, styles.cards, { width: "40%" }]}>
            <Text style={[P, styles.cardsText]}>{detalhes.statusAgenda}</Text>
          </View>
        </View>
        <ScrollView style={[styles.main]}



        // contentContainerStyle={[
        //   { paddingBottom: 30 },
        // ]}
        >
          <View style={[styles.titulo]}>
            <Text style={[H1, { color: Colors.darknessblue }]}>
              {detalhes.titulo}
            </Text>
            <View style={styles.tituloData}>
              <DetalheIcon
                color={Colors.gray}
                width={18}
                height={24}
                style={{ marginHorizontal: 5 }}
              />
              {/* <View style={styles.imgClient}>
                <Text>{detalhes.titulo}</Text>
              </View> */}
              <Text style={[P, styles.dataTexto, { color: Colors.gray }]}>
                {detalhes.data}
              </Text>
            </View>
          </View>
          <View style={styles.hr} />

          <View style={[theme.card, styles.info, { marginTop: '2%' }]}>
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
                  <Text style={[P]}>(11) 98765-4321</Text>
                </View>
              </View>
            </View>

            <View style={styles.hr} />

            <View style={[styles.tituloSup, { flexDirection: "column" }]}>
              <View style={[styles.tituloSup, { alignItems: "center", marginTop: 10 }]}>
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
            <TouchableOpacity style={[Btn, styles.button, styles.buttonAcoes, { backgroundColor: `transparent`, borderColor: Colors.txtBlue, borderStyle: `solid`, borderWidth: 3, }]}>
              <EditarIcon color={Colors.txtBlue} />
              <Text style={[styles.buttonText, { color: Colors.txtBlue }]}> Reagendar </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[Btn, styles.button, styles.buttonAcoes, { backgroundColor: `transparent`, borderColor: Colors.lightgray, borderStyle: `solid`, borderWidth: 3, }]}>
              <CancelarIcon color={Colors.darkgray} width={30} />
              <Text style={[styles.buttonText, { color: Colors.darkgray }]}> Cancelar Visita </Text>
            </TouchableOpacity>
          </View>

          <View style={[theme.card, styles.info, { marginTop: '2%', gap: 10 }]}>
            <View style={[styles.tituloSup]}>
              <FileText color={Colors.txtBlue} size={28} />
              <Text style={[H3, { color: Colors.darknessblue, fontWeight: 700 }]}>
                Descrição do Problema
              </Text>
            </View>
            <View style={[styles.infoDesc, {borderWidth: 2}]} >
              <Text style={[P, {color: `black`}]}>{detalhes.descricao}</Text>
              <Text style={[P, {color: `black`}]}>{detalhes.desc2}</Text>
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
    paddingHorizontal: 10,
    flex: 1
  },

  cardsContainer: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `flex-start`,
    gap: `6%`,
    height: `7%`,
    marginVertical: `2%`,
    width: "80%",
    // height: '%'
  },

  cards: {
    color: Colors.txtBlue,
    backgroundColor: Colors.bgcBlue,
    height: "90%",
    width: "64%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.borderclr,
  },

  cardsText: {
    color: Colors.txtBlue,
  },

  main: {
    width: "100%",
    // height: `100%`,

    // padding: 
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
    gap: 10 
  },

  tituloSup: {
    flexDirection: "row",
    gap: 7,
  },

  section: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 20,
    justifyContent: "center",
    // alignItems: 'center'
  },

  img: {
    height: 50,
    width: 50

  },

  imgClient: {

  },

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
    width: "100%",
    height: "5.5%",
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
    height: '20%',
    width: '100%',
    // justifyContent: `center`
  },

  buttonAcoes: {
    marginTop: 15,
    height: '28%',
    margin: 0,
    marginVertical: 0
  },

  infoDesc: {
    width: "99%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.littleblue,
    backgroundColor: Colors.littlebluelight,
    borderRadius: 12,
    borderStyle: "solid",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 30,
    justifyContent: `center`
    
  }


});



