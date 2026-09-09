import { useState } from "react";
import { Alert } from "react-native";

import { visitaService } from "@/src/service/visitaService";
import { CriarVisita, Visita, VisitaGet } from "@/src/@types/visita";

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
      const mensagemErro =
        error?.response?.data?.mensagem ||
        error?.response?.data?.message || //ele tenta duas vezes???
        (typeof error?.response?.data === "string"
          ? error.response.data
          : null) ||
        error?.message ||
        "Não foi possível agendar a visita.";
      Alert.alert("Erro!", mensagemErro);
      return false;
    }
  }

  async function listarFuturasVisitas() {
    try {
      const dados = await visitaService.listarFuturasVisitas();
      setVisitaGet(dados);
    } catch (error) {
      console.log("Sem visitas!");
    }
  }

  return {
    visita,
    visitaGet,
    listarFuturasVisitas,
    agendarVisita,
  };
}
