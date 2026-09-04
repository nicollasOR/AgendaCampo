import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { CriarVisita, Visita, VisitaGet } from "@/src/@types/visita";
import { visitaService } from "@/src/service/visitaService";

// export function useVisita() {

//   return {
//     visita,
//     agendarVisita,
//   };
// }

export function useVisita() {
  const [visita, setVisita] = useState<Visita[]>([]);

  const [visitaGet, setVisitaGet] = useState<VisitaGet[]>([]);

  async function agendarVisita(dados: CriarVisita): Promise<boolean> {
    try {
      const novaVisita = await visitaService.agendar(dados);
      setVisita((visitaAnterior) => [novaVisita, ...visitaAnterior]);
      Alert.alert("Sucesso!", "Visita agendada com sucesso.");
      return true;
    } catch (error: any) {
      console.error(
        "Erro ao agendar visita:",
        error?.response?.data || error.message,
      );
      Alert.alert(
        "Erro!",
        error?.response?.data?.message || "Não foi possível agendar a visita.",
      );
      return false;
    }
  }

  async function listarFuturasVisitas() {
    try {
      console.log("entrou");
      const dados = await visitaService.listarFuturasVisitas();
      console.log(dados);
      setVisitaGet(dados);
    } catch (error) {
      Alert.alert("Erro ao listar!");
    }
  }

  useEffect(() => {
    listarFuturasVisitas();
  }, []);

  return {
    visita,
    visitaGet,
    listarFuturasVisitas,
    agendarVisita,
  };
}
