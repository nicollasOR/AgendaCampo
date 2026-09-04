import { visitaGet, visitaGetHome, visitaPatch } from "@/src/@types/visitas"
import { api } from "./api"

export const visitaService = {
    async listar(): Promise<visitaGet[]>{
        const response = await api.get<visitaGet[]>("Visita")
        return response.data
    },

    async buscarPorId(id: number): Promise<visitaGet>{
        const response = await api.get<visitaGet>(`Visita/${id}`)
        return response.data
    },

    async listarFuturasVisitas(): Promise<visitaGetHome[]>{
        
        const response = await api.get<visitaGetHome[]>("Visita/futurasVisitas")
        console.log(response)
        return response.data
    },

    async remover(id: number): Promise<visitaGet>{
        const response = await api.delete<visitaGet>("Visita/" + id)
        return response.data
    },


    async reagendar(id: number, dados: visitaPatch) : Promise<visitaPatch>{
        const response = await api.patch<visitaPatch>("Visita/reagendar" + id, dados)
        return response.data
    }
}