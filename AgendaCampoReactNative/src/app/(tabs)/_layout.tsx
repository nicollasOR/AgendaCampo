import { Tabs } from "expo-router";
import { Animated } from "react-native";
import { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";

// import { Colors } from "@/src/constants/theme";
import { Colors } from "../../constants/theme";

import HomeIcon from "@/assets/svg/HomeIcon.svg";
import CriarIcon from "@/assets/svg/CriarIcon.svg";
import PerfilIcon from "@/assets/svg/PerfilIcon.svg";

function TabIconWrapper({
  children,
  focused,
}: {
  children: React.ReactNode;
  focused: boolean;
}) {
  const scaleAnim = useRef(new Animated.Value(focused ? 1 : 0.8)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.1 : 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View
      style={{
        width: 40,
        height: 40,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: focused ? Colors.smoothBgc2 : "transparent",
        transform: [{ scale: scaleAnim }],
      }}
    >
      {children}
    </Animated.View>
  );
}

export default function TabsLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.bgc,
            borderColor: Colors.lightblue,
            borderTopWidth: 1,
            paddingBottom: 8,
            paddingTop: 8,
            height: 80,
          },
          tabBarActiveTintColor: Colors.blue,
          tabBarInactiveTintColor: Colors.inactive,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Outfit_700Bold",
            marginTop: 4,
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
    </>
  );
}
