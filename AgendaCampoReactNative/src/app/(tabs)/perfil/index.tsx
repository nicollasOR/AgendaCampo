import { Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  Colors,
  Column,
  Container,
  H1,
  H2,
  H4,
  Icon,
  Info,
  Round,
  Row,
} from "../../../constants/theme";
import PerfilIcon from "../../../../assets/svg/PerfilIcon.svg";
import DetalheIcon from "../../../../assets/svg/DetalheIcon.svg";
import { LinearGradient } from "expo-linear-gradient";

export default function Perfil() {
  return (
    <SafeAreaView style={{ ...Container }}>
      <LinearGradient
        colors={Colors.smoothGradient}
        style={Info}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={{ ...Round }}>
          <Image
            source={require("../../../../assets/img/perfil.jpg")}
            style={{ width: 120, height: 120 }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...H1 }}>João Silva</Text>
          <View style={{ ...Row }}>
            <PerfilIcon color={Colors.blue} width={20} height={20} />
            <Text style={{ ...H4 }}>Técnico de Campo</Text>
          </View>
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={{ ...Column, width: 320 }}>
        <View style={{ ...Column, ...Card }}>
          <View style={{ ...Icon, backgroundColor: Colors.lightblue }}>
            <DetalheIcon color={Colors.blue} />
          </View>
          <View>
            <Text style={{ ...H4 }}>Visitas esse mês</Text>
            <Text style={{ ...H2 }}>42</Text>
          </View>
        </View>

        <View style={{ ...Column, ...Card }}>
          <View style={{ ...Icon, backgroundColor: Colors.darkblue }}>
            <DetalheIcon color={Colors.white} />
          </View>
          <View>
            <Text style={{ ...H4 }}>Visitas hoje</Text>
            <Text style={{ ...H2 }}>3</Text>
          </View>
        </View>

        <View style={{ ...Column, ...Card }}>
          <View style={{ ...Icon, backgroundColor: Colors.lightblue }}>
            <DetalheIcon color={Colors.blue} />
          </View>
          <View>
            <Text style={{ ...H4 }}>Pontualidade</Text>
            <Text style={{ ...H2 }}>98%</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
