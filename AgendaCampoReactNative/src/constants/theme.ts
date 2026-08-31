import { StyleSheet, ViewStyle, TextStyle } from "react-native";

export const Colors = {
  blue: "#337DB2",
  darkblue: "#063747",
  lightblue: "#E7F1FE",
  green: "#4DB266",
  darkgreen: "#064721",
  lightgreen: "#E7FEE9",
  bgc: "#FFFFFF",
  white: "#FFFFFF",
  black: "#000000",
  inactive: "#9FC5DF",
  smoothGradient: ["hsl(205, 100%, 95%)", "#FFFFFF"] as const,
};

const Font = {
  regular: "Outfit_400Regular",
  semibold: "Outfit_600SemiBold",
  bold: "Outfit_700Bold",
};

export const theme = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.bgc,
  } as ViewStyle,

  center: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,

  row: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
  } as ViewStyle,

  column: {
    gap: 12,
    flexDirection: "column",
    justifyContent: "center",
  } as ViewStyle,

  info: {
    gap: 12,
    padding: 32,
    width: "90%",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,

  round: {
    borderWidth: 4,
    borderColor: Colors.bgc,
    overflow: "hidden",
    borderRadius: 999,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  } as ViewStyle,

  icon: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  } as ViewStyle,

  card: {
    width: "100%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: Colors.bgc,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  } as ViewStyle,

  btn: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.blue,
  } as ViewStyle,

  btnText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Font.semibold,
  } as TextStyle,

  h1: {
    fontSize: 32,
    fontFamily: Font.bold,
    color: Colors.darkblue,
  } as TextStyle,

  h2: {
    fontSize: 26,
    fontFamily: Font.semibold,
    color: Colors.darkblue,
  } as TextStyle,

  h3: {
    fontSize: 22,
    fontFamily: Font.regular,
    color: Colors.darkblue,
  } as TextStyle,

  h4: {
    fontSize: 18,
    fontFamily: Font.regular,
    color: Colors.darkblue,
  } as TextStyle,

  p: {
    fontSize: 15,
    fontFamily: Font.regular,
    color: Colors.darkblue,
  } as TextStyle,

  line: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.blue,
    opacity: 0.2,
  } as ViewStyle,
});

export const Container = theme.container;
export const Center = theme.center;
export const Row = theme.row;
export const Column = theme.column;
export const Info = theme.info;
export const Round = theme.round;
export const Icon = theme.icon;
export const Card = theme.card;
export const Btn = theme.btn;
export const BtnText = theme.btnText;
export const H1 = theme.h1;
export const H2 = theme.h2;
export const H3 = theme.h3;
export const H4 = theme.h4;
export const P = theme.p;
export const Line = theme.line;
