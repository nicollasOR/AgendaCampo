import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import VisitaIcon from "../../../../assets/svg/VisitaIcon.svg";
import VisitaCheckIcon from "../../../../assets/svg/VisitaCheckIcon.svg";
import ArrowMapIcon from "../../../../assets/svg/ArrowMapIcon.svg";
import CalendarIcon from "../../../../assets/svg/CalendarIcon.svg";
import WatchIcon from "../../../../assets/svg/WatchIcon.svg";
import MapIcon from "../../../../assets/svg/MapIcon.svg";
import CriarIcon from "../../../../assets/svg/CriarIcon.svg";
import {
  Btn,
  Btn2,
  Colors,
  Font,
  H1,
  H2,
  H3,
  H4,
  P,
  Row,
  theme,
} from "../../../constants/theme";
import { ScrollView } from "react-native";

const Home = () => {
  return (
    <ScrollView style={styles.main} contentContainerStyle={styles.mainContent} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.welcomeUser}>
          <Text style={{ ...H2, color: Colors.black }}>Olá, Técnico João</Text>
          <Text style={{ ...P, color: Colors.gray }}>
            Aqui estão suas visitas programadas.
          </Text>
        </View>

        <View style={styles.containerVisitas}>
          <View style={styles.topOfContainer}>
            <View style={styles.textBigger}>
              <VisitaIcon />
              <Text style={{ ...H2, color: Colors.black, fontSize: 24 }}>
                Visitas Futuras
              </Text>
            </View>

            <View style={styles.visitasNumber}>
              <Text style={{ ...P, color: Colors.white, fontSize: 12 }}>
                2 Hoje
              </Text>
            </View>
          </View>

          <View style={styles.cardVisita}>
            <View style={styles.contentCard}>
              <View style={styles.topCard}>
                <View style={styles.cabecalhoCard}>
                  <View style={styles.statusVisita}>
                    <Text style={{ ...P, fontSize: 12, color: Colors.btnBlue }}>
                      Agendada
                    </Text>
                  </View>
                  <VisitaCheckIcon />
                </View>

                <View>
                  <Text style={{ ...H2, fontSize: 24, color: Colors.black }}>
                    Fazenda Boa Esperança
                  </Text>
                  <Text style={{ ...P, fontSize: 14, color: Colors.gray }}>
                    Ref: RN01
                  </Text>
                </View>
              </View>

              <View style={styles.infoVisita}>
                <View style={styles.conjuntoIcon}>
                  <CalendarIcon />
                  <Text style={{ ...P, fontSize: 16, color: Colors.gray }}>
                    24 Out 2023
                  </Text>
                </View>
                <View style={styles.conjuntoIcon}>
                  <WatchIcon />
                  <Text style={{ ...P, fontSize: 16, color: Colors.gray }}>
                    08:00 - 10:00
                  </Text>
                </View>
                <View style={styles.conjuntoIcon}>
                  <MapIcon />
                  <Text style={{ ...P, fontSize: 16, color: Colors.gray }}>
                    Rod. SP 340, Km 15, Mogi Mirim - SP
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.rodapeCard}>
              <TouchableOpacity style={styles.btnCard}>
                <Text style={{ ...P, fontSize: 14, color: Colors.btnBlue }}>
                  Detalhes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnCardRoute}>
                <ArrowMapIcon />
                <Text style={{ ...P, color: Colors.white, fontWeight: 600 }}>
                  Iniciar Rota
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cardVisita}>
            <View style={styles.contentCard}>
              <View style={styles.topCard}>
                <View style={styles.cabecalhoCard}>
                  <View style={styles.statusVisita}>
                    <Text style={{ ...P, fontSize: 12, color: Colors.btnBlue }}>
                      Agendada
                    </Text>
                  </View>
                  <VisitaCheckIcon />
                </View>

                <View>
                  <Text style={{ ...H2, fontSize: 24, color: Colors.black }}>
                    Sítio das Águas
                  </Text>
                  <Text style={{ ...P, fontSize: 14, color: Colors.gray }}>
                    Ref: RN03
                  </Text>
                </View>
              </View>

              <View style={styles.infoVisita}>
                <View style={styles.conjuntoIcon}>
                  <CalendarIcon />
                  <Text style={{ ...P, fontSize: 16, color: Colors.gray }}>
                    24 Out 2023
                  </Text>
                </View>
                <View style={styles.conjuntoIcon}>
                  <WatchIcon />
                  <Text style={{ ...P, fontSize: 16, color: Colors.gray }}>
                    14:00 - 16:30
                  </Text>
                </View>
                <View style={styles.conjuntoIcon}>
                  <MapIcon />
                  <Text style={{ ...P, fontSize: 16, color: Colors.gray }}>
                    Estrada Municipal, Lote 4, Itapira - SP
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.rodapeCard}>
              <TouchableOpacity style={styles.btnCard}>
                <Text style={{ ...P, fontSize: 14, color: Colors.btnBlue }}>
                  Detalhes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnCardRoute}>
                <ArrowMapIcon />
                <Text style={{ ...P, color: Colors.white, fontWeight: 600 }}>
                  Iniciar Rota
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.btnAgendar}>
          <CriarIcon color={Colors.white}/>
          <Text style={{ ...P, fontSize:15 , color: Colors.white }}>Agendar Nova Visita</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
    main:{
        flex:1
    },

  mainContent: {
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20
  },

  content: {
    width: "90%",
    gap: 30,
  },

  welcomeUser: {
    flexDirection: "column",
  },

  containerVisitas: {
    flexDirection: "column",
    gap: 10,
    alignItems: "center"
  },

  topOfContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%'
  },

  textBigger: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },

  visitasNumber: {
    backgroundColor: "#003D9B",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },

  cardVisita: {
    flexDirection: "column",
    borderWidth: 0.5,
    borderColor: "#a1a1a1",
    borderRadius: 16,
    gap: 5,
    borderLeftWidth: 5,
    borderLeftColor: "#003D9B",
    width: "100%",
    height: 280,
    justifyContent: "space-between",
    alignItems: "center",
  },

  topCard: {
    alignItems: "flex-start",
    gap: 5,
  },

  cabecalhoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  statusVisita: {
    backgroundColor: "#E1E8FF",
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 7,
  },

  contentCard: {
    paddingBlockStart: 20,
    gap: 20,
    justifyContent: "center",
    width: "90%",
  },

  infoVisita: {
    gap: 10,
  },

  conjuntoIcon: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  rodapeCard: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#E9EDFF",
    borderWidth: 0.5,
    borderColor: "#a1a1a1",
    width: "100%",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  btnCard: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: "#003D9B",
    borderRadius: 20,
    backgroundColor: Colors.white,
  },

  btnCardRoute: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#0052CC",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  btnAgendar: {
    backgroundColor: "#013e9b",
    width: '60%',
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 30
  },
});
