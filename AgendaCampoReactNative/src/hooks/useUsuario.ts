import { useEffect, useState } from "react";
import { Usuario } from "../@types/auth";
import { listarUsuario, UsuarioService } from "../service/usuarioService";

export function useUsuario() {
    const [usuario, setUsuario] = useState<Usuario[]>([]);

    async function carregarUsuarios() {
        try {
            const dados = await UsuarioService.listarUsuario();
            setUsuario(dados);
        } catch (error) {
            console.error("Erro ao carregar usuários.")
        }
    }

    useEffect(() => {
        carregarUsuarios();
    }, [])
    
    return usuario;
}