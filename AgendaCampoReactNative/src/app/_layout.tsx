import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";

// Rotas com Expo-router
// npx expo install expo-router
import { Stack } from "expo-router";

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
import { Colors } from "../constants/theme";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

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
          headerTintColor: Colors.white,
        }}
      >
        <Stack.Screen
          name="login/index"
          options={{
            title: "Login",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="detalhe/index"
          options={{
            title: "Detalhes do agendamento",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Sair",
            // headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bgc,
  },
});
