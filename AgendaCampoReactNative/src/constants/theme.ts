import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// ════════════════════════════════ //
//  1. DESIGN (Cores e Tipografia)  //
// ════════════════════════════════ //

export const Colors = {
<<<<<<< HEAD
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
=======
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
>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416

const Font = {
  regular: "Outfit_400Regular",
  semibold: "Outfit_600SemiBold",
  bold: "Outfit_700Bold",
<<<<<<< HEAD
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
=======
>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416
};

// ═══════════════ //
// 3. STYLESHEET   //
// ═══════════════ //

export const theme = StyleSheet.create({
  // --- Layout & Containers ---
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.bgc,
<<<<<<< HEAD
  },
  scroll: {
    gap: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 32,
  },
=======
  } as ViewStyle,

>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416
  center: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
<<<<<<< HEAD
  },
=======
  } as ViewStyle,

>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416
  row: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
<<<<<<< HEAD
  },
=======
  } as ViewStyle,

>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416
  column: {
    gap: 12,
    flexDirection: "column",
<<<<<<< HEAD
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
=======
    justifyContent: "center",
  } as ViewStyle,
>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416

  // --- Visual & Componentes Gerais ---
  info: {
    gap: 12,
    padding: 32,
    width: "90%",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
<<<<<<< HEAD
  },
=======
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

>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416
  icon: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
<<<<<<< HEAD
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
=======
  } as ViewStyle,
>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416

  // --- Cards ---
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: Colors.bgc,
<<<<<<< HEAD
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
  campoInputImg: {
    gap: 5,
    width: 160,
    height: 160,
    borderWidth: 2,
    borderRadius: 40,
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "row",
    borderStyle: "dashed",
    justifyContent: "center",
    borderColor: Colors.btn,
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
  inputImg: {
    width: "100%",
    height: "100%",
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
=======
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  } as ViewStyle,
>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416

  // --- Botões ---
  btn: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
<<<<<<< HEAD
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
=======
    backgroundColor: Colors.blue,
  } as ViewStyle,

>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416
  btnText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Font.semibold,
  } as TextStyle,

  // --- Tipografia ---
  h1: {
    fontSize: 32,
    fontFamily: Font.bold,
<<<<<<< HEAD
  },
=======
    color: Colors.darkblue,
  } as TextStyle,

>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416
  h2: {
    fontSize: 26,
    fontFamily: Font.semibold,
<<<<<<< HEAD
  },
=======
    color: Colors.darkblue,
  } as TextStyle,

>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416
  h3: {
    fontSize: 22,
<<<<<<< HEAD
  },
=======
    fontFamily: Font.regular,
    color: Colors.darkblue,
  } as TextStyle,

>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416
  h4: {
    fontSize: 18,
<<<<<<< HEAD
  },
=======
    fontFamily: Font.regular,
    color: Colors.darkblue,
  } as TextStyle,

>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416
  p: {
    fontSize: 15,
<<<<<<< HEAD
  },
  label: {
    ...baseText,
    fontSize: 18,
    fontFamily: Font.semibold,
  },
  textImg: {
    ...baseText,
    fontSize: 16,
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
  campoInputImg: CampoInputImg,
  input: Input,
  inputIcon: InputIcon,
  inputImg: InputImg,
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
  textImg: TextImg,
} = theme;
=======
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
>>>>>>> 15d272fa05319d5f3c5c25cae4d62aa6cf4a2416
