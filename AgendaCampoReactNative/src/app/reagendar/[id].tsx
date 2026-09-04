import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  Box2,
  Box3,
  Btn,
  Btn2,
  BtnText,
  CampoInput,
  Card,
  CardFooter,
  CardInfo,
  Center,
  Colors,
  Column,
  Container,
  H1,
  H2,
  H3,
  H4,
  Input,
  InputIcon,
  Line,
  P,
  Row,
  Scroll,
  SpaceBetween,
} from "../../constants/theme";

import CalendarioIcon from "@/assets/svg/CalendarioIcon.svg";
import ConfirmarIcon from "@/assets/svg/ConfirmarIcon.svg";
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ReagendaCard from "@/src/components/reagendaCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useVisitaDetalhes } from "@/src/hooks/useVisitaDetalhe";
import ReagendarIcon from "@/assets/svg/CalendarioReagendarIcon.svg";

import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { formatacoes } from "@/src/utils/converterData";
import { visitaPatch } from "@/src/@types/visitas";

export default function Reagendar() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { visita, formatarData, remover, reagendar } = useVisitaDetalhes(id)
  const router = useRouter()
  const [data2, setData] = useState<visitaPatch>();
  const[teste, setTeste] = useState<Date>(new Date())
  const[dataInicial, setDataInicial] = useState<visitaPatch>()
  const[dataFinal, setDataFinal] = useState<visitaPatch>()
  const[showCalendar, setShowCalendar] = useState<boolean>(false)

  const[horarioInicial, setHorarioInicial] = useState<Date>(new Date())
  const[horarioFinal, setHorarioFinal] = useState<Date>(new Date())

  const calendarioInicial = (event: DateTimePickerEvent, dataSelecionada?: Date) => {
    
    if(Platform.OS ===`android`)
      setShowCalendar(false)

    
  }

  
  const dataValida = (value: string | Date): void => {
    let dataN = value.toString()
    let data = dataN.replace(/\D/g, "");

    // Limita a 8 números (dd/mm/aaaa)
    data = data.slice(0, 8);

    // Adiciona as barras automaticamente
    if (data.length > 4) {
      data = data.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
    } else if (data.length > 2) {
      data = data.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }

    
  };











  return (
    // style={[Container, {backgroundColor: Colors.gray}]}
    <SafeAreaView style={[Container]} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={Scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={[Column, { alignItems: "center" }]}>
          {/* <ReagendaCard statusVisita={String(visita?.statusVisita)} visitaID={Number(visita?.visitaID)} dataInicio={String(visita?.dataInicio)}  /> */}
          {/* Card do detalhe */}
          <View style={[CardInfo]}>
            <View style={{ padding: 20, gap: 10 }}>
              <Text style={[H2, { color: Colors.black }]}>{visita?.nomeEvento}</Text>
              <Text style={[P, { color: Colors.darkgray }]}>ID: #VS-{visita?.visitaID}</Text>
              <View style={[Row, {}]}>
                <ReagendarIcon color={Colors.gray} />
                <Text
                  style={[
                    P,
                    { color: Colors.gray, textDecorationLine: "line-through" },
                  ]}
                >
                  {formatacoes.formatarDataSemHoras(String(visita?.dataInicio))} - {formatacoes.formatarHora(String(visita?.dataInicio))}{" "}
                </Text>
              </View>
            </View>
          </View>
          <Text style={[H1]}>Período da Visita</Text>
          {/* Inputs */}
          <View style={[]}>
            <Text style={[H4]}>Início</Text>
            <View style={[Row]}>
              <View style={[CampoInput, { width: "48%" }]}>
                <TextInput
                  style={[Input, H4, { paddingLeft: "5%" }]}
                  value={String(dataFinal)}
                  placeholder="dd/mm/aaaa"
                  placeholderTextColor={"black"}
                  keyboardType="numeric"
                  // onChangeText={dataValida(String(data2))}
                  maxLength={10}
                />
                {/* <TouchableOpacity style={[InputIcon, {paddingLeft: 230 }]}  */}
                <TouchableOpacity
                  style={[InputIcon, { marginLeft: "80%" }]}
                //OnPress={()}
                >
                  <CalendarioIcon />
                </TouchableOpacity>
              </View>

              <TextInput
                style={[Input, { width: "48%", paddingLeft: "5%" }]}
                maxLength={5}
                keyboardType="numeric"
                value={String(horarioInicial)}
                // onChangeText={setHorarioInicial}
              />
            </View>
          </View>
          {/* Inputs Inferiores */}
          <View style={{ gap: 6 }}>
            <Text style={[H4]}>Término</Text>
            <View style={[Row]}>
              <View style={[CampoInput, { width: "48%" }]}>
                <TextInput
                  style={[Input, H4, { paddingLeft: "5%", width: "100%" }]}
                  value={String(dataFinal)}
                  // onChangeText={setDataFinal}
                  // placeholder="dd/mm/aaaa"
                  placeholderTextColor={"black"}
                  keyboardType="numeric"
                  // onChangeText={dataValida}
                  maxLength={10}
                />

                <TouchableOpacity
                  style={[InputIcon, { marginLeft: "80%" }]}
                //OnPress={()}
                >
                  <CalendarioIcon />
                </TouchableOpacity>
              </View>

              <TextInput
                style={[Input, { width: "48%", paddingLeft: "5%" }]}
                maxLength={5}
                value={String(horarioFinal)}
              />
            </View>
          </View>

          {/* Botoes */}

          <TouchableOpacity
            style={[Btn, { backgroundColor: Colors.blue, borderRadius: 15, alignItems: 'center', flexDirection: "row" }]}
            // onPress={reagendar(visita?.visitaID, (data2?.dataInicio, data2?.dataTermino))}
          >
            <ConfirmarIcon color={Colors.white} />
            <Text style={[BtnText, { color: Colors.white }]}>
              Confimar Reagendamento
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              Btn,
              //   Center,
              {
                backgroundColor: Colors.white,
                borderRadius: 15,
                borderColor: Colors.gray,
                borderWidth: 1,
                width: "100%",
                //   flexDirection: 'column',
              },
            ]}
          >
            <Text style={[H3, BtnText, { color: Colors.blue }]}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
