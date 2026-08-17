import { StyleSheet, ViewStyle, TextStyle } from "react-native";

export const Colors = {
  blue: "hsl(205, 55%, 45%)",
  darkblue: "hsl(195, 85%, 15%)",
  lightblue: "hsl(215, 92%, 95%)",
  lightred: "hsl(0, 92%, 95%)",
  red: "hsl(0, 100%, 75%)",
  darkred: "hsl(0, 65%, 35%)",
  bgc: "hsl(0, 0%, 100%)",
  white: "hsl(0, 0%, 100%)",
  black: "hsl(0, 0%, 0%)",
  shadow: "hsla(195, 85%, 15%, 0.4)",
  inactive: "hsl(205, 50%, 75%)",
  smoothBgc: "hsl(205, 100%, 98%)",
  smoothBgc2: "hsl(205, 100%, 95%)",
  gray: "hsl(231, 12%, 30%)",
  border: "hsla(195, 84%, 15%, 0.05)",
  darkgray: "hsl(220, 15%, 35%)",
  lightgray: "hsl(235, 20%, 80%)",
  btn: "hsl(220, 100%, 40%)",
  smoothGradient: ["hsl(205, 100%, 95%)", "hsl(0, 0%, 100%)"] as const,
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

const baseInput: ViewStyle = {
  width: "100%",
  backgroundColor: Colors.bgc,
  borderWidth: 1,
  borderColor: Colors.lightgray,
  borderRadius: 10,
  paddingLeft: 35,
};

export const theme = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: Colors.bgc,
  },

  scroll: {
    gap: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
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
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.bgc,
  },

  form: {
    ...baseShadow,
    width: "100%",

    backgroundColor: Colors.smoothBgc,
    borderWidth: 1,
    borderColor: Colors.lightgray,
    borderRadius: 10,

    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 30,
  },

  campoForm: {
    gap: 4,
  },

  campoInput: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  inputIcon: {
    position: "absolute",
    left: 10,
    zIndex: 2, // zIndex -> sobe uma camada dos elementos dentro view
  },

  input: {
    ...baseInput,
    height: 50,
  },

  textArea: {
    ...baseInput,
    minHeight: 150,
    textAlignVertical: "top",
  },

  box: {
    ...baseShadow,
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
    gap: 10,
    paddingVertical: 16,
    height: 60,
    paddingHorizontal: 24,
    width: "90%",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Colors.btn,
  },

  btn2: {
    gap: 10,
    padding: 16,
    height: 60,
    width: "90%",
    borderRadius: 999,
    alignItems: "center",
    flexDirection: "row",
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
    fontFamily: Font.semibold,
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
  label: Label,
  form: Form,
  campoForm: CampoForm,
  campoInput: CampoInput,
  textArea: TextArea,

} = theme;
