import { visitaGet } from "../@types";
import { api } from "./api";

export const visitaService = {
    async listar(): Promise<visitaGet[]>{
        const response = await api.get<visitaGet[]>("Visita")
        return response.data
    },

    async buscarPorId(id: number | string): Promise<visitaGet>{
        const response = await api.get<visitaGet>(`Visita${id}`)
        return response.data
    },

}