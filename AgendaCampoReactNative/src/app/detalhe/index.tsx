import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Container, H1, H2, P, Round, theme } from "../../constants/theme";
import DetalheIcon from "../../../assets/svg/DetalheIcon.svg"
import PerfilIcon from "../../../assets/svg/PerfilIcon.svg"
import CriarIcon from "../../../assets/svg/CriarIcon.svg"
// import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";

export default function Detalhe() {

  const detalhes = {
    id: "ID: #VS-2023-084",
    statusAgenda: "Agendada",
    titulo: "Manutenção Preventiva - Trator John Deere",
    data: "24 de Outubro, 2023 • 08:00 - 12:00",
    descricao: "Trator apresentando falha na injeção eletrônica de combustível. Perda de potência durante operação com carga pesada. ",
    desc2: "- Equipamento: Trator John Deere 8R - Horímetro: 4.520hrs - Obs: Levar scanner de diagnóstico e filtro de combustível sobressalente. ",
    endereco: "Rodovia BR-163, Km 45, Zona Rural Sorriso - MT, 78890-000"
  }


  return (
    <SafeAreaView style={{ ...Container }}>
      <View style={styles.body}>
        
      {/* <View style={styles.main}> */}
      <View style={styles.cardsContainer}>
        <View style={[Round, styles.cards]}>
          <Text>{detalhes.id}</Text>
        </View>
        <View style={styles.cards}>
          <Text>{detalhes.statusAgenda}</Text>
        </View>

      </View>
      <View style={[styles.titulo,]}>
        <Text style={[H1, {color: Colors.darknessblue}]}>{detalhes.titulo}</Text>
        <View style={styles.tituloData}>
          <DetalheIcon color={Colors.gray} width={26} height={34} />
          {/* <Text style={{ ...P }}> {detalhes.data}</Text> */}
          <Text style={[P, styles.dataTexto]}> {detalhes.data} </Text>
        </View>
      </View>
      <View style={styles.hr} />

      <View style={[theme.card, styles.info]}>
        <View>
          {/* <PerfilIcon color={Colors.blue} /> */}
          <Text style={[H2, {color: Colors.darknessblue}]}>Cliente e Local</Text>
        </View>
        <View>
          {/* <Image style={styles.img} source={require("../../../assets/img/logo.png")} /> */}
          <View style={styles.aside}>
            <Text>Fazenda São João </Text>
            <Text>Contato: Roberto Silva (Gerente)</Text>
            <View>
              {/* <Image source={require("../../../assets/img/logo.png")} /> */}
              <Text>(11) 98765-4321</Text>
            </View>
          </View>
        </View>
        <View>
          <View>
            <Image />
            <Text>Endereco</Text>
          </View>
          <Text>{detalhes.endereco}</Text>
        </View>
      </View>
      <TouchableOpacity> 
        {/* <CriarIcon /> */}
      <Text> Iniciar Atendimento </Text>
      </TouchableOpacity>

      <View style={[theme.card, styles.acoes]}>
        <Text></Text>
        <TouchableOpacity> 
          {/* <CriarIcon /> */}
          <Text> Reagendar </Text></TouchableOpacity>
        <TouchableOpacity> 
          {/* <CriarIcon /> */}
          <Text> Cancelar Visita </Text></TouchableOpacity>
      </View>

      <View style={[theme.card, styles.acoes]}>
        <View>
          {/* <Image source={require("../../../assets/img/logo.png")} /> */}
          <Text style={[H2, {color: Colors.darknessblue}]}>Descricao do Problema</Text>
        </View> {/* titulo */}

        <View>
          <Text>
            {detalhes.descricao}
          </Text>
          <Text>
            {detalhes.desc2}
          </Text>
        </View>
      </View>
      </View>



      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  body: {
    marginHorizontal: 20
  },

  cardsContainer: {
    flexDirection: `row`,
    alignContent: `center`,
    justifyContent: `flex-start`,
    gap: `15%`
  },

  cards: {
    paddingVertical: `10%`,
    paddingHorizontal: `10%`,
    color: Colors.txtBlue,
    backgroundColor: Colors.bgcBlue
  },

  main: {

  },

  titulo: {

  },

  tituloTexto: {

  },

  tituloData: {
    flexDirection: `row`,
    // alignItems: "center"
    alignItems: `center`
  },

  dataTexto: {
    ...P,
    color: "#434656"
  },

  hr: {

  },

  info: {

  },

  img: {

  },

  aside: {

  },

  acoes: {

  }

})
