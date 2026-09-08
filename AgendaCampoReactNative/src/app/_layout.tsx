import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Easing,
} from "react-native";
import { Stack, useRouter, SplashScreen } from "expo-router";

import {
  useFonts,
  Outfit_400Regular,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";

import { AuthProviderTeste } from "@/src/contexts/AuthContextTESTE";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Colors, theme } from "@/src/constants/theme";
import Logo from "@/assets/svg/Logo.svg";

// Impede que a Splash Screen nativa esconda automaticamente
SplashScreen.preventAutoHideAsync().catch(() => {});

function AnimatedSplashScreen({
  children,
  isAppReady,
}: {
  children: React.ReactNode;
  isAppReady: boolean;
}) {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const logoOpacityAnim = useRef(new Animated.Value(0)).current;
  const textOpacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-20)).current;
  const containerOpacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isAppReady) {
      // Esconde a Splash Nativa para exibir a Splash Animada personalizada
      SplashScreen.hideAsync().catch(() => {});

      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.parallel([
          Animated.timing(textOpacityAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.spring(translateYAnim, {
            toValue: 0,
            bounciness: 10,
            useNativeDriver: true,
          }),
        ]).start(() => {
          Animated.timing(containerOpacityAnim, {
            toValue: 0,
            duration: 400,
            delay: 500,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }).start(() => {
            setIsAnimationComplete(true);
          });
        });
      });
    }
  }, [isAppReady]);

  return (
    <View style={{ flex: 1 }}>
      {children}

      {!isAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFillObject,
            theme.center,
            {
              backgroundColor: Colors.blue,
              zIndex: 9999,
              opacity: containerOpacityAnim,
            },
          ]}
        >
          <View style={theme.center}>
            <Animated.View
              style={{
                opacity: logoOpacityAnim,
                transform: [{ scale: scaleAnim }],
              }}
            >
              <Logo color={Colors.white} height={120} width={120} />
            </Animated.View>

            <Animated.View
              style={{
                opacity: textOpacityAnim,
                transform: [{ translateY: translateYAnim }],
              }}
            >
              <Text style={[theme.h2, theme.center, { color: Colors.white }]}>
                Agenda Campo
              </Text>
            </Animated.View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

function CustomHeaderTitle() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start(() => {
      router.push("/home");
    });
  };

  return (
    <View
      style={[
        theme.row,
        theme.spaceBetween,
        { width: "100%", paddingRight: 16 },
      ]}
    >
      <Text style={[theme.h2, { color: Colors.white }]}>Agenda Campo</Text>

      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Logo color={Colors.white} height={32} width={32} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

function AppContent() {
  return (
    <Stack
      initialRouteName="login/index"
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
      <Stack.Screen name="cadastro/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="alterarsenha/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(tabs)" options={{ title: "Sair" }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Outfit_400Regular,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  // Previne a renderização até que a verificação de fontes termine
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProviderTeste>
      <SafeAreaProvider>
        <AnimatedSplashScreen isAppReady={fontsLoaded || !!fontError}>
          <AppContent />
        </AnimatedSplashScreen>
      </SafeAreaProvider>
    </AuthProviderTeste>
  );
}
