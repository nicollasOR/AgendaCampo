import { useEffect, useState } from "react";

// import { visitaGet, visitaGetHome } from "../@types";
import { visitaGet, visitaGetHome, visitaPatch } from "@/src/@types/visitas";
import { visitaService } from "../service/visitaService";
import { Alert } from "react-native";

export function useVisitaDetalhes(id: number | string) {

    const [visita, setVisita] = useState<visitaGet | undefined>()
    const [loading, setLoading] = useState(false);

    async function loadVisita() {
        try
        {
                const dados = await visitaService.buscarPorId(Number(id))
                setVisita(dados)
        }
        catch(error: any)
        {
            const dados = error.response.data?.mensagem || "Não foi possível buscar a visita"
            Alert.alert("Erro!", dados)
        }
    }

    async function remover()
    {
        try
        {
            const dados = await visitaService.remover(Number(id))
            setVisita(dados)
        }

        catch(error: any)
        {
            const mensagem = error.response.data.mensagem || "Erro ao cancelar.."
            Alert.alert("Erro!", mensagem)
        }
    
    }

    async function reagendar(dataInicial: Date, dataFinal: Date){
        try
        {
            const dadosData: visitaPatch = {
                dataInicio: dataInicial.toISOString(),
                dataTermino: dataFinal.toISOString()    
            }

            const response = await visitaService.reagendar(Number(id), dadosData)
            Alert.alert("Visita reagendada!")
        }

        catch(error: any)
        {
            const mensagem = error.response.data.mensagem || "Não Foi possível reagendar"
            Alert.alert("Erro ao reagendar", mensagem)
        }
    }

    useEffect(() => {
        loadVisita()
        // remover()

    }, [])
    const formatarData = (dataStr?: string | Date) => {
    if (!dataStr) return '';
        try {
        const data = dataStr instanceof Date ? dataStr : new Date(dataStr);
        return isNaN(data.getTime()) ? String(dataStr) : data.toLocaleString('pt-BR');
        } catch 
        {
        return String(dataStr);
        }
    }
    return {
        visita,
        reagendar,
        formatarData,
        remover
    }
    
}