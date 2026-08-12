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
        tabBarStyle: {
          backgroundColor: Colors.bgc,
          height: 72,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: Colors.inactive,
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: "Outfit_700Bold",
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Home fill={color} color={color} width={30} height={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="agendamento/index"
        options={{
          title: "Agendamento",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Criar fill={color} color={color} width={30} height={30} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Perfil fill={color} color={color} width={30} height={30} />
          ),
        }}
      />
    </Tabs>
  );
}
