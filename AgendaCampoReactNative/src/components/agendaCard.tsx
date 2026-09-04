import { useRouter } from "expo-router";
import { VisitaGet } from "@/src/@types/visita";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Box2,
  Box3,
  CardFooter,
  CardInfo,
  Colors,
  H2,
  List,
  P,
  Row,
  SpaceBetween,
  Status,
} from "@/src/constants/theme";
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

  function formatarData(dt: string) {
    if (!dt) return "";
    try {
      const data = new Date(dt);
      return isNaN(data.getTime()) ? dt : data.toLocaleString("pt-BR");
    } catch {
      return dt;
    }
  }

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
    <View style={CardInfo}>
      <View style={{ padding: 16 }}>
        <View style={[Row, SpaceBetween]}>
          <View style={Status}>
            <Text style={[P, { color: Colors.btn }]}>{statusVisita}</Text>
          </View>
          <VisitaCheckIcon color={Colors.darkblue} />
        </View>

        <Text style={[H2, { color: Colors.black }]}>{nomeEvento}</Text>
        <Text style={[P, { color: Colors.darkgray }]}>Ref: RN{visitaID}</Text>

        <View style={List}>
          <View style={Row}>
            <CalendarioIcon color={Colors.darkblue} />
            <Text style={[P, { color: Colors.gray }]}>
              {formatarDataSemHoras(String(dataInicio))}
            </Text>
          </View>
          <View style={Row}>
            <RelogioIcon color={Colors.darkblue} />
            <Text style={[P, { color: Colors.gray }]}>
              {formatarHora(String(dataInicio))} -{" "}
              {formatarHora(String(dataTermino))}
            </Text>
          </View>
          <View style={Row}>
            <LocalIcon color={Colors.darkblue} />
            <Text style={[P, { color: Colors.gray }]} numberOfLines={2}>
              {logradouro}, {numero}, {bairro}
            </Text>
          </View>
        </View>
      </View>

      <View style={CardFooter}>
        <TouchableOpacity
          style={Box3}
          onPress={() => router.push("/detalhe/" + visitaID)}
        >
          <Text style={[P, { color: Colors.btn }]}>Detalhes</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={[Row, Box2]}>
          <ArrowMapIcon color={Colors.white} />
          <Text style={[P, { color: Colors.white }]}>Iniciar Rota</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
