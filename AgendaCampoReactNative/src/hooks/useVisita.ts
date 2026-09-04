import { useEffect, useState } from "react";
import { visitaGet, visitaGetHome } from "../@types/visitas";
import { visitaService } from "../service/visitaService"
import { Alert } from "react-native";

export function useVisita() {
    const [visita, setVisita] = useState<visitaGetHome[]>([]);

    async function listarFuturasVisitas() {
        try {
            console.log("entrou")
            const dados = await visitaService.listarFuturasVisitas();
            console.log(dados)
            setVisita(dados);
        } catch (error) {
            Alert.alert("Erro ao listar!")
        }
    }

    useEffect(() => {
        listarFuturasVisitas();
    }, [])

    return {
        visita,
        listarFuturasVisitas
    };

}