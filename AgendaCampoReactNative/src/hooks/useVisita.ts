import { useState } from "react";
import { CriarVisita, Visita } from "../@types/visita";
import { visitaService } from "../service/visitaService";
import { Alert } from "react-native";

export function useVisita(){

    const [visita, setVisita] = useState<Visita[]>([])

    async function agendarVisita(dados: CriarVisita){
        try{
            const novaVisita = await visitaService.agendar(dados);

            setVisita((visitaAnterior) => [novaVisita, ...visitaAnterior])
            return novaVisita;
        } catch(error){
            Alert.alert("Erro!", "Problema ao agendar visita!")
        }
    }

    return {
        visita,
        agendarVisita
    };
}

export default useVisita;