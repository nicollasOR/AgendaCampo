import { useCallback, useMemo } from "react";
import { FlatList, Text, View } from "react-native";

import { useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import MaskedView from "@react-native-masked-view/masked-view";

import { useVisita } from "@/src/hooks/useVisita";
import { useAuth } from "@/src/contexts/AuthContext";
import { FormatarPrimeiroEUltimoNome } from "@/src/utils/formatarNome";

import { Colors, theme } from "@/src/constants/theme";

import AgendaCard from "@/src/components/agendaCard";

import VisitaIcon from "@/assets/svg/VisitaIcon.svg";

export default function Home() {
  const { usuario } = useAuth();
  const { visitaGet, listarFuturasVisitas } = useVisita();

  const visitasHoje = useMemo(() => {
    const hoje = new Date();
    const diaHj = String(hoje.getDate()).padStart(2, "0");
    const mesHj = String(hoje.getMonth() + 1).padStart(2, "0");
    const anoHj = hoje.getFullYear();

    const hojeFormatado = `${diaHj}/${mesHj}/${anoHj}`;

    const vstBancoHoje = visitaGet.filter((varAux) => {
      if (!varAux.dataInicio) return false;

      const partesData = String(varAux.dataInicio).split("T")[0].split("-");
      if (partesData.length < 3) return false;

      const anoBanco = partesData[0];
      const mesBanco = partesData[1];
      const diaBanco = partesData[2];

      const dataBancoFormatada = `${diaBanco}/${mesBanco}/${anoBanco}`;
      return dataBancoFormatada === hojeFormatado;
    });

    return vstBancoHoje.length;
  }, [visitaGet]);

  useFocusEffect(
    useCallback(() => {
      listarFuturasVisitas();
    }, []),
  );

  return (
    <SafeAreaView style={theme.container} edges={["top", "left", "right"]}>
      <View style={[theme.column, { alignSelf: "flex-start", width: "100%" }]}>
        <View>
          <Text style={[theme.h2, { color: Colors.darkblue }]}>
            Olá,{" "}
            {usuario?.nome
              ? FormatarPrimeiroEUltimoNome(usuario.nome)
              : "Visitante"}
          </Text>
          <Text style={[theme.p, { color: Colors.gray }]}>
            Aqui estão suas visitas programadas.
          </Text>
        </View>

        <View style={[theme.row, theme.spaceBetween]}>
          <View style={theme.row}>
            <VisitaIcon color={Colors.darkblue} />
            <Text style={[theme.h2, { color: Colors.darkblue }]}>
              Visitas Futuras
            </Text>
          </View>

          <View style={theme.box}>
            <Text style={[theme.p, { color: Colors.blue }]}>
              {visitasHoje == 0 ? "Nada hoje" : `${visitasHoje} Hoje`}
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
          contentContainerStyle={theme.scroll}
          style={{ width: "100%" }}
          ListHeaderComponent={<View style={theme.column} />}
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
