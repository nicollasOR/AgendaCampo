// import { Form } from "../constants/theme";
import { atualizarSenha, atualizarUsuario, usuarioPOST, usuarioPUT } from "../service/usuarioService";

export async function atualizarUsuarioHooks(usuarioId: string, usuarioDTO: usuarioPUT) {

    return await atualizarUsuario(usuarioId, usuarioDTO)
}

export async function atualizarSenhaHooks(usuarioId: string, senha: string) {

    return await atualizarSenha(usuarioId, senha)
    
}

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
