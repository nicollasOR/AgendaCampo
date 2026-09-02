import { useEffect, useState } from "react";
import { visitaService } from "../service/visitaService";
import {visitaGet} from "../@types"
import { Alert } from "react-native";

export function useVisitaServiceDetalhe(id: string ) {
    const [visita, setVisita] = useState<visitaGet | null>(null)

    async function buscarVisitaDetalhe()
    {
        try 
        {
            const response = await visitaService.buscarPorId(id)
            setVisita(response)
        } catch (error:any) {
            Alert.alert("Visita não encontrada!", "Recarregue novamente...")
        }
    }

    async function removerVisita() {
        try {
            const response = await visitaService.remover(id)
            setVisita(response)
        } catch (error: any) {
            Alert.alert("Não foi possível remover o ", `${visita?.visitaID}`)
        }
    }

    async function reagendarVisita(dataInicial:Date, dataFinal:Date) {
        
        
    }
    

    
    useEffect(() => {
        buscarVisitaDetalhe()
        removerVisita()
    }, [])

        const formatarData = (dataStr?: Date) => {
        if (!dataStr) return '';
        try {
            const data = new Date()
            return isNaN(data.getTime()) ? dataStr : data.toLocaleDateString('pt-BR');
        } catch {
            return dataStr;
        }
    };

    return {
        visita,
        dataInicialFormatada: formatarData(visita?.dataInicio),
        dataFinalFormatada: formatarData(visita?.dataTermino)
        // dataFormatada: formatarData(os)
    }

}