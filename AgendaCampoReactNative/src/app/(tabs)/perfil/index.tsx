import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "../../../constants/theme";
import React from "react";

export default function Perfil() {
  return (
    <SafeAreaView style={{ ...Container }}>
      <Text>Perfil</Text>
    </SafeAreaView>
  );
}
