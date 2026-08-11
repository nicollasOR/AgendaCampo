import { ViewStyle, TextStyle, ImageStyle } from "react-native";

export const Colors = {
  blue: "#337DB2",
  darkblue: "#063747",
  lightblue: "#E7F1FE",
  green: "#4DB266",
  darkgreen: "#064721",
  lightgreen: "#E7FEE9",
  bgc: "#FFF",
  white: "#FFF",
  gray: "#617583",
};

const Font = {
  regular: "Outfit_400Regular",
  semibold: "Outfit_600SemiBold",
  bold: "Outfit_700Bold",
};

export const Container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: Colors.bgc,
};

export const Btn: ViewStyle = {
  padding: 16,
  borderRadius: 16,
  alignItems: "center",
  backgroundColor: Colors.blue,
};

export const BtnText: TextStyle = {
  color: Colors.white,
  fontSize: 20,
  fontFamily: Font.regular,
};

export const H1: TextStyle = {
  fontSize: 32,
  fontFamily: Font.bold,
};

export const H2: TextStyle = {
  fontSize: 28,
  fontFamily: Font.semibold,
};

export const H3: TextStyle = {
  fontSize: 24,
  fontFamily: Font.regular,
};

export const H4: TextStyle = {
  fontSize: 20,
  fontFamily: Font.regular,
};

export const P: TextStyle = {
  fontSize: 16,
  fontFamily: Font.regular,
};
