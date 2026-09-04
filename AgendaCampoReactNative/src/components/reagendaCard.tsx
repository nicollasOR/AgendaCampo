import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { CardInfo, Colors, H2, P, Row } from "@/src/constants/theme";
import ReagendarIcon from "@/assets/svg/CalendarioReagendarIcon.svg";
import { VisitaGet } from "@/src/@types/visita";
import { formatacoes } from "@/src/utils/converterData";
export default function ReagendaCard({
  visitaID,
  nomeEvento,
  dataInicio,
}: VisitaGet) {
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
