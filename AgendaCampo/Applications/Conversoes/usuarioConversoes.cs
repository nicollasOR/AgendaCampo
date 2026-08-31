using AgendaCampo.Domains;
using AgendaCampo.DTOs.UsuarioDTO;

namespace AgendaCampo.Applications.Conversões;

public class usuarioConversoes
{
    public static lerUsuarioDTO lerUsuarioDTO(Usuario usuario)
    {
        return new lerUsuarioDTO
        {
            usuarioID = usuario.usuarioID,
            email = usuario.email,
            nome = usuario.nome,
            imgURL = $"usuario/{usuario.Imagem}/imagem",
            statusUsuario = usuario.statusUsuario == true
        };
    }

    public static atualizarUsuarioDTO atualizarUsuarioDTO(Usuario usuario)
    {
        return new atualizarUsuarioDTO
        {
            nome = usuario.nome,
            email = usuario.email,
            img = ImagemParaDTO.converterParaIFormFile(usuario.Imagem),
            senha =
        };
    }
    
    public static atualizarSenhaDTO atualizarSenhaUsuarioDTO()
}