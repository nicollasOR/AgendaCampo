import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

import {
  Box,
  Btn2,
  Card,
  Colors,
  Column,
  Container,
  H2,
  P,
  Icon,
  Info,
  Round,
  Row,
  H4,
  H1,
  BtnText,
  Center,
  Scroll,
} from "../../../constants/theme";

import SairIcon from "../../../../assets/svg/SairIcon.svg";
import AjudaIcon from "../../../../assets/svg/AjudaIcon.svg";
import ArrowIcon from "../../../../assets/svg/ArrowIcon.svg";
import PerfilIcon from "../../../../assets/svg/PerfilIcon.svg";
import VisitaIcon from "../../../../assets/svg/VisitaIcon.svg";
import DetalheIcon from "../../../../assets/svg/DetalheIcon.svg";
import RelogioIcon from "../../../../assets/svg/RelogioIcon.svg";

export default function Perfil() {
  return (
    <SafeAreaView style={Container} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={Colors.smoothGradient}
        style={Info}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={[Round, { overflow: "hidden" }]}>
          <Image
            source={require("../../../../assets/img/perfil.jpg")}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={H1}>João Silva</Text>
          <View style={Row}>
            <PerfilIcon color={Colors.darkblue} width={24} height={24} />
            <Text style={H4}>Técnico de Campo</Text>
          </View>
        </View>
      </LinearGradient>

      <MaskedView
        style={{ flex: 1 }}
        maskElement={
          <LinearGradient
            colors={["transparent", "black", "black", "transparent"]}
            locations={[0, 0.1, 0.975, 1]}
            style={{ flex: 1 }}
          />
        }
      >
        <ScrollView
          contentContainerStyle={[
            Column,
            Center,
            Scroll,
            { paddingTop: 10, paddingBottom: 30 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[Column, Card]}>
            <View style={[Icon, { backgroundColor: Colors.smoothBgc2 }]}>
              <DetalheIcon color={Colors.blue} />
            </View>
            <View>
              <Text style={P}>Visitas esse mês</Text>
              <Text style={H2}>42</Text>
            </View>
          </View>

          <View style={[Column, Card]}>
            <View style={[Icon, { backgroundColor: Colors.darkblue }]}>
              <VisitaIcon color={Colors.white} />
            </View>
            <View>
              <Text style={P}>Visitas hoje</Text>
              <Text style={H2}>3</Text>
            </View>
          </View>

          <View style={[Column, Card]}>
            <View style={[Icon, { backgroundColor: Colors.smoothBgc2 }]}>
              <RelogioIcon color={Colors.blue} />
            </View>
            <View>
              <Text style={P}>Pontualidade</Text>
              <Text style={H2}>98%</Text>
            </View>
          </View>

          <TouchableOpacity style={Box} activeOpacity={0.75}>
            <View style={Row}>
              <View style={[Icon, { backgroundColor: Colors.smoothBgc2 }]}>
                <PerfilIcon color={Colors.blue} width={24} height={24} />
              </View>
              <Text style={BtnText}>Dados Pessoais</Text>
            </View>
            <ArrowIcon color={Colors.darkblue} />
          </TouchableOpacity>

          <TouchableOpacity style={Box} activeOpacity={0.75}>
            <View style={Row}>
              <View style={[Icon, { backgroundColor: Colors.smoothBgc2 }]}>
                <AjudaIcon color={Colors.blue} />
              </View>
              <Text style={BtnText}>Ajuda e Suporte</Text>
            </View>
            <ArrowIcon color={Colors.darkblue} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              Btn2,
              Row,
              {
                backgroundColor: Colors.lightred,
                borderWidth: 2,
                borderColor: Colors.red,
              },
            ]}
            activeOpacity={0.75}
          >
            <SairIcon color={Colors.darkred} />
            <Text style={[BtnText, { color: Colors.darkred }]}>
              Sair da Conta
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </MaskedView>
    </SafeAreaView>
  );
}
