import { useRouter } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import MaskedView from "@react-native-masked-view/masked-view";
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
  Center,
} from "@/src/constants/theme";
import { useImage } from "@/src/hooks/useImage";
import { FormatarIconNome } from "@/src/utils/formatarNome";
import SairIcon from "@/assets/svg/SairIcon.svg";
import AjudaIcon from "@/assets/svg/AjudaIcon.svg";
import ArrowIcon from "@/assets/svg/ArrowIcon.svg";
import PerfilIcon from "@/assets/svg/PerfilIcon.svg";
import VisitaIcon from "@/assets/svg/VisitaIcon.svg";
import DetalheIcon from "@/assets/svg/DetalheIcon.svg";
import CadeadoIcon from "@/assets/svg/CadeadoIcon.svg";
import RelogioIcon from "@/assets/svg/RelogioIcon.svg";
import EditarPerfilIcon from "@/assets/svg/EditarPerfilIcon.svg";
import { useAuthTESTE } from "@/src/contexts/AuthContextTESTE";
import { useMemo } from "react";
import { useVisita } from "@/src/hooks/useVisita";

export default function Perfil() {
  const router = useRouter();
 const { visita, visitaGet, listarFuturasVisitas } = useVisita();

  // function visitasHoje()
  // {
  //   const hoje = new Date().toLocaleDateString('pt-BR')
  //   const visitasdeHoje = visitaGet.filter((varAux) => {
  //     const visitaBanco = varAux.dataInicio.toLocaleDateString('pt-BR')
  //     return visitaBanco === hoje
  //     }
  //   )

  //   return visitasdeHoje.length





    
  // }
                      //armazenamento de memoria para usar essa const uma única vez
const visitasHoje = useMemo(() => {
  // Pega o dia, mês e ano LOCAIS (dê ênfase nisso, pois não funciona por conta disso..) do celular/emulador
  const hoje = new Date();
  const diaHj = String(hoje.getDate()).padStart(2, "0");
  const mesHj = String(hoje.getMonth() + 1).padStart(2, "0"); //obrigado por mostrar o caminho das pedras mayara 
  const anoHj = hoje.getFullYear();
  
  const hojeFormatado = `${diaHj}/${mesHj}/${anoHj}`; // seria:  "07/09/2026" ou "08/09/2026"  

  const vstBancoHoje = visitaGet.filter((varAux) => {
    if (!varAux.dataInicio) 
      return false;
    // retirando o 08T06:31:09.145Z da visita
    const partesData = String(varAux.dataInicio).split("T")[0].split("-");
    
    if (partesData.length < 3) 
      return false;

    const anoBanco = partesData[0];
    const mesBanco = partesData[1];
    const diaBanco = partesData[2];

    const dataBancoFormatada = `${diaBanco}/${mesBanco}/${anoBanco}`;

    return dataBancoFormatada === hojeFormatado;
  });

  return vstBancoHoje.length; // aqui seria para ele retornar apenas o numero de visitas no dia como um number,
                              //  mas não retornar por conta da localização do dispositivo
}, [visitaGet]);


const visitasMês = useMemo(() => {
  const mesAtual = new Date()
  const mesHj = String(mesAtual.getDate()).padStart(2, '0')
  const anoHj = mesAtual.getFullYear()

  const mesFormatado = `${mesHj}/${anoHj}` // para debug btw

  const vstBancoHoje = visitaGet.filter((varAux) => {
    if(!varAux.dataInicio)
      return false
    
    const ptsData = String(varAux.dataInicio).split("T")[0].split("-")

    if(ptsData.length < 3)
      return false

    const anoBanco = ptsData[0]
    const mesBanco = ptsData[1]

    const dataBancoFormat = `${mesBanco}/${anoBanco}`
    return dataBancoFormat === mesFormatado
  })
  return vstBancoHoje.length
},[visitaGet])


  const { usuario, logout } = useAuthTESTE();
  // const { usuario, logout } = useAuth();

  const { getImagemUrl } = useImage();
  const fotoPerfilUri = getImagemUrl(usuario?.imgURL);

  return (
    <SafeAreaView style={Container} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={Colors.smoothGradient}
        style={Info}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={[Profile, { overflow: "hidden" }]}>
          {fotoPerfilUri ? (
            <Image
              source={{ uri: fotoPerfilUri }}
              style={{ width: 120, height: 120 }}
            />
          ) : (
            <Text style={ProfileText}>
              {usuario?.nome ? FormatarIconNome(usuario.nome) : ":)"}
            </Text>
          )}
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={[H1, { textAlign: "center" }]}>{usuario?.nome}</Text>
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
            locations={[0, 0.1, 1, 1]}
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
              <Text style={H2}>{visitasMês}</Text>
            </View>
          </View>

          <View style={[Column, Card]}>
            <View style={[Icon, { backgroundColor: Colors.darkblue }]}>
              <VisitaIcon color={Colors.white} />
            </View>
            <View>
              <Text style={P}>Visitas hoje</Text>
              <Text style={H2}>{visitasHoje}</Text>
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
            onPress={() => router.push("/cadastro")}
          >
            <View style={Row}>
              <View style={[Icon, { backgroundColor: Colors.smoothBgc2 }]}>
                <EditarPerfilIcon color={Colors.blue} />
              </View>
              <Text style={H4}>Editar Perfil</Text>
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
            onPress={logout}
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
