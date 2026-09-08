// import { Form } from "../constants/theme";
import { atualizarSenha, atualizarUsuario, usuarioPOST, usuarioPUT } from "../service/usuarioService";

export async function atualizarUsuarioHooks(usuarioId: string, usuarioDTO: usuarioPUT) {

    return await atualizarUsuario(usuarioId, usuarioDTO)
}

export async function atualizarSenhaHooks(usuarioId: string, senha: string) {

    return await atualizarSenha(usuarioId, senha)
    
}

