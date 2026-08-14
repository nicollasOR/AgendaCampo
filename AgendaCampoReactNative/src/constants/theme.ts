import { StyleSheet, ViewStyle, TextStyle } from "react-native";

export const Colors = {
  blue: "#337DB2",
  btnBlue: "#003EC7",
  darkblue: "#063747",
  lightblue: "#E7F1FE",
  darkgray: "#434656",
  gray: "#818286",
  lightgray: "#C3C5D9",
  green: "#4DB266",
  darkgreen: "#064721",
  lightgreen: "#E7FEE9",
  lightred: "#FEE7E7",
  red: "#A11212",
  bgc: "#FFFFFF",
  white: "#FFFFFF",
  black: "#000000",
  shadow: "#06374766",
  inactive: "#9FC5DF",
  smoothBgc: "hsl(202, 99%, 99%)",
  smoothBgc2: "hsl(205, 100%, 96%)",
  smoothGradient: ["hsl(205, 100%, 95%)", "#FFFFFF"] as const,
} as const;

const Font = {
  regular: "Outfit_400Regular",
  semibold: "Outfit_600SemiBold",
  bold: "Outfit_700Bold",
} as const;

const baseText: TextStyle = {
  color: Colors.darkblue,
  fontFamily: Font.regular,
};

export const baseShadow: ViewStyle = {
  shadowColor: Colors.shadow,
  shadowRadius: 6,
  elevation: 4,
};

const baseInput: ViewStyle = {
  width: "100%",
  backgroundColor: Colors.bgc,
  borderWidth: 1,
  borderColor: Colors.lightgray,
  borderRadius: 10,
  paddingLeft: 35,
}

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
    gap: 10,
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
    width: "90%",
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

  formulario: {
    ...baseShadow,
    width: "100%",

    backgroundColor: Colors.smoothBgc,
    borderWidth: 1,
    borderColor: Colors.lightgray,
    borderRadius: 10,

    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 30
  },

  campoForm: {
    gap: 4
  },

  campoInput: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative"
  },

  inputIcon: {
    position: "absolute",
    left: 10,
    zIndex: 2, // zIndex -> sobe uma camada dos elementos dentro view
  },

  input: {
    ...baseInput,
    height: 50
  },

  textarea: {
    ...baseInput,
    minHeight: 150,
    textAlignVertical: "top",
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
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    ...baseText,
    color: Colors.white,
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

  label: {
    ...baseText,
    fontSize: 18,
    fontFamily: Font.semibold
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
  input: Input,
  inputIcon: InputIcon,
  textarea: textarea,
  label: Label
} = theme;
