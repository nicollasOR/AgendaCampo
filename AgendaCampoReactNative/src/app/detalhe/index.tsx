import { ScrollView, Image, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
} from "../../constants/theme";
import DetalheIcon from "../../../assets/svg/DetalheIcon.svg";
import PerfilIcon from "../../../assets/svg/PerfilIcon.svg";
import CriarIcon from "../../../assets/svg/CriarIcon.svg";
import EditarIcon from "../../../assets/svg/EditarIcon.svg";
import CancelarIcon from "../../../assets/svg/CancelarIcon.svg";
import { Phone, MapPin, FileText } from "lucide-react-native";
import { useEffect, useState } from "react";
import { listarVisitasID, visitaGet } from "../api/visitaService";

export default function Detalhe() {
  const [visita, setVisita] = useState<visitaGet>();
  let visitaID: number = 2;

  async function buscarVisitaID() {
    try {
      const response = await listarVisitasID(Number(visitaID));
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

  const detalhes = {
    id: "ID: #VS-2023-084",
    statusAgenda: "Agendada",
    titulo: "Manutenção Preventiva - Trator John Deere",
    data: "24 de Outubro, 2023 • 08:00 - 12:00",
    descricao:
      "Trator apresentando falha na injeção eletrônica de combustível. Perda de potência durante operação com carga pesada. ",
    desc2:
      "- Equipamento: Trator John Deere 8R - Horímetro: 4.520hrs - Obs: Levar scanner de diagnóstico e filtro de combustível sobressalente. ",
    endereco: "Rodovia BR-163, Km 45, Zona Rural Sorriso - MT, 78890-000",
  };

  const client = {
    nome: `Fazenda São João`,
  };

  // function dividirNome(nome:string) {
  //   if(client)
  //     for(let i = 0; i < name.length; i++)
  //   {
  //     i = nome.length[i]
  //   }
  // }

  return (
    <SafeAreaView style={[Container]}>
      <View style={[Column]}>
        <View style={[Row]}>
          <View style={[Box]}>
            <Text style={[P]}>{detalhes.id}</Text>
          </View>
          <View style={[Box]}>
            <Text style={[P]}>{detalhes.statusAgenda}</Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={[Scroll]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[Column]}>
            <Text style={[H1, { color: Colors.darkblue }]}>
              {detalhes.titulo}
            </Text>
            <View style={[Row]}>
              <DetalheIcon color={Colors.gray} />
              <Text style={[P, { color: Colors.gray }]}>{detalhes.data}</Text>
            </View>
          </View>
          <View style={[Line]} />
          <View style={[Card, Column]}>
            <View style={[Row]}>
              <PerfilIcon color={Colors.darkblue} />
              <Text style={[H2, { color: Colors.darkblue }]}>
                Cliente e Local
              </Text>
            </View>
            <View style={[Row]}>
              <Image source={require("../../../assets/img/logo.png")} />
              <View>
                <Text style={[H4]}>Fazenda São João </Text>
                <Text style={[P]}>Contato: Roberto Silva (Gerente)</Text>
                <View style={[Row]}>
                  <Phone size={16} />
                  <Text style={[P]}>(11) 98765-4321</Text>
                </View>
              </View>
            </View>

            <View style={[H3, { flexDirection: "column" }]}>
              <View style={[H3, Row]}>
                <MapPin />
                <Text style={[H4, { color: Colors.black }]}>Endereço</Text>
              </View>
              <Text style={[P]}>{detalhes.endereco}</Text>
            </View>
          </View>
          <TouchableOpacity style={[Btn]}>
            <CriarIcon color={Colors.white} />
            <Text style={[BtnText]}> Iniciar Atendimento </Text>
          </TouchableOpacity>
          <View style={[Line]} />
          <View style={[Center, Card, Column]}>
            <Text style={[P]}>AÇÕES SECUNDÁRIAS</Text>
            <TouchableOpacity
              style={[
                Btn,
                {
                  borderColor: Colors.txtBlue,
                  borderWidth: 2,
                },
              ]}
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
            >
              <CancelarIcon color={Colors.darkgray} width={30} />
              <Text style={[BtnText, { color: Colors.darkgray }]}>
                Cancelar Visita
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[Card, Column]}>
            <View style={[Row]}>
              <FileText color={Colors.darkblue} size={28} />
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
