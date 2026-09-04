import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { useVisita } from "@/src/hooks/useVisita";
import { Text, View, FlatList } from "react-native";
import { useAuth } from "@/src/contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormatarPrimeiroEUltimoNome } from "@/src/utils/formatarNome";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

import {
  Box2,
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
import VisitaIcon from "@/assets/svg/VisitaIcon.svg";

export default function Home() {
  const { usuario } = useAuth();
  const { visita, visitaGet, listarFuturasVisitas } = useVisita();

  useFocusEffect(
    useCallback(() => {
      listarFuturasVisitas();
    }, []),
  );

  return (
    <SafeAreaView style={[Container]} edges={["top", "left", "right"]}>
      <View style={[Column, { alignSelf: "flex-start", width: "100%" }]}>
        <View>
          <Text style={[H2, { color: Colors.darkblue }]}>
            Olá,{" "}
            {usuario?.nome
              ? FormatarPrimeiroEUltimoNome(usuario.nome)
              : "Visitante"}
          </Text>
          <Text style={[P, { color: Colors.gray }]}>
            Aqui estão suas visitas programadas.
          </Text>
        </View>
        <View style={[Row, SpaceBetween]}>
          <View style={Row}>
            <VisitaIcon color={Colors.darkblue} />
            <Text style={[H2, { color: Colors.darkblue }]}>
              Visitas Futuras
            </Text>
          </View>

          <View style={Box2}>
            <Text style={[P, { color: Colors.white }]}>
              {visita?.length || 0} Hoje
            </Text>
          </View>
        </View>
      </View>

      <MaskedView
        style={{ flex: 1, width: "100%" }}
        maskElement={
          <LinearGradient
            colors={["transparent", "black", "black", "transparent"]}
            locations={[0, 0.1, 1, 1]}
            style={{ flex: 1 }}
          />
        }
      >
        <FlatList
          data={visitaGet}
          keyExtractor={(item) => String(item.visitaID)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Scroll}
          style={{ width: "100%" }}
          ListHeaderComponent={<View style={Column}></View>}
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
              descricao={item.descricao}
              nomeCliente={item.nomeCliente}
              cep={item.cep}
              tecnicos={[]}
            />
          )}
        />
      </MaskedView>
    </SafeAreaView>
  );
}
