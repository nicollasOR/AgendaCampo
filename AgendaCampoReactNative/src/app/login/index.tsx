import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "../../constants/theme";

export default function Login() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ ...Container }}>
      <Text>Login</Text>
      <TouchableOpacity onPress={() => router.push("/(tabs)/home")}>
        <Text>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
