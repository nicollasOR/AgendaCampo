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

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { formatacoes } from "@/src/utils/converterData";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useVisitaDetalhes } from "@/src/hooks/useVisitaDetalhe";

import { Colors, theme } from "@/src/constants/theme";

import RelogioIcon from "@/assets/svg/RelogioIcon.svg";
import ReagendarIcon from "@/assets/svg/EditarIcon.svg";
import ArrowBackIcon from "@/assets/svg/ArrowBackIcon.svg";
import ConfirmarIcon from "@/assets/svg/ConfirmarIcon.svg";
import CalendarioIcon from "@/assets/svg/CalendarioIcon.svg";

export default function Reagendar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { visita, reagendarHooks } = useVisitaDetalhes(id);

  // Estados de Data e Hora
  const [dataInicio, setDataInicio] = useState<Date>(new Date());
  const [dataTermino, setDataTermino] = useState<Date>(new Date());

  const [dataInicioTexto, setDataInicioTexto] = useState<string>("");
  const [horaInicioTexto, setHoraInicioTexto] = useState<string>("");
  const [dataTerminoTexto, setDataTerminoTexto] = useState<string>("");
  const [horaTerminoTexto, setHoraTerminoTexto] = useState<string>("");

  // Controles de visibilidade do DateTimePicker
  const [showPickerInicio, setShowPickerInicio] = useState(false);
  const [showPickerTermino, setShowPickerTermino] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");
  const [tipoPickerRelogio, settipoPickerRelogio] = useState<
    "inicio" | "termino"
  >("inicio");

  // Sincronizar os dois tipos (tanto texto quanto o picker)
  useEffect(() => {
    setDataInicioTexto(dataInicio.toLocaleDateString("pt-BR"));
    setHoraInicioTexto(
      dataInicio.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, [dataInicio]);

  useEffect(() => {
    setDataTerminoTexto(dataTermino.toLocaleDateString("pt-BR"));
    setHoraTerminoTexto(
      dataTermino.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, [dataTermino]);

  // Aplica máscara de data
  const aplicarMascaraData = (val: string) => {
    const limpo = val.replace(/\D/g, "").slice(0, 8);
    if (limpo.length >= 5) {
      return `${limpo.slice(0, 2)}/${limpo.slice(2, 4)}/${limpo.slice(4)}`;
    } else if (limpo.length >= 3) {
      return `${limpo.slice(0, 2)}/${limpo.slice(2)}`;
    }
    return limpo;
  };

  // Aplica máscara de hora
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
    setTargetDate: (d: Date) => void,
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
        if (mode === "date") {
          novaData.setFullYear(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
          );
        } else {
          novaData.setHours(
            selectedDate.getHours(),
            selectedDate.getMinutes(),
            0,
            0,
          );
        }
        setDataInicio(novaData);
      } else {
        const novaData = new Date(dataTermino);
        if (mode === "date") {
          novaData.setFullYear(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
          );
        } else {
          novaData.setHours(
            selectedDate.getHours(),
            selectedDate.getMinutes(),
            0,
            0,
          );
        }

        if (novaData < dataInicio) {
          Alert.alert(
            "Atenção",
            "A data/hora final não pode ser anterior ao início.",
          );
          return;
        }
        setDataTermino(novaData);
      }
    }
  };

  const abrirPicker = (
    field: "inicio" | "termino",
    tipoPicker: "date" | "time",
  ) => {
    settipoPickerRelogio(field);
    setMode(tipoPicker);
    if (field === "inicio") setShowPickerInicio(true);
    else setShowPickerTermino(true);
  };

  async function reagendarHorario() {
    if (dataTermino < dataInicio) {
      Alert.alert(
        "Erro",
        "A data/hora de término deve ser posterior ao início.",
      );
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
    <SafeAreaView style={theme.container}>
      <View style={[theme.column, theme.center, { width: "100%" }]}>
        <View style={theme.cardInfo}>
          <View style={[theme.card, theme.list]}>
            <Text style={[theme.h2, { color: Colors.black }]}>
              {visita?.nomeEvento}
            </Text>
            <Text style={[theme.p, { color: Colors.darkgray }]}>
              ID: #VS-{visita?.visitaID}
            </Text>
            <View style={theme.row}>
              <ReagendarIcon color={Colors.gray} />
              <Text
                style={[
                  theme.p,
                  { color: Colors.gray, textDecorationLine: "line-through" },
                ]}
              >
                {formatacoes.formatarDataSemHoras(String(visita?.dataInicio))} -{" "}
                {formatacoes.formatarHora(String(visita?.dataInicio))}
              </Text>
            </View>
          </View>
        </View>

        <Text style={theme.h1}>Período da Visita</Text>

        <View>
          <Text style={theme.h4}>Início</Text>
          <View style={[theme.row, theme.spaceBetween]}>
            <View style={[theme.campoInput, { width: "60%" }]}>
              <TextInput
                style={[theme.input, theme.h4]}
                placeholder="Dd/Mm/aaaa"
                keyboardType="numeric"
                value={dataInicioTexto}
                onChangeText={(valorAux) => {
                  const formatado = aplicarMascaraData(valorAux);
                  setDataInicioTexto(formatado);
                  atualizarDataPorTexto(
                    formatado,
                    horaInicioTexto,
                    setDataInicio,
                  );
                }}
              />
              <TouchableOpacity
                style={[theme.inputIcon]}
                onPress={() => abrirPicker("inicio", "date")}
              >
                <CalendarioIcon />
              </TouchableOpacity>
            </View>

            <View style={[theme.campoInput, { width: "35%" }]}>
              <TextInput
                style={[theme.input, theme.h4]}
                placeholder="Hh:Mm"
                keyboardType="numeric"
                value={horaInicioTexto}
                onChangeText={(valorAux) => {
                  const formatado = aplicarMascaraHora(valorAux);
                  setHoraInicioTexto(formatado);
                  atualizarDataPorTexto(
                    dataInicioTexto,
                    formatado,
                    setDataInicio,
                  );
                }}
              />
              <TouchableOpacity
                style={[theme.inputIcon]}
                onPress={() => abrirPicker("inicio", "time")}
              >
                <RelogioIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <Text style={theme.h4}>Término</Text>
          <View style={[theme.row, theme.spaceBetween]}>
            <View style={[theme.campoInput, { width: "60%" }]}>
              <TextInput
                style={[theme.input, theme.h4]}
                placeholder="Dd/Mm/aaaa"
                keyboardType="numeric"
                value={dataTerminoTexto}
                onChangeText={(valorAux) => {
                  const formatado = aplicarMascaraData(valorAux);
                  setDataTerminoTexto(formatado);
                  atualizarDataPorTexto(
                    formatado,
                    horaTerminoTexto,
                    setDataTermino,
                  );
                }}
              />
              <TouchableOpacity
                style={[theme.inputIcon]}
                onPress={() => abrirPicker("termino", "date")}
              >
                <CalendarioIcon />
              </TouchableOpacity>
            </View>

            <View style={[theme.campoInput, { width: "35%" }]}>
              <TextInput
                style={[theme.input, theme.h4]}
                placeholder="Hh:Mm"
                keyboardType="numeric"
                value={horaTerminoTexto}
                onChangeText={(valorAux) => {
                  const formatado = aplicarMascaraHora(valorAux);
                  setHoraTerminoTexto(formatado);
                  atualizarDataPorTexto(
                    dataTerminoTexto,
                    formatado,
                    setDataTermino,
                  );
                }}
              />
              <TouchableOpacity
                style={theme.inputIcon}
                onPress={() => abrirPicker("termino", "time")}
              >
                <RelogioIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {(showPickerInicio || showPickerTermino) && (
          <DateTimePicker
            value={tipoPickerRelogio === "inicio" ? dataInicio : dataTermino}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangePicker}
          />
        )}

        <TouchableOpacity style={theme.btn} onPress={reagendarHorario}>
          <ConfirmarIcon color={Colors.white} />
          <Text style={[theme.btnText, { color: Colors.white }]}>
            Confirmar Reagendamento
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[theme.btn2, { borderWidth: 2, borderColor: Colors.btn }]}
          onPress={() => {
            if (router.canGoBack()) {
              router.replace("/(tabs)/home");
            } else {
              router.replace("/detalhe");
            }
          }}
        >
          <ArrowBackIcon color={Colors.blue} />
          <Text style={[theme.btnText, { color: Colors.blue }]}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
