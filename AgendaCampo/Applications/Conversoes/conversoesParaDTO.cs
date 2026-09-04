using System.Security.Cryptography;
using System.Text;
using AgendaCampo.DTOs.UsuarioDTO;
using AgendaCampo.Exceptions;

namespace AgendaCampo.Applications.Conversões;

public class conversoesParaDTO
{
    public static byte[] converterImg(IFormFile img)
    {
        if (img == null | img.Length == 0)
            return Array.Empty<byte>();
        using var ms = new MemoryStream();
        img.CopyTo(ms);
        return ms.ToArray();
    }

    public static IFormFile converterParaIFormFile(byte[] img)
    {
        if (img == null || img.Length == 0) return null!;

        var ms = new MemoryStream(img);
        ms.Position = 0;
        return new FormFile(ms, 0, img.Length, "img", "foto.jpg");
    }

    public static string converterParaString(byte[] img)
    {
        string base64 = Convert.ToBase64String(img);
        string caminhoURL = $"imagem/{base64}/";
        return caminhoURL;
    }
    // public static lerUsuarioDTO 
    
 
}