import React, { useState, useEffect } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import { useVisitaDetalhes } from "@/src/hooks/useVisitaDetalhe";
import { formatacoes } from "@/src/utils/converterData";
import {
  Btn,
  BtnText,
  CampoInput,
  CardInfo,
  Colors,
  Column,
  Container,
  H1,
  H2,
  H4,
  Input,
  InputIcon,
  P,
  Row,
  Scroll,
} from "@/src/constants/theme";

import CalendarioIcon from "@/assets/svg/CalendarioIcon.svg";
import ConfirmarIcon from "@/assets/svg/ConfirmarIcon.svg";
import ReagendarIcon from "@/assets/svg/EditarIcon.svg";
import RelogioIcon from "@/assets/svg/RelogioIcon.svg";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Reagendar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { visita, reagendarHooks } = useVisitaDetalhes(id);

  // Estados de Data e Hora
  const [dataInicio, setDataInicio] = useState<Date>(new Date());
  const [dataTermino, setDataTermino] = useState<Date>(new Date());

  
  const [dataInicioTexto, setDataInicioTexto] = useState  <string>("");
  const [horaInicioTexto, setHoraInicioTexto] = useState  <string>(""); // string ne
  const [dataTerminoTexto, setDataTerminoTexto] = useState<string>("");
  const [horaTerminoTexto, setHoraTerminoTexto] = useState<string>("");

  // Controles de visibilidade do DateTimePicker (obrigado mayara)
  const [showPickerInicio, setShowPickerInicio] = useState(false);
  const [showPickerTermino, setShowPickerTermino] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");
  const [tipoPickerRelogio, settipoPickerRelogio] = useState<"inicio" | "termino">("inicio");

  // sincronizar os dois tipos (tanto texto quanto o picker)
  useEffect(() => {
    setDataInicioTexto(dataInicio.toLocaleDateString("pt-BR"));
    setHoraInicioTexto(
      dataInicio.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    );
  }, [dataInicio]);

  useEffect(() => {
    setDataTerminoTexto(dataTermino.toLocaleDateString("pt-BR"));
    setHoraTerminoTexto(
      dataTermino.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    );
  }, [dataTermino]);

  // Aplica máscara de data (junto do keyboard type (que nao funciona tao bem assim))
  const aplicarMascaraData = (val: string) => {
    const limpo = val.replace(/\D/g, "").slice(0, 8);
    if (limpo.length >= 5) {
      return `${limpo.slice(0, 2)}/${limpo.slice(2, 4)}/${limpo.slice(4)}`;
    } else if (limpo.length >= 3) {
      return `${limpo.slice(0, 2)}/${limpo.slice(2)}`;
    }
    return limpo;
  };

  // mesma coisa (agora eh hora)
  const aplicarMascaraHora = (val: string) => {
    const limpo = val.replace(/\D/g, "").slice(0, 4);
    if (limpo.length >= 3) {
      return `${limpo.slice(0, 2)}:${limpo.slice(2)}`;
    }
    return limpo;
  };

  // Atualiza a Date correspondente quando o usuário terminar de digitar
  const atualizarDataPorTexto = (
    textoData: string,
    textoHora: string,
    setTargetDate: (d: Date) => void
  ) => {
    const [dia, mes, ano] = textoData.split("/").map(Number);
    const [hora, minuto] = textoHora.split(":").map(Number);

    if (dia && mes && ano && ano > 1900) {
      const novaData = new Date(ano, mes - 1, dia, hora || 0, minuto || 0);
      if (!isNaN(novaData.getTime())) {
        setTargetDate(novaData);
      }
    }
  };

  const onChangePicker = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPickerInicio(false);
      setShowPickerTermino(false);
    }

    if (event.type === "set" && selectedDate) {
      if (tipoPickerRelogio === "inicio") {
        const novaData = new Date(dataInicio);
        if (mode === "date") 
          {
          novaData.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        } else 
          {
          novaData.setHours(selectedDate.getHours(), selectedDate.getMinutes(), 0, 0);
        }
        setDataInicio(novaData);
      } else {
        const novaData = new Date(dataTermino);
        if (mode === "date") {
          novaData.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        } else {
          novaData.setHours(selectedDate.getHours(), selectedDate.getMinutes(), 0, 0);
        }

        if (novaData < dataInicio) {
          Alert.alert("Atenção", "A data/hora final não pode ser anterior ao início.");
          return;
        }
        setDataTermino(novaData);
      }
    }
  };

  const abrirPicker = (field: "inicio" | "termino", tipoPicker: "date" | "time") => {
    settipoPickerRelogio(field);
    setMode(tipoPicker);
    if (field === "inicio") setShowPickerInicio(true);
    else setShowPickerTermino(true);
  };

  async function reagendarHorario() {
    if (dataTermino < dataInicio) {
      Alert.alert("Erro", "A data/hora de término deve ser posterior ao início.");
      return;
    }

    const sucesso = await reagendarHooks(dataInicio, dataTermino);
    if (sucesso) {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/");
      }
    }
  }

  return (
    <SafeAreaView style={[Container]} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={Scroll} showsVerticalScrollIndicator={false}>
        <View style={[Column, { alignItems: "center", gap: 40 }]}>
          
          {/* Card Info */}
          <View style={[CardInfo]}>
            <View style={{ padding: 15, gap: 10, width: 350 }}>
              <Text style={[H2, { color: Colors.black }]}>{visita?.nomeEvento}</Text>
              <Text style={[P, { color: Colors.darkgray }]}>ID: #VS-{visita?.visitaID}</Text>
              <View style={[Row]}>
                <ReagendarIcon color={Colors.gray} />
                <Text style={[P, { color: Colors.gray, textDecorationLine: "line-through" }]}>
                  {formatacoes.formatarDataSemHoras(String(visita?.dataInicio))} -{" "}
                  {formatacoes.formatarHora(String(visita?.dataInicio))}
                </Text>
              </View>
            </View>
          </View>

          <Text style={[H1]}>Período da Visita</Text>

          {/* Seleção Início */}
          <View style={{ width: "100%", gap: 10 }}>
            <Text style={[H4]}>Início</Text>
            <View style={[Row, { gap: 5}]}>
              {/* Input de Data de Início */}
              <View style={[CampoInput, { width: "50%"
                // , flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 
                }]}>
                  {/*  */}
                <TextInput
                  style={[Input, H4, { backgroundColor: 'transparent', paddingLeft: 20 }]}
                  placeholder="Dd/Mm/aaaa"
                  keyboardType="numeric"
                  value={dataInicioTexto}
                  onChangeText={(valorAux) => {
                    const formatado = aplicarMascaraData(valorAux);
                    setDataInicioTexto(formatado);
                    atualizarDataPorTexto(formatado, horaInicioTexto, setDataInicio);
                  }}
                />
                <TouchableOpacity style={[InputIcon, {marginLeft: 120, paddingBottom: 3}]} onPress={() => abrirPicker("inicio", "date")}>
                  <CalendarioIcon />
                </TouchableOpacity>
              </View>

              {/* Input de Hora de Início */}
              <View style={[CampoInput, { width: "44%" }]}>
                <TextInput
                  style={[Input, H4, { backgroundColor: 'transparent', flex: 1, textAlign: 'center', paddingLeft: 0 }]}
                  placeholder="Hh:Mm"
                  keyboardType="numeric"
                  value={horaInicioTexto}
                  onChangeText={(valorAux) => {
                    const formatado = aplicarMascaraHora(valorAux);
                    setHoraInicioTexto(formatado);
                    atualizarDataPorTexto(dataInicioTexto, formatado, setDataInicio);
                  }}
                />
                <TouchableOpacity style={[InputIcon, {marginLeft: 100, paddingBottom: 3}]} onPress={() => abrirPicker("inicio", "time")}>
                  <RelogioIcon /> {/* questionável */}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Seleção Término */}
          <View style={{ width: "100%", gap: 10 }}>
            <Text style={[H4]}>Término</Text>
            <View style={[Row, {gap: 5}]}>
              {/* Input de Data de Término */}
              <View style={[CampoInput, { width: "50%" , 
                // flexDirection: "row", alignItems: "center", 
                // justifyContent: "space-between", paddingHorizontal: 1 
                }]}>
                <TextInput
                  style={[Input, H4, { backgroundColor: 'transparent', paddingLeft: 20 }]}
                  placeholder="Dd/Mm/aaaa"
                  keyboardType="numeric"
                  value={dataTerminoTexto}
                  onChangeText={(valorAux) => {
                    const formatado = aplicarMascaraData(valorAux);
                    setDataTerminoTexto(formatado);
                    atualizarDataPorTexto(formatado, horaTerminoTexto, setDataTermino);
                  }}
                />
                <TouchableOpacity style={[InputIcon, {marginLeft: 120, paddingBottom: 3}]} onPress={() => abrirPicker("termino", "date")}>
                  <CalendarioIcon />
                </TouchableOpacity>
              </View>

              {/* Input de Hora de Término */}
              <View style={[CampoInput, { width: "44%"
                , flexDirection: "row", alignItems: "center", 
                // paddingHorizontal: 10 
                }]}>
                <TextInput
                  style={[Input, H4, { flex: 1, textAlign: 'center', paddingLeft: 0 }]}
                  placeholder="Hh:Mm"
                  keyboardType="numeric"
                  value={horaTerminoTexto}
                  onChangeText={(valorAux) => {
                    const formatado = aplicarMascaraHora(valorAux);
                    setHoraTerminoTexto(formatado);
                    atualizarDataPorTexto(dataTerminoTexto, formatado, setDataTermino);
                  }}
                />
                  <TouchableOpacity style={[InputIcon, {marginLeft: 100, paddingBottom: 3}]} onPress={() => abrirPicker("termino", "time")}>
                  <RelogioIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* DateTimePickers */}
          {(showPickerInicio || showPickerTermino) && (
            <DateTimePicker
              value={tipoPickerRelogio === "inicio" ? dataInicio : dataTermino}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChangePicker}
            />
          )}

          {/* Botões */}
          <TouchableOpacity
            style={[
              Btn,
              {
                backgroundColor: Colors.blue,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                width: 320,
              },
            ]}
            onPress={reagendarHorario}
          >
            <ConfirmarIcon color={Colors.white} />
            <Text style={[BtnText, { color: Colors.white }]}>Confirmar Reagendamento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              Btn,
              {
                backgroundColor: Colors.white,
                borderRadius: 15,
                borderColor: Colors.gray,
                borderWidth: 1,
                width: 200,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
            onPress={() => {
              //transforma em booleano se pode voltar para a tela anterior (algo bem interessante eu diria)
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/detalhe");
              }
            }}  
          >
            <Text style={[BtnText, { color: Colors.blue }]}>Voltar</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}