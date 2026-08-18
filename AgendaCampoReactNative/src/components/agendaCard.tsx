import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

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
} from "../constants/theme";

import LocalIcon from "../../assets/svg/LocalIcon.svg";
import RelogioIcon from "../../assets/svg/RelogioIcon.svg";
import ArrowMapIcon from "../../assets/svg/ArrowMapIcon.svg";
import CalendarioIcon from "../../assets/svg/CalendarioIcon.svg";
import VisitaCheckIcon from "../../assets/svg/VisitaCheckIcon.svg";

export default function AgendaCard() {
  const router = useRouter();

  return (
    <View style={CardInfo}>
      <View style={{ padding: 16 }}>
        <View style={[Row, SpaceBetween]}>
          <View style={Status}>
            <Text style={[P, { color: Colors.btn }]}>Agendada</Text>
          </View>
          <VisitaCheckIcon color={Colors.darkblue} />
        </View>

        <Text style={[H2, { color: Colors.black }]}>Fazenda Boa Esperança</Text>
        <Text style={[P, { color: Colors.darkgray }]}>Ref: RN01</Text>

        <View style={List}>
          <View style={Row}>
            <CalendarioIcon color={Colors.darkblue} />
            <Text style={[P, { color: Colors.gray }]}>24 Out 2023</Text>
          </View>
          <View style={Row}>
            <RelogioIcon color={Colors.darkblue} />
            <Text style={[P, { color: Colors.gray }]}>08:00 - 10:00</Text>
          </View>
          <View style={Row}>
            <LocalIcon color={Colors.darkblue} />
            <Text style={[P, { color: Colors.gray }]} numberOfLines={2}>
              Rod. SP 340, Km 15, Mogi Mirim - SP
            </Text>
          </View>
        </View>
      </View>

      <View style={CardFooter}>
        <TouchableOpacity style={Box3} onPress={() => router.push("/detalhe")}>
          <Text style={[P, { color: Colors.btn }]}>Detalhes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[Row, Box2]}>
          <ArrowMapIcon color={Colors.white} />
          <Text style={[P, { color: Colors.white }]}>Iniciar Rota</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
