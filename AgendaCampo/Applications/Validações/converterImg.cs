namespace AgendaCampo.Applications.Validações;

public class converterImg
{
    public static byte[] ConverterImg(IFormFile img)
    {
        using var newImg = new MemoryStream();
        img.CopyTo(newImg);
        return newImg.ToArray();
    }
    
    public static IFormFile ConverterParaIFormFile(byte[] bytes)
    {
        using var stream = new MemoryStream(bytes);

        return new FormFile(stream, 0, bytes.Length, string.Empty, string.Empty);
    }
}