import { visitaGet } from "@/src/@types/visitas"
import { api } from "./api"

export const visitaService = {
    async listar(): Promise<visitaGet[]>{
        const response = await api.get<visitaGet[]>("Visita")
        return response.data
    },

    async buscarPorId(id: number): Promise<visitaGet>{
        const response = await api.get<visitaGet>(`Visita${id}`)
        return response.data
    },

    async listarFuturasVisitas(): Promise<visitaGet[]>{
        const response = await api.get<visitaGet[]>("Visita/futurasVisitas")
        return response.data
    }
}