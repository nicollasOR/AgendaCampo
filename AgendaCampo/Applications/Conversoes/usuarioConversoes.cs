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
            statusUsuario = usuario.statusUsuario ? true : false
        };
    }

    public static atualizarUsuarioDTO atualizarUsuarioDTO(Usuario usuario)
    {
        return new atualizarUsuarioDTO
        {
            nome = usuario.nome,
            email = usuario.email,
            img = conversoesParaDTO.converterParaIFormFile(usuario.Imagem)
        };
    }
    
}