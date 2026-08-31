using System.Security.Cryptography;
using System.Text;
using AgendaCampo.DTOs.UsuarioDTO;
using AgendaCampo.Exceptions;

namespace AgendaCampo.Applications.Conversões;

public class conversoesParaDTO
{
    public static byte[] converterImg(IFormFile img)
    {
        using var ms = new MemoryStream();
        img.CopyTo(ms);
        return ms.ToArray();
    }

    public static IFormFile converterParaIFormFile(byte[] img)
    {
        using var ms = new MemoryStream(img);
        return new FormFile(ms, 0, img.Length, string.Empty, string.Empty);
    }
    // public static lerUsuarioDTO 
    
 
}