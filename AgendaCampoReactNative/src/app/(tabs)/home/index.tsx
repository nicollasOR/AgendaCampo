import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box2,
  Btn,
  BtnText,
  Colors,
  Column,
  Container,
  H2,
  P,
  Row,
  Scroll,
  SpaceBetween,
} from "@/src/constants/theme";

import AgendaCard from "@/src/components/agendaCard";
import CriarIcon from "@/assets/svg/CriarIcon.svg";
import VisitaIcon from "@/assets/svg/VisitaIcon.svg";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={Container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={Scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={Column}>
          <View>
            <Text style={[H2, { color: Colors.darkblue }]}>
              Olá, Técnico João
            </Text>
            <Text style={[P, { color: Colors.gray }]}>
              Aqui estão suas visitas programadas.
            </Text>
          </View>

          <View style={Column}>
            <View style={[Row, SpaceBetween]}>
              <View style={Row}>
                <VisitaIcon color={Colors.darkblue} />
                <Text style={[H2, { color: Colors.darkblue }]}>
                  Visitas Futuras
                </Text>
              </View>

              <View style={Box2}>
                <Text style={[P, { color: Colors.white }]}>2 Hoje</Text>
              </View>
            </View>
            <AgendaCard />
            <AgendaCard />
            <AgendaCard />
          </View>
        </View>
        <TouchableOpacity style={Btn}>
          <CriarIcon color={Colors.white} />
          <Text style={[BtnText, { color: Colors.white }]}>
            Agendar Nova Visita
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
