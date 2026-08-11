import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "../../../constants/theme";

export default function Home() {
  return (
    <SafeAreaView style={{ ...Container }}>
      <Text>Home</Text>
    </SafeAreaView>
  );
}
