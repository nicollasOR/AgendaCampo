import { Tabs } from "expo-router";
import { View } from "react-native";

// import { Colors } from "@/src/constants/theme";
import { Colors } from "../../constants/theme";

<<<<<<< HEAD
// import HomeIcon from "@/assets/svg/HomeIcon.svg";
// import CriarIcon from "@/src/assets/svg/CriarIcon.svg";
// import PerfilIcon from "@/src/assets/svg/PerfilIcon.svg";

import HomeIcon from "../../../assets/svg/HomeIcon.svg";
import CriarIcon from "../../../assets/svg/CriarIcon.svg";
import PerfilIcon from "../../../assets/svg/PerfilIcon.svg";
=======
import HomeIcon from "@/assets/svg/HomeIcon.svg";
import CriarIcon from "@/assets/svg/CriarIcon.svg";
import PerfilIcon from "@/assets/svg/PerfilIcon.svg";
>>>>>>> acf1011a9e8754e70556f63abe293c2590933415

function TabIconWrapper({
  children,
  focused,
}: {
  children: React.ReactNode;
  focused: boolean;
}) {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: focused ? Colors.smoothBgc2 : "transparent",
      }}
    >
      {children}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.bgc,
          borderColor: Colors.lightblue,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 10,
        },
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: Colors.inactive,
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "Outfit_700Bold",
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIconWrapper focused={focused}>
              <HomeIcon fill={color} color={color} width={24} height={24} />
            </TabIconWrapper>
          ),
        }}
      />

      <Tabs.Screen
        name="agendamento/index"
        options={{
          title: "Agendamento",
          tabBarIcon: ({ color, focused }) => (
            <TabIconWrapper focused={focused}>
              <CriarIcon fill={color} color={color} width={24} height={24} />
            </TabIconWrapper>
          ),
        }}
      />

      <Tabs.Screen
        name="perfil/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <TabIconWrapper focused={focused}>
              <PerfilIcon fill={color} color={color} width={24} height={24} />
            </TabIconWrapper>
          ),
        }}
      />

      <Tabs.Screen
        name="detalhe/index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
