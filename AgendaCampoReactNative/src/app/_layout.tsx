/* Comandos para bibliotecas
  npx expo install @expo-google-fonts/outfit
  npx expo install @expo/metro-runtime
  npx expo install @react-native-masked-view/masked-view
  npx expo install axios
  npx expo install expo
  npx expo install expo-constants
  npx expo install expo-font
  npx expo install expo-linear-gradient
  npx expo install expo-router
  npx expo install expo-secure-store
  npx expo install expo-status-bar
  npx expo install lucide-react-native
  npx expo install react
  npx expo install react-dom
  npx expo install react-native
  npx expo install react-native-paper
  npx expo install react-native-safe-area-context
  npx expo install react-native-screens
  npx expo install react-native-svg
  npx expo install react-native-web
*/

import React from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

// Rotas com Expo-router
// npx expo install expo-router
import { Stack, useRouter } from "expo-router";

// Fontes Personalizada (Outfit)
// npx expo install @expo-google-fonts/outfit expo-font
import {
  useFonts,
  Outfit_400Regular,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";

// SafeAreaProvider
// npx expo install react-native-safe-area-context react-native-screens
import { SafeAreaProvider } from "react-native-safe-area-context";

// Barra de status
// npx expo install expo-status-bar
import { StatusBar } from "expo-status-bar";

// CSS
import { Colors, Container, H2, Row, SpaceBetween } from "@/src/constants/theme";

// Logo
import Logo from "@/assets/svg/Logo.svg";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={Container}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.blue },
          headerTitleStyle: {
            color: Colors.white,
            fontFamily: "Outfit_600SemiBold",
          },
          headerTitle: () => (
            <View style={[Row, SpaceBetween]}>
              <Text style={[H2, { color: Colors.white }]}>Agenda Campo</Text>
              <TouchableOpacity onPress={() => router.push("/home")}>
                <Logo color={Colors.white} height={32} width={32} />
              </TouchableOpacity>
            </View>
          ),
          headerTintColor: Colors.white,
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="login/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="cadastro/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="alterarsenha/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Sair",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
