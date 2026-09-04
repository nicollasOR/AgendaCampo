import { useRouter } from "expo-router";
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
import ArrowMapIcon from "@/assets/svg/ArrowMapIcon.svg";
import CalendarioIcon from "@/assets/svg/CalendarioIcon.svg";
import VisitaCheckIcon from "@/assets/svg/VisitaCheckIcon.svg";
import ReagendarIcon from "@/assets/svg/CalendarioReagendarIcon.svg";
import { visitaGet } from "../@types/visitas";
import { formatacoes } from "../utils/converterData";
export default function ReagendaCard({
  visitaID,
  nomeEvento,
  dataInicio,
}: visitaGet) {
  const router = useRouter();

  const dados = {
    titulo: "Manutenção preventiva - Trator John",
    id: "#VS-2023-4091",
    data: "15 de Outubro, 2023 - 08:00 ",
  };
  return (
    <View style={[CardInfo]}>
      <View style={{ padding: 20, gap: 10 }}>
        <Text style={[H2, { color: Colors.black }]}>{nomeEvento}</Text>
        <Text style={[P, { color: Colors.darkgray }]}>ID: #VS-{visitaID}</Text>
        <View style={[Row, {}]}>
          <ReagendarIcon color={Colors.gray} />
          <Text
            style={[
              P,
              { color: Colors.gray, textDecorationLine: "line-through" },
            ]}
          >
            {formatacoes.formatarDataSemHoras(String(dataInicio))} -{" "}
            {formatacoes.formatarHora(String(dataInicio))}{" "}
          </Text>
        </View>
      </View>
    </View>
  );
}
