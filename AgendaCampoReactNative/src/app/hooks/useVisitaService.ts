import { useEffect, useState } from "react";
import { visitaService } from "../service/visitaService";
import {enderecoGET_Visita, usuarioGET_Visita, visitaGet} from "../@types"
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

    
    useEffect(() => {
        buscarVisitaDetalhe()
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