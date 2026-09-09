import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useVisitaDetalhes } from "@/src/hooks/useVisitaDetalhe";

import { Colors, theme } from "@/src/constants/theme";

import LocalIcon from "@/assets/svg/LocalIcon.svg";
import EditarIcon from "@/assets/svg/EditarIcon.svg";
import NumeroIcon from "@/assets/svg/NumeroIcon.svg";
import PerfilIcon from "@/assets/svg/PerfilIcon.svg";
import DetalheIcon from "@/assets/svg/DetalheIcon.svg";
import CancelarIcon from "@/assets/svg/CancelarIcon.svg";
import DescricaoIcon from "@/assets/svg/DescricaoIcon.svg";

export default function Detalhe() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { visita, formatarData, remover } = useVisitaDetalhes(id);
  const router = useRouter();

  function dividirTextoNaMetade(texto2: string | undefined): [string, string] {
    const texto = String(texto2 || "");
    const meio: number = Math.floor(texto.length / 2);

    let pontoDeCorte: number = texto.indexOf(" ", meio);
    if (pontoDeCorte === -1) pontoDeCorte = meio;

    const parte1: string = texto.slice(0, pontoDeCorte).trim();
    const parte2: string = texto.slice(pontoDeCorte).trim();

    return [parte1, parte2];
  }

  const [primeiraParte, segundaParte] = dividirTextoNaMetade(visita?.descricao);

  return (
    <SafeAreaView
      style={[theme.container, { paddingTop: 0 }]}
      edges={["top", "left", "right"]}
    >
      <View style={theme.column}>
        <View style={theme.row}>
          <View style={theme.box}>
            <Text style={[theme.p, { color: Colors.btn }]}>
              ID: VS#-{visita?.visitaID}
            </Text>
          </View>
          <View style={theme.box}>
            <Text style={[theme.p, { color: Colors.btn }]}>
              {visita?.statusVisita}
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={theme.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={theme.column}>
            <Text style={[theme.h1, { color: Colors.darkblue }]}>
              {visita?.nomeEvento}
            </Text>
            <View style={theme.row}>
              <DetalheIcon color={Colors.gray} />
              <Text style={[theme.p, { color: Colors.gray }]}>
                {formatarData(visita?.dataInicio)}
              </Text>
            </View>
          </View>

          <View style={theme.line} />

          <View style={[theme.card, theme.column]}>
            <View style={theme.row}>
              <PerfilIcon color={Colors.darkblue} />
              <Text style={[theme.h2, { color: Colors.darkblue }]}>
                Cliente e Local
              </Text>
            </View>

            <View style={theme.row}>
              <Image source={require("@/assets/img/logo.png")} />
              <View>
                {visita?.tecnicos?.map((varAux) => (
                  <View key={varAux.usuarioID}>
                    <Text style={theme.h4}>{visita.nomeCliente}</Text>
                    <Text style={theme.p}>Contato: {varAux.nome}</Text>
                    <View style={theme.row}>
                      <NumeroIcon />
                      <Text style={theme.p}>Email: {varAux.email}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={[theme.h3, { flexDirection: "column" }]}>
              <View style={[theme.h3, theme.row]}>
                <LocalIcon />
                <Text style={[theme.h4, { color: Colors.black }]}>
                  Endereço
                </Text>
              </View>
              <Text style={theme.p}>
                {visita?.logradouro} - {visita?.bairro} - {visita?.cep}
              </Text>
            </View>
          </View>

          <View style={theme.line} />

          <View style={[theme.center, theme.card, theme.column]}>
            <Text style={theme.p}>AÇÕES SECUNDÁRIAS</Text>

            <TouchableOpacity
              style={theme.btn}
              onPress={() => router.replace("/reagendar/" + id)}
            >
              <EditarIcon color={Colors.white} />
              <Text style={[theme.btnText, { color: Colors.white }]}>
                Reagendar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                theme.btn,
                {
                  backgroundColor: Colors.white,
                  borderColor: Colors.gray,
                  borderWidth: 2,
                },
              ]}
              onPress={async () => {
                await remover();
                router.replace("/(tabs)/home");
              }}
            >
              <CancelarIcon color={Colors.gray} width={30} />
              <Text style={[theme.btnText, { color: Colors.gray }]}>
                Cancelar Visita
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[theme.card, theme.column]}>
            <View style={theme.row}>
              <DescricaoIcon color={Colors.darkblue} />
              <Text style={[theme.h3, { color: Colors.darkblue }]}>
                Descrição
              </Text>
            </View>

            <View style={[theme.box, theme.column]}>
              <Text style={[theme.p, { color: Colors.black }]}>
                {primeiraParte}
              </Text>
              {segundaParte ? (
                <Text style={[theme.p, { color: Colors.black }]}>
                  {segundaParte}
                </Text>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
