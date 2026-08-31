import React from "react"
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
  const [visita, setVisita] = useState<visitaGet>();
  
  async function buscarVisitaID() {
    try {
      const response = await listarVisitasID(Number(visita?.visitaID));
      setVisita(response.data);
    } catch (error: any) {
      return error.response.data;
    }
  }

  useEffect(() => {
    setTimeout(() => {
      buscarVisitaID();
    }, 1000);
  }, []);

 const {id} = useLocalSearchParams<{id: number}>()

  // function dividirNome(nome:string) {
  //   if(client)
  //     for(let i = 0; i < name.length; i++)
  //   {
  //     i = nome.length[i]
  //   }
  // }

  return (
    <SafeAreaView style={[Container , {paddingTop: 0}]} edges={["top", "left", "right"]}>
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
              {detalhes.titulo}
            </Text>
            <View style={Row}>
              <DetalheIcon color={Colors.gray} />
              <Text style={[P, { color: Colors.gray }]}>{detalhes.data}</Text>
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
              <Image source={require("../../../../assets/img/logo.png")} />
              <View>
                <Text style={H4}>Fazenda São João </Text>
                <Text style={P}>Contato: Roberto Silva (Gerente)</Text>
                <View style={Row}>
                  <NumeroIcon />
                  <Text style={P}>(11) 98765-4321</Text>
                </View>
              </View>
            </View>

            <View style={[H3, { flexDirection: "column" }]}>
              <View style={[H3, Row]}>
                <LocalIcon />
                <Text style={[H4, { color: Colors.black }]}>Endereço</Text>
              </View>
              <Text style={P}>{detalhes.endereco}</Text>
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
              <Text style={[P, { color: "black" }]}>{detalhes.descricao}</Text>
              <Text style={[P, { color: "black" }]}>{detalhes.desc2}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
