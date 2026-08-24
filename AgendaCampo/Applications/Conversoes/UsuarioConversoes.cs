using AgendaCampo.Domains;
using AgendaCampo.DTOs.UsuarioDTO;
using AgendaCampo.Applications.Conversoes;
using AgendaCampo.Applications.Validações;


namespace AgendaCampo.Applications.Conversoes;

public class UsuarioConversoes
{
    public static lerUsuarioDTO lerDTO(Usuario usuario)
    {
        lerUsuarioDTO usuarioDTO = new lerUsuarioDTO
        {
            usuarioID = usuario.usuarioID,
            email = usuario.email,
            nome = usuario.nome,
            // senha = 
            statusUsuario = usuario.statusUsuario ?? true,
            imgURL = $"usuario/{usuario.Imagem}/imagem"
        };

        return usuarioDTO;
    }
    

    public static atualizarUsuarioDTO atlzrDTO(Usuario usuario)
    {

        return new atualizarUsuarioDTO
        {
            email = usuario.email,
            img = converterImg.ConverterParaIFormFile(usuario.Imagem),
            nome = usuario.nome,
            statusUsuario = usuario.statusUsuario ?? true,
            usuarioID = usuario.usuarioID,

        };
    }
}