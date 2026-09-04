import * as Calendar from "expo-calendar";
import { Alert, Platform } from "react-native";

async function obterIdCalendarioPadrao(): Promise<string | null> {
  // Solicita permissão para o calendário
  const { status } = await Calendar.requestCalendarPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permissão Negada",
      "É necessária a permissão para acessar o calendário e agendar a visita.",
    );
    return null;
  }

  if (Platform.OS === "ios") {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.id;
  } else {
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT,
    );

    // 1. Tenta achar o calendário primário (geralmente a conta Google no dispositivo)
    // 2. Se não achar, busca um calendário que permita modificação (comum em emuladores)
    const primaryCalendar =
      calendars.find((cal) => cal.isPrimary) ||
      calendars.find((cal) => cal.allowsModifications) ||
      calendars[0];

    if (!primaryCalendar) {
      Alert.alert(
        "Atenção",
        "Nenhum calendário encontrado no dispositivo para salvar o evento.",
      );
      return null;
    }

    return primaryCalendar.id;
  }
}

// Função para adicionar o evento ao calendário do celular
export async function salvarVisitaNoCalendarioNativo(dados: {
  titulo: string;
  descricao: string;
  localizacao: string;
  dataInicial: Date;
  horario: Date;
}) {
  try {
    const calendarId = await obterIdCalendarioPadrao();
    if (!calendarId) return;

    // Combinar a Data Inicial com o Horário selecionado
    const dataInicioComHorario = new Date(dados.dataInicial);
    dataInicioComHorario.setHours(
      dados.horario.getHours(),
      dados.horario.getMinutes(),
      0,
    );

    // Duração padrão de 1 hora para o evento
    const dataFimComHorario = new Date(dataInicioComHorario);
    dataFimComHorario.setHours(dataFimComHorario.getHours() + 1);

    await Calendar.createEventAsync(calendarId, {
      title: dados.titulo,
      startDate: dataInicioComHorario,
      endDate: dataFimComHorario,
      location: dados.localizacao,
      notes: dados.descricao,
      timeZone: "GMT-3", // Ou ajuste conforme o fuso horário da aplicação
    });

    Alert.alert("Sucesso", "Visita salva no calendário do seu celular!");
  } catch (error) {
    console.error("Erro ao salvar no calendário:", error);
    Alert.alert("Erro", "Não foi possível salvar o evento na agenda.");
  }
}
