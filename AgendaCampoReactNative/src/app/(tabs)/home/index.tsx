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
import CriarIcon from "@/assets/svg/CriarIcon.svg";
import AgendaCard from "@/src/components/agendaCard";
import VisitaIcon from "@/assets/svg/VisitaIcon.svg";
import { useVisita } from "../../../hooks/useVisita";
import { useCallback } from "react";
import { useAuth } from "@/src/contexts/AuthContext";

export default function Home() {
  const {usuario} = useAuth();
  const{visita, listarFuturasVisitas} = useVisita();
  const router = useRouter();
console.log(visita)

  useFocusEffect(
    useCallback(() => {
      listarFuturasVisitas();
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
                <Text style={[P, { color: Colors.white }]}>{visita.length} Hoje</Text>
              </View>
            </View>
            {/* <FlatList
              style={[{gap: 15}]}
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
                  logradouro={item.logradouro}
                  bairro={item.bairro}
                  numero={item.numero}
                  nomeEvento={item.nomeEvento}
                />
              )}
            /> */}
            <View style={{ gap: 15 }}>
        {
        visita?.map((item) => (
          
          <AgendaCard 
            key={item.visitaID} 
            {...item} 
          />
        ))}
      </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
