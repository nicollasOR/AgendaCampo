import { useState } from "react";
import { Alert } from "react-native";
import { CriarVisita, Visita } from "@/src/@types/visita";
import { visitaService } from "@/src/service/visitaService";

export function useVisita() {
  const [visita, setVisita] = useState<Visita[]>([]);

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

  return {
    visita,
    agendarVisita,
  };
}

export default useVisita;
