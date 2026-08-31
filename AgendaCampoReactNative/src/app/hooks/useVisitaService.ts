import { useEffect, useState } from "react";
import { visitaService } from "../service/visitaService";
import {enderecoGET_Visita, usuarioGET_Visita, visitaGet} from "../@types"
import { Alert } from "react-native";

export function useVisitaServiceDetalhe(id: number) {
    const [visita, setVisita] = useState<visitaGet | null>(null)

    async function buscarVisitaDetalhe()
    {
        try {
            const response = await visitaService.buscarPorId(id)
            setVisita(response)
        } catch (error:any) {
            Alert.alert("Visita não encontrada!", "Recarregue novamente...")
        }
    }

    
    useEffect(() => {
        buscarVisitaDetalhe()
    }, [])


    

}