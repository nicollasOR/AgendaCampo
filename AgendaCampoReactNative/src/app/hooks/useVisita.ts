import { useEffect, useState } from "react";
import { visitaGet } from "../../@types/visitas";
import { visitaService } from "../service/visitaService"
import { Alert } from "react-native";

export function useVisita() {
    const [visita, setVisita] = useState<visitaGet[]>([]);

    async function listarFuturasVisitas() {
        try {
            const dados = await visitaService.listarFuturasVisitas();
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