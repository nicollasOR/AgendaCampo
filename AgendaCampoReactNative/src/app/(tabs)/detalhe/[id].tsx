import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { listarVisitasID, visitaGet } from "@/src/service/visitaService";
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
} from "../../../constants/theme";
import CriarIcon from "../../../../assets/svg/CriarIcon.svg";
import LocalIcon from "../../../../assets/svg/LocalIcon.svg";
import EditarIcon from "../../../../assets/svg/EditarIcon.svg";
import PerfilIcon from "../../../../assets/svg/PerfilIcon.svg";
import NumeroIcon from "../../../../assets/svg/NumeroIcon.svg";
import DetalheIcon from "../../../../assets/svg/DetalheIcon.svg";
import CancelarIcon from "../../../../assets/svg/CancelarIcon.svg";
import DescricaoIcon from "../../../../assets/svg/DescricaoIcon.svg";
import { useEffect, useState } from "react";
import { listarVisitasID } from "../../api/visitaService";
import { useVisitaServiceDetalhe } from "../../hooks/useVisitaService";
import { visitaGet } from "../../@types";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Detalhe() {
  // const [visita, setVisita] = useState<visitaGet>();
  const { id } = useLocalSearchParams<{ id: string }>()
  // const {} useVisitaServiceDetalhe(id)
  const { visita, dataFinalFormatada, dataInicialFormatada } = useVisitaServiceDetalhe(id)


  return (
    <SafeAreaView style={[Container, { paddingTop: 0 }]} edges={["top", "left", "right"]}>
      <View style={Column}>
        <View style={Row}>
          <View style={Box}>
            <Text style={P}>ID: #VS-{visita?.visitaID} </Text>
          </View>
          <View style={Box}>
            <Text style={P}> {visita?.statusVisita}</Text>
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
              <Text style={[P, { color: Colors.gray }]}>{visita?.descricao}</Text>
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
                <Text style={H4}>{visita?.logradouro} </Text>
                {/* <Text style={P}>{Contato: Roberto Silva (Gerente)}</Text> */}
                {visita?.tecnicos.map((varAux) => (
                  <Text key={varAux.usuarioID} style={P}>{varAux.nome}</Text>
                ))}
                <View style={Row}>
                  <NumeroIcon />
                {visita?.tecnicos.map((varAux) => (
                  <Text key={varAux.usuarioID} style={P}>{varAux.telefone}</Text>
                ))}
                </View>
              </View>
            </View>

            <View style={[H3, { flexDirection: "column" }]}>
              <View style={[H3, Row]}>
                <LocalIcon />
                <Text style={[H4, { color: Colors.black }]}>Endereço</Text>
              </View>
              <Text style={P}>{visita?.logradouro} - {visita?.numero} - {visita?.bairro}</Text>
            </View>
          </View>
          <TouchableOpacity style={Btn}>
            <CriarIcon color={Colors.white} />
            <Text style={BtnText}> Iniciar Atendimento </Text>
          </TouchableOpacity>
          <View style={Line} />
          <View style={[Center, Card, Column]}>
            <Text style={P}>AÇÕES SECUNDÁRIAS</Text>
            <TouchableOpacity style={Btn}>
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
              <Text style={[P, { color: "black" }]}>{visita?.descricao}</Text>
              {/* <Text style={[P, { color: "black" }]}>{detalhes.desc2}</Text> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
