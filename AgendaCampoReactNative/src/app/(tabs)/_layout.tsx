import { Tabs } from "expo-router";
import { Colors } from "../../constants/theme";
import Home from "../../../assets/svg/Home.svg";
import Criar from "../../../assets/svg/Criar.svg";
import Perfil from "../../../assets/svg/Perfil.svg";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: Colors.gray,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Home
              fill={color}
              color={color}
              width={size || 24}
              height={size || 24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="agendamento/index"
        options={{
          title: "Agendamento",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Criar
              fill={color}
              color={color}
              width={size || 24}
              height={size || 24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Perfil
              fill={color}
              color={color}
              width={size || 24}
              height={size || 24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
