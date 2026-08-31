import { useEffect, useState } from "react";
import { visitaGet } from "../../@types/visitas";
import { visitaService } from "../service/visitaService"
import { Alert } from "react-native";

export function useVisita() {
    const [visita, setVisita] = useState<visitaGet[]>([]);

    async function listarVisita() {
        try {
            const dados = await visitaService.listar();
            setVisita(dados);
        } catch (error) {
            Alert.alert("Erro ao listar!")
        }
    }

    useEffect(() => {
        listarVisita();
    }, [])

}