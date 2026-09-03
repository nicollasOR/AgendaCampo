import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter, SplashScreen } from "expo-router";

import {
  useFonts,
  Outfit_400Regular,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";

import { AuthProvider } from "@/src/contexts/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Colors, H2, Row, SpaceBetween } from "@/src/constants/theme";
import Logo from "@/assets/svg/Logo.svg";

SplashScreen.preventAutoHideAsync().catch(() => {});

function CustomHeaderTitle() {
  const router = useRouter();

  return (
    <View style={[Row, SpaceBetween, { width: "100%", alignItems: "center" }]}>
      <Text style={[H2, { color: Colors.white }]}>Agenda Campo</Text>
      <TouchableOpacity onPress={() => router.push("/home")}>
        <Logo color={Colors.white} height={32} width={32} />
      </TouchableOpacity>
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Outfit_400Regular,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: Colors.blue },
            headerTitleStyle: {
              color: Colors.white,
              fontFamily: "Outfit_600SemiBold",
            },
            headerTitle: () => <CustomHeaderTitle />,
            headerTintColor: Colors.white,
            animation: "fade",
          }}
        >
          <Stack.Screen name="login/index" options={{ headerShown: false }} />
          <Stack.Screen
            name="cadastro/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="alterarsenha/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(tabs)" options={{ title: "Sair" }} />
        </Stack>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
