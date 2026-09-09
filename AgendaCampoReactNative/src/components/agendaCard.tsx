import { View, Text, TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";

import { VisitaGet } from "@/src/@types/visita";

import { Colors, theme } from "@/src/constants/theme";

import LocalIcon from "@/assets/svg/LocalIcon.svg";
import RelogioIcon from "@/assets/svg/RelogioIcon.svg";
import CalendarioIcon from "@/assets/svg/CalendarioIcon.svg";
import VisitaCheckIcon from "@/assets/svg/VisitaCheckIcon.svg";

export default function AgendaCard({
  statusVisita,
  nomeEvento,
  visitaID,
  dataInicio,
  logradouro,
  bairro,
  numero,
  dataTermino,
}: VisitaGet) {
  const router = useRouter();

  function formatarHora(dt: string) {
    if (!dt) return "";

    try {
      const data = new Date(dt);

      return isNaN(data.getTime())
        ? dt
        : data.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          });
    } catch {
      return dt;
    }
  }

  function formatarDataSemHoras(dt: string) {
    if (!dt) return "";

    try {
      const data = new Date(dt);

      return isNaN(data.getTime()) ? dt : data.toLocaleDateString("pt-BR");
    } catch {
      return dt;
    }
  }

  return (
    <View style={theme.cardInfo}>
      <View style={{ padding: 16 }}>
        <View style={[theme.row, theme.spaceBetween]}>
          <View style={theme.status}>
            <Text style={[theme.p, { color: Colors.btn }]}>{statusVisita}</Text>
          </View>
          <VisitaCheckIcon color={Colors.darkblue} />
        </View>

        <Text style={[theme.h2, { color: Colors.black }]}>{nomeEvento}</Text>
        <Text style={[theme.p, { color: Colors.darkgray }]}>
          Ref: RN{visitaID}
        </Text>

        <View style={theme.list}>
          <View style={theme.row}>
            <CalendarioIcon color={Colors.darkblue} />
            <Text style={[theme.p, { color: Colors.gray }]}>
              {formatarDataSemHoras(String(dataInicio))}
            </Text>
          </View>
          <View style={theme.row}>
            <RelogioIcon color={Colors.darkblue} />
            <Text style={[theme.p, { color: Colors.gray }]}>
              {formatarHora(String(dataInicio))} -{" "}
              {formatarHora(String(dataTermino))}
            </Text>
          </View>
          <View style={theme.row}>
            <LocalIcon color={Colors.darkblue} />
            <Text style={[theme.p, { color: Colors.gray }]} numberOfLines={2}>
              {logradouro}, {numero}, {bairro}
            </Text>
          </View>
        </View>
      </View>

      <View style={theme.cardFooter}>
        <TouchableOpacity
          style={theme.box}
          onPress={() => router.push("/detalhe/" + visitaID)}
        >
          <Text style={[theme.p, { color: Colors.btn }]}>Detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
