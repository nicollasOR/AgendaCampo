import { useFocusEffect, useRouter } from "expo-router";
import { FlatList, ScrollView } from "react-native";
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
import { useVisita } from "../../hooks/useVisita";
import { useCallback } from "react";
import { useAuth } from "@/src/contexts/AuthContext";

export default function Home() {
  const {usuario} = useAuth();
  const{visita, listarVisita} = useVisita();
  const router = useRouter();


  useFocusEffect(
    useCallback(() => {
      listarVisita();
    }, [])
  );

  return (
    <SafeAreaView style={Container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={Scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={Column}>
          <View>
            <Text style={[H2, { color: Colors.darkblue }]}>
              Olá, Técnico {usuario?.nome}
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
            <FlatList
              data={visita}
              keyExtractor={(item) => String(item.visitaID)}
              // keyExtractor={(item: OrdemServico) => String(item.osId)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <AgendaCard
                  visitaID={item.visitaID}
                  statusVisita={item.statusVisita}
                  dataInicio={item.dataInicio}
                  dataTermino={item.dataTermino}
                  logradouroEndereco={item.logradouroEndereco}
                  nomeEvento={item.nomeEvento}
                />
              )}
            />
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
