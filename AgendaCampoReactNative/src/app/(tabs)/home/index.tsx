import { useCallback, useMemo } from "react";
import { useFocusEffect } from "expo-router";
import { useVisita } from "@/src/hooks/useVisita";
import { Text, View, FlatList } from "react-native";
import { useAuth } from "@/src/contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormatarPrimeiroEUltimoNome } from "@/src/utils/formatarNome";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

import {
  Box2,
  Colors,
  Column,
  Container,
  H2,
  P,
  Row,
  Scroll,
  SpaceBetween,
} from "@/src/constants/theme";
import AgendaCard from "@/src/components/agendaCard";
import VisitaIcon from "@/assets/svg/VisitaIcon.svg";
import { useAuthTESTE } from "@/src/contexts/AuthContextTESTE";

export default function Home() {
  const { usuario } = useAuthTESTE();
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

  useFocusEffect(
    useCallback(() => {
      console.log(`Teste das visitas: \n${visitasHoje} \n\n\n`)
      // console.log(`Teste:: \n \n ${visitaGet.map((varAux) => (
      //   varAux.visitaID
      // ))} \n acima visitaID`)
      listarFuturasVisitas();
    }, []),
  );

  return (
    <SafeAreaView style={[Container]} edges={["top", "left", "right"]}>
      <View style={[Column, { alignSelf: "flex-start", width: "100%" }]}>
        <View>
          <Text style={[H2, { color: Colors.darkblue }]}>
            Olá,{" "}
            {usuario?.nome
              ? FormatarPrimeiroEUltimoNome(usuario.nome)
              : "Visitante"}
          </Text>
          <Text style={[P, { color: Colors.gray }]}>
            Aqui estão suas visitas programadas.
          </Text>
        </View>
        <View style={[Row, SpaceBetween]}>
          <View style={Row}>
            <VisitaIcon color={Colors.darkblue} />
            <Text style={[H2, { color: Colors.darkblue }]}>
              Visitas Futuras
            </Text>
          </View>

          <View style={Box2}>
            <Text style={[P, { color: Colors.white }]}>
              {visitasHoje} Hoje 
            </Text>
          </View>
        </View>
      </View>

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
        <FlatList
          data={visitaGet}
          keyExtractor={(item) => String(item.visitaID)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Scroll}
          style={{ width: "100%" }}
          ListHeaderComponent={<View style={Column}></View>}
          renderItem={({ item }) => (
            <AgendaCard
              visitaID={item.visitaID}
              statusVisita={item.statusVisita}
              dataInicio={item.dataInicio}
              dataTermino={item.dataTermino}
              logradouro={item.logradouro}
              bairro={item.bairro}
              numero={item.numero}
              nomeEvento={item.nomeEvento}
              descricao={item.descricao}
              nomeCliente={item.nomeCliente}
              cep={item.cep}
              tecnicos={[]}
            />
          )}
        />
      </MaskedView>
    </SafeAreaView>
  );
}
