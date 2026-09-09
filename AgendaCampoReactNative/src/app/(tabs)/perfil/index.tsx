import React, { useMemo } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import MaskedView from "@react-native-masked-view/masked-view";

import { useImage } from "@/src/hooks/useImage";
import { useVisita } from "@/src/hooks/useVisita";
import { useAuth } from "@/src/contexts/AuthContext";
import { FormatarIconNome } from "@/src/utils/formatarNome";

import { Colors, theme } from "@/src/constants/theme";

import SairIcon from "@/assets/svg/SairIcon.svg";
import ArrowIcon from "@/assets/svg/ArrowIcon.svg";
import PerfilIcon from "@/assets/svg/PerfilIcon.svg";
import VisitaIcon from "@/assets/svg/VisitaIcon.svg";
import CadeadoIcon from "@/assets/svg/CadeadoIcon.svg";
import DetalheIcon from "@/assets/svg/DetalheIcon.svg";
import EditarPerfilIcon from "@/assets/svg/EditarPerfilIcon.svg";

export default function Perfil() {
  const router = useRouter();
  const { visitaGet } = useVisita();
  const { usuario, logout } = useAuth();
  const { getImagemUrl } = useImage();

  const fotoPerfilUri = getImagemUrl(usuario?.imgURL);

  const visitasHoje = useMemo(() => {
    const hoje = new Date();
    const diaHj = String(hoje.getDate()).padStart(2, "0");
    const mesHj = String(hoje.getMonth() + 1).padStart(2, "0");
    const anoHj = hoje.getFullYear();

    const hojeFormatado = `${diaHj}/${mesHj}/${anoHj}`;

    const vstBancoHoje = visitaGet.filter((varAux) => {
      if (!varAux.dataInicio) return false;

      const partesData = String(varAux.dataInicio).split("T")[0].split("-");
      if (partesData.length < 3) return false;

      const anoBanco = partesData[0];
      const mesBanco = partesData[1];
      const diaBanco = partesData[2];

      const dataBancoFormatada = `${diaBanco}/${mesBanco}/${anoBanco}`;
      return dataBancoFormatada === hojeFormatado;
    });

    return vstBancoHoje.length;
  }, [visitaGet]);

  const visitasMes = useMemo(() => {
    const hoje = new Date();
    const mesHj = String(hoje.getMonth() + 1).padStart(2, "0");
    const anoHj = hoje.getFullYear();

    const mesFormatado = `${mesHj}/${anoHj}`;

    const vstBancoMes = visitaGet.filter((varAux) => {
      if (!varAux.dataInicio) return false;

      const ptsData = String(varAux.dataInicio).split("T")[0].split("-");
      if (ptsData.length < 3) return false;

      const anoBanco = ptsData[0];
      const mesBanco = ptsData[1];

      const dataBancoFormat = `${mesBanco}/${anoBanco}`;
      return dataBancoFormat === mesFormatado;
    });

    return vstBancoMes.length;
  }, [visitaGet]);

  return (
    <SafeAreaView style={theme.container} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={Colors.smoothGradient}
        style={theme.info}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={[theme.profile, { overflow: "hidden" }]}>
          {fotoPerfilUri ? (
            <Image
              source={{ uri: fotoPerfilUri }}
              style={{ width: 120, height: 120 }}
            />
          ) : (
            <Text style={theme.profileText}>
              {usuario?.nome ? FormatarIconNome(usuario.nome) : ":)"}
            </Text>
          )}
        </View>

        <View style={theme.center}>
          <Text style={[theme.h1, { textAlign: "center" }]}>
            {usuario?.nome}
          </Text>
          <View style={theme.row}>
            <PerfilIcon color={Colors.darkblue} />
            <Text style={theme.h4}>{usuario?.email}</Text>
          </View>
        </View>
      </LinearGradient>

      <MaskedView
        style={{ flex: 1, width: "100%" }}
        maskElement={
          <LinearGradient
            colors={["transparent", "black", "black", "transparent"]}
            locations={[0, 0.1, 1, 1]}
            style={{ flex: 1 }}
          />
        }
      >
        <ScrollView
          contentContainerStyle={theme.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={[theme.column, theme.card]}>
            <View style={[theme.icon, { backgroundColor: Colors.smoothBgc2 }]}>
              <DetalheIcon color={Colors.blue} />
            </View>
            <View>
              <Text style={theme.p}>Visitas esse mês</Text>
              <Text style={theme.h2}>{visitasMes}</Text>
            </View>
          </View>

          <View style={[theme.column, theme.card]}>
            <View style={[theme.icon, { backgroundColor: Colors.darkblue }]}>
              <VisitaIcon color={Colors.white} />
            </View>
            <View>
              <Text style={theme.p}>Visitas hoje</Text>
              <Text style={theme.h2}>{visitasHoje}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[theme.box2, { width: "100%" }]}
            activeOpacity={0.75}
            onPress={() => router.push("/cadastro")}
          >
            <View style={theme.row}>
              <View style={[theme.icon, { backgroundColor: Colors.bgc }]}>
                <EditarPerfilIcon color={Colors.blue} />
              </View>
              <Text style={[theme.h4, { color: Colors.darkblue }]}>
                Editar Perfil
              </Text>
            </View>
            <ArrowIcon color={Colors.darkblue} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[theme.box2, { width: "100%" }]}
            activeOpacity={0.75}
            onPress={() => router.push("/alterarsenha")}
          >
            <View style={theme.row}>
              <View style={[theme.icon, { backgroundColor: Colors.bgc }]}>
                <CadeadoIcon color={Colors.blue} />
              </View>
              <Text style={[theme.h4, { color: Colors.darkblue }]}>
                Alterar Senha
              </Text>
            </View>
            <ArrowIcon color={Colors.darkblue} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              theme.btn2,
              theme.row,
              {
                backgroundColor: Colors.lightred,
                borderWidth: 2,
                borderColor: Colors.red,
              },
            ]}
            activeOpacity={0.75}
            onPress={logout}
          >
            <SairIcon color={Colors.darkred} />
            <Text style={[theme.btnText, { color: Colors.darkred }]}>
              Sair da Conta
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </MaskedView>
    </SafeAreaView>
  );
}
