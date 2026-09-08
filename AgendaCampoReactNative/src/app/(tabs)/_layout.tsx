import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Colors } from "@/src/constants/theme";

import CriarIcon from "@/assets/svg/CriarIcon.svg";
import HomeIcon from "@/assets/svg/HomeIcon.svg";
import PerfilIcon from "@/assets/svg/PerfilIcon.svg";

interface TabIconWrapperProps {
  children: React.ReactNode;
  focused: boolean;
}

function TabIconWrapper({ children, focused }: TabIconWrapperProps) {
  const scaleAnim = useRef(new Animated.Value(focused ? 1 : 0.8)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.1 : 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [focused, scaleAnim]);

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
            borderColor: Colors.smoothBgc2,
            borderTopWidth: 2,
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
          name="detalhe/[id]"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="reagendar/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}
