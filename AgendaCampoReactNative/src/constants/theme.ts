import { StyleSheet, ViewStyle, TextStyle } from "react-native";

export const Colors = {
  blue: "hsl(205, 55%, 45%)",
  darkblue: "hsl(195, 85%, 15%)",
  lightblue: "hsl(215, 92%, 95%)",
  green: "hsl(135, 40%, 50%)",
  darkgreen: "hsl(145, 85%, 15%)",
  lightgreen: "hsl(125, 92%, 95%)",
  lightred: "hsl(0, 92%, 95%)",
  red: "hsl(0, 100%, 75%)",
  darkred: "hsl(0, 65%, 35%)",
  bgc: "#FFFFFF",
  white: "#FFFFFF",
  black: "#000000",
  shadow: "hsla(195, 85%, 15%, 0.40)",
  inactive: "hsl(205, 50%, 75%)",
  smoothBgc: "hsl(205, 100%, 98%)",
  smoothBgc2: "hsl(205, 100%, 95%)",
  darknessblue: "#0B1C30",
  gray: "#434656",
  grayShadow: '#43465626',
  btnblue: '#013FC7',
  bgcBlue: `#D3E4FE`,
  txtBlue: `#003EC7`, //
  borderclr: '#A9C2F3',
  darkgray: `#565F70`,
  lightgray: `#C3C5D9`,
  littleblue: `#D3D9EB`,
  littlebluelight: `#E5EEFF`,
  smoothGradient: ["hsl(205, 100%, 95%)", "#FFFFFF"] as const,
} as const;

export const Font = {
  regular: "Outfit_400Regular",
  semibold: "Outfit_600SemiBold",
  bold: "Outfit_700Bold",
} as const;

const baseText: TextStyle = {
  color: Colors.darkblue,
  fontFamily: Font.regular,
};

const baseShadow: ViewStyle = {
  shadowColor: Colors.shadow,
  shadowRadius: 6,
  elevation: 4,
};

export const theme = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: Colors.bgc,
  },

  scroll: {
    paddingBottom: 32,
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  row: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
  },

  column: {
    gap: 18,
    flexDirection: "column",
  },

  info: {
    gap: 12,
    padding: 20,
    width: "100%",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  round: {
    ...baseShadow,
    borderWidth: 4,
    borderColor: Colors.bgc,
    overflow: "hidden",
    borderRadius: 999,
  },

  icon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },

  card: {
    ...baseShadow,
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: Colors.bgc,
  },

  box: {
    ...baseShadow,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: Colors.lightblue,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.smoothBgc,
  },

  btn: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  btn2: {
    padding: 16,
    width: "65%",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    ...baseText,
    fontSize: 18,
    fontFamily: Font.semibold,
  },

  h1: {
    ...baseText,
    fontSize: 32,
    fontFamily: Font.bold,
  },

  h2: {
    ...baseText,
    fontSize: 26,
    fontFamily: Font.semibold,
  },

  h3: {
    ...baseText,
    fontSize: 22,
  },

  h4: {
    ...baseText,
    fontSize: 18,
  },

  p: {
    ...baseText,
    fontSize: 15,
  },

  line: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.blue,
    opacity: 0.2,
  },
});

export const {
  container: Container,
  scroll: Scroll,
  center: Center,
  row: Row,
  column: Column,
  info: Info,
  round: Round,
  icon: Icon,
  card: Card,
  box: Box,
  btn: Btn,
  btn2: Btn2,
  btnText: BtnText,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  line: Line,
} = theme;
