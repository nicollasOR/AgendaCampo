import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "../../constants/theme";

export default function Detalhe() {
  return (
    <SafeAreaView style={{ ...Container }}>
      <Text>Detalhe</Text>
    </SafeAreaView>
  );
}
