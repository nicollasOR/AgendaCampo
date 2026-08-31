using System.Security.Cryptography;
using System.Text;
using AgendaCampo.DTOs.UsuarioDTO;
using AgendaCampo.Exceptions;

namespace AgendaCampo.Applications.Conversões;

public class ImagemParaDTO
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
    
    public static byte[] HashSenha_(string senha)
    {
        if (string.IsNullOrEmpty(senha)) 
            throw new DomainException("Senha é obrigatória"); 
        using var sha256 = SHA256.Create();
        return sha256.ComputeHash(Encoding.UTF8.GetBytes(senha));
    }
}