import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// ════════════════════════════════ //
//  1. DESIGN (Cores e Tipografia)  //
// ════════════════════════════════ //

export const Colors = {
  // Cores Principais
  blue: "hsl(225, 55%, 50%)",
  darkblue: "hsl(225, 85%, 15%)",
  lightblue: "hsl(225, 100%, 90%)",
  btn: "hsl(220, 100%, 40%)",

  // Status & Alertas
  red: "hsl(0, 100%, 75%)",
  darkred: "hsl(0, 65%, 35%)",
  lightred: "hsl(0, 92%, 95%)",
  status: "hsl(215, 85%, 92%)",

  // Neutros
  bgc: "hsl(0, 0%, 100%)",
  white: "hsl(0, 0%, 100%)",
  black: "hsl(215, 100%, 2%)",
  gray: "hsl(230, 25%, 40%)",
  darkgray: "hsl(220, 25%, 20%)",
  lightgray: "hsl(235, 15%, 80%)",
  inactive: "hsl(215, 50%, 75%)",

  // Backgrounds Suaves
  smoothBgc: "hsl(215, 100%, 98%)",
  smoothBgc2: "hsl(215, 100%, 95%)",

  // Transparências & Efeitos
  shadow: "hsla(215, 85%, 15%, 0.4)",
  border: "hsla(215, 84%, 15%, 0.05)",
  smoothGradient: ["hsl(215, 100%, 95%)", "hsl(0, 0%, 100%)"] as const,
} as const;

export const Font = {
  regular: "Outfit_400Regular",
  semibold: "Outfit_600SemiBold",
  bold: "Outfit_700Bold",
} as const;

// ═════════════════ //
// 2. ESTILOS BASE   //
// ═════════════════ //

const baseText: TextStyle = {
  color: Colors.darkblue,
  fontFamily: Font.regular,
  flexShrink: 1,
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

// ═══════════════ //
// 3. STYLESHEET   //
// ═══════════════ //

export const theme = StyleSheet.create({
  // --- Layout & Containers ---
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
  list: {
    gap: 6,
    flexDirection: "column",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.blue,
    opacity: 0.2,
  },

  // --- Visual & Componentes Gerais ---
  info: {
    gap: 12,
    padding: 20,
    width: "100%",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  profile: {
    ...baseShadow,
    borderWidth: 4,
    borderColor: Colors.bgc,
    overflow: "hidden",
    borderRadius: 999,
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.smoothBgc2,
  },
  profileText: {
    ...baseText,
    fontFamily: Font.bold,
    fontSize: 36,
  },

  // --- Cards ---
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
  cardInfo: {
    ...baseShadow,
    width: "100%",
    borderRadius: 20,
    borderLeftWidth: 4,
    borderColor: Colors.btn,
    backgroundColor: Colors.bgc,
  },
  cardFooter: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    alignItems: "center",
    backgroundColor: Colors.status,
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
    width: "100%",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  status: {
    backgroundColor: Colors.status,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },

  // --- Formulários & Inputs ---
  form: {
    ...baseShadow,
    width: "100%",
    backgroundColor: Colors.smoothBgc,
    borderWidth: 1,
    borderColor: Colors.lightgray,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 20,
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
    zIndex: 2,
  },
  input: {
    ...baseInput,
    height: 50,
    fontSize: 16,
    fontFamily: Font.semibold,
  },
  textArea: {
    ...baseInput,
    minHeight: 150,
    textAlignVertical: "top",
  },

  // --- Boxes / Containers Destacados ---
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
  box2: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.btn,
  },
  box3: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.btn,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.bgc,
  },

  // --- Botões ---
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

  // --- Tipografia ---
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
});

// ════════════════ //
// 4. EXPORTAÇÕES   //
// ════════════════ //

export const {
  // Layout
  container: Container,
  scroll: Scroll,
  center: Center,
  row: Row,
  column: Column,
  list: List,
  spaceBetween: SpaceBetween,
  line: Line,

  // Componentes
  info: Info,
  icon: Icon,
  card: Card,
  cardInfo: CardInfo,
  cardFooter: CardFooter,
  status: Status,

  // Boxes & Botões
  box: Box,
  box2: Box2,
  box3: Box3,
  btn: Btn,
  btn2: Btn2,
  btnText: BtnText,

  // Form
  form: Form,
  campoForm: CampoForm,
  campoInput: CampoInput,
  input: Input,
  inputIcon: InputIcon,
  textArea: TextArea,

  // Tipografia
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  label: Label,
  profile: Profile,
  profileText: ProfileText,
} = theme;
