namespace AgendaCampo.DTOs.EnderecoDTO;

public class lerEnderecoDTO
{
    public int EnderecoId { get; set; }

    public string Logradouro { get; set; } = null!;

    public string Bairro { get; set; } = null!;

    public int Numero { get; set; }

    public string Cep { get; set; } = null!;
}