import { useEffect, useState } from "react";

import { VisitaGet, visitaPatch } from "@/src/@types/visita";
import { visitaService } from "../service/visitaService";
import { Alert } from "react-native";
import {formatacoes} from "@/src/utils/converterData"

export function useVisitaDetalhes(id: number | string) {
  const [visita, setVisita] = useState<VisitaGet | undefined>();
  const [loading, setLoading] = useState(false);

  async function loadVisita() {
    try {
      const dados = await visitaService.buscarPorId(Number(id));
      setVisita(dados);
    } catch (error: any) {
      const dados =
        error.response.data?.mensagem || "Não foi possível buscar a visita";
      Alert.alert("Erro!", dados);
    }
  }

  async function remover() {
    try {
      const dados = await visitaService.remover(Number(id));
      setVisita(dados);
      
    } catch (error: any) {
      const mensagem = error.response.data.mensagem || "Erro ao cancelar..";
      Alert.alert("Erro!", mensagem);
    }
  }

  async function reagendarHooks(dataInicial: Date, dataFinal: Date) {
    try {
      const dadosData: visitaPatch = {
        // dataInicio: dataInicial.toISOString(),
        // dataTermino: dataFinal.toISOString(),
        dataInicio:   formatacoes.formatacaoPATCH(dataInicial),
        dataFinal:  formatacoes.formatacaoPATCH(dataFinal)
      };

      console.log("Payload na api:", JSON.stringify(dadosData))

      // const response = await visitaService.reagendar(Number(id), dadosData);
      await visitaService.reagendar(Number(id), dadosData);
      Alert.alert("Visita reagendada!");
      // return response
      return true
    } catch (error: any) {

      console.log("ERRO DA API", error?.response.data)
      const mensagem =
        error.response.data.mensagem || "Não Foi possível reagendar";
      Alert.alert("Erro ao reagendar", mensagem);
      return false
    }
  }

  useEffect(() => {
    loadVisita();
    // remover()
  }, []);
  const formatarData = (dataStr?: string | Date) => {
    if (!dataStr) return "";
    try {
      const data = dataStr instanceof Date ? dataStr : new Date(dataStr);
      return isNaN(data.getTime())
        ? String(dataStr)
        : data.toLocaleString("pt-BR");
    } catch {
      return String(dataStr);
    }
  };
  return {
    visita,
    reagendarHooks,
    formatarData,
    remover,
  };
}
