import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import MaskedView from "@react-native-masked-view/masked-view";
import { decodificarToken, useAuth } from "@/src/contexts/AuthContext";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import {
  Box,
  Btn2,
  Card,
  Colors,
  Column,
  Container,
  H2,
  P,
  Icon,
  Info,
  Row,
  H4,
  H1,
  BtnText,
  Scroll,
  Profile,
  ProfileText,
} from "@/src/constants/theme";
import SairIcon from "@/assets/svg/SairIcon.svg";
import AjudaIcon from "@/assets/svg/AjudaIcon.svg";
import ArrowIcon from "@/assets/svg/ArrowIcon.svg";
import PerfilIcon from "@/assets/svg/PerfilIcon.svg";
import VisitaIcon from "@/assets/svg/VisitaIcon.svg";
import DetalheIcon from "@/assets/svg/DetalheIcon.svg";
import CadeadoIcon from "@/assets/svg/CadeadoIcon.svg";
import RelogioIcon from "@/assets/svg/RelogioIcon.svg";
import { FormatarIconNome } from "@/src/utils/formatarNome";

export default function Perfil() {
  const router = useRouter();

  // const { usuario, logout } = useAuth();

  const usuario = decodificarToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFmNTZiMDdmLTQxNDMtNDdjYy1hMmFjLWM5OTI0ZTMwMmY0NyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJBbsO0bmltbyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFAYSIsImV4cCI6MTc4NzkyOTkzMCwiYXVkIjoiQWdlbmRhQ2FtcG9Gcm9udCJ9.PhEzxmDTKfkNriVrILwzbzB_BLrk0yP0O8KH-RbQZtk",
  );

  return (
    <SafeAreaView style={Container} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={Colors.smoothGradient}
        style={Info}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={[Profile, { overflow: "hidden" }]}>
          {usuario?.img ? (
            <Image
              source={require("@/assets/img/perfil.jpg")}
              style={{ width: 120, height: 120 }}
            />
          ) : (
            <Text style={ProfileText}>
              {usuario?.nome ? FormatarIconNome(usuario.nome) : ":/"}
            </Text>
          )}
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={H1}>{usuario?.nome}</Text>
          <View style={Row}>
            <PerfilIcon color={Colors.darkblue} />
            <Text style={H4}>{usuario?.email}</Text>
          </View>
        </View>
      </LinearGradient>

      <MaskedView
        style={{ flex: 1, width: "100%" }}
        maskElement={
          <LinearGradient
            colors={["transparent", "black", "black", "transparent"]}
            locations={[0, 0.1, 0.975, 1]}
            style={{ flex: 1 }}
          />
        }
      >
        <ScrollView
          contentContainerStyle={Scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={[Column, Card]}>
            <View style={[Icon, { backgroundColor: Colors.smoothBgc2 }]}>
              <DetalheIcon color={Colors.blue} />
            </View>
            <View>
              <Text style={P}>Visitas esse mês</Text>
              <Text style={H2}>42</Text>
            </View>
          </View>

          <View style={[Column, Card]}>
            <View style={[Icon, { backgroundColor: Colors.darkblue }]}>
              <VisitaIcon color={Colors.white} />
            </View>
            <View>
              <Text style={P}>Visitas hoje</Text>
              <Text style={H2}>3</Text>
            </View>
          </View>

          <View style={[Column, Card]}>
            <View style={[Icon, { backgroundColor: Colors.smoothBgc2 }]}>
              <RelogioIcon color={Colors.blue} />
            </View>
            <View>
              <Text style={P}>Pontualidade</Text>
              <Text style={H2}>98%</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[Box, { width: "100%" }]}
            activeOpacity={0.75}
          >
            <View style={Row}>
              <View style={[Icon, { backgroundColor: Colors.smoothBgc2 }]}>
                <PerfilIcon color={Colors.blue} />
              </View>
              <Text style={H4}>Dados Pessoais</Text>
            </View>
            <ArrowIcon color={Colors.darkblue} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[Box, { width: "100%" }]}
            activeOpacity={0.75}
          >
            <View style={Row}>
              <View style={[Icon, { backgroundColor: Colors.smoothBgc2 }]}>
                <AjudaIcon color={Colors.blue} />
              </View>
              <Text style={H4}>Ajuda e Suporte</Text>
            </View>
            <ArrowIcon color={Colors.darkblue} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[Box, { width: "100%" }]}
            activeOpacity={0.75}
            onPress={() => router.push("/alterarsenha")}
          >
            <View style={Row}>
              <View style={[Icon, { backgroundColor: Colors.smoothBgc2 }]}>
                <CadeadoIcon color={Colors.blue} />
              </View>
              <Text style={H4}>Alterar Senha</Text>
            </View>
            <ArrowIcon color={Colors.darkblue} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              Btn2,
              Row,
              {
                backgroundColor: Colors.lightred,
                borderWidth: 2,
                borderColor: Colors.red,
              },
            ]}
            activeOpacity={0.75}
            // onPress={logout}
          >
            <SairIcon color={Colors.darkred} />
            <Text style={[BtnText, { color: Colors.darkred }]}>
              Sair da Conta
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </MaskedView>
    </SafeAreaView>
  );
}
