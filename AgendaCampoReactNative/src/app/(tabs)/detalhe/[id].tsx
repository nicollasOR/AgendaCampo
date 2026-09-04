import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Image, Text, View, TouchableOpacity } from "react-native";
import {
  Box,
  Btn,
  BtnText,
  Card,
  Center,
  Colors,
  Column,
  Container,
  H1,
  H2,
  H3,
  H4,
  Line,
  P,
  Row,
  Scroll,
} from "@/src/constants/theme";
import CriarIcon from "@/assets/svg/CriarIcon.svg";
import LocalIcon from "@/assets/svg/LocalIcon.svg";
import EditarIcon from "@/assets/svg/EditarIcon.svg";
import PerfilIcon from "@/assets/svg/PerfilIcon.svg";
import NumeroIcon from "@/assets/svg/NumeroIcon.svg";
import DetalheIcon from "@/assets/svg/DetalheIcon.svg";
import CancelarIcon from "@/assets/svg/CancelarIcon.svg";
import DescricaoIcon from "@/assets/svg/DescricaoIcon.svg";
import { useVisitaDetalhes } from "@/src/hooks/useVisitaDetalhe";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Detalhe() {
  // const [visita2, setVisita] = useState<visitaGet | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { visita, formatarData, remover } = useVisitaDetalhes(id);
  const router = useRouter();

  function dividirTextoNaMetade(texto2: string | undefined): [string, string] {
    const texto = String(texto2);
    const meio: number = Math.floor(texto.length / 2);

    // Encontra o primeiro espaço após o ponto médio
    let pontoDeCorte: number = texto.indexOf(" ", meio);

    // Se não encontrar espaço depois, usa a metade exata
    if (pontoDeCorte === -1) pontoDeCorte = meio;

    const parte1: string = texto.slice(0, pontoDeCorte).trim();
    const parte2: string = texto.slice(pontoDeCorte).trim();

    return [parte1, parte2];
  }

  // const partes = visita?.descricao.split(". ");
  // const primeiraFrase = partes.shift();

  // if (primeiraFrase !== undefined) {
  //   // Aqui dentro o TypeScript sabe que 'primeiraFrase' é estritamente 'string'
  //   minhaFuncao(primeiraFrase);
  // }

  //   const [primeiraParte, segundaParte] = dividirTextoNaMetade(visita?.descricao)

  // function dividirNome(nome:string) {
  //   if(client)
  //     for(let i = 0; i < name.length; i++)
  //   {
  //     i = nome.length[i]
  //   }
  // }

  return (
    <SafeAreaView
      style={[Container, { paddingTop: 0 }]}
      edges={["top", "left", "right"]}
    >
      <View style={Column}>
        <View style={Row}>
          <View style={Box}>
            <Text style={P}>ID: VS#-{visita?.visitaID}</Text>
          </View>
          <View style={Box}>
            <Text style={P}>{visita?.statusVisita}</Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={Scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={Column}>
            <Text style={[H1, { color: Colors.darkblue }]}>
              {visita?.nomeEvento}
            </Text>
            <View style={Row}>
              <DetalheIcon color={Colors.gray} />
              <Text style={[P, { color: Colors.gray }]}>
                {formatarData(visita?.dataInicio)}
              </Text>
            </View>
          </View>
          <View style={Line} />
          <View style={[Card, Column]}>
            <View style={Row}>
              <PerfilIcon color={Colors.darkblue} />
              <Text style={[H2, { color: Colors.darkblue }]}>
                Cliente e Local
              </Text>
            </View>
            <View style={Row}>
              <Image source={require("@/assets/img/logo.png")} />
              <View>
                {visita?.tecnicos?.map((varAux) => (
                  <View key={varAux.usuarioID}>
                    <Text style={H4}>{visita.nomeCliente}</Text>
                    <Text style={P}>Contato: {varAux.nome}</Text>
                    <View style={Row}>
                      <NumeroIcon />
                      <Text style={P}>Email: {varAux.email}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={[H3, { flexDirection: "column" }]}>
              <View style={[H3, Row]}>
                <LocalIcon />
                <Text style={[H4, { color: Colors.black }]}>Endereço</Text>
              </View>
              <Text style={P}>
                {visita?.logradouro} - {visita?.bairro} - {visita?.cep}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={Btn}>
            <CriarIcon color={Colors.white} />
            <Text style={BtnText}> Iniciar Atendimento </Text>
          </TouchableOpacity>
          <View style={Line} />
          <View style={[Center, Card, Column]}>
            <Text style={P}>AÇÕES SECUNDÁRIAS</Text>
            <TouchableOpacity
              style={Btn}
              onPress={() => router.replace("../reagendar/" + id)}
            >
              <EditarIcon color={Colors.white} />
              <Text style={[BtnText, { color: Colors.white }]}>Reagendar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Btn,
                {
                  backgroundColor: Colors.white,
                  borderColor: Colors.lightgray,
                  borderWidth: 2,
                },
              ]}
              onPress={remover}
            >
              <CancelarIcon color={Colors.darkgray} width={30} />
              <Text style={[BtnText, { color: Colors.darkgray }]}>
                Cancelar Visita
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[Card, Column]}>
            <View style={Row}>
              <DescricaoIcon color={Colors.darkblue} />
              <Text style={[H3, { color: Colors.darkblue }]}>
                Descrição do Problema
              </Text>
            </View>
            <View style={[Box, Column]}>
              <Text style={[P, { color: "black" }]}>
                {dividirTextoNaMetade(visita?.descricao)}{" "}
              </Text>
              <Text style={[P, { color: "black" }]}>
                {dividirTextoNaMetade(visita?.descricao)}{" "}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
