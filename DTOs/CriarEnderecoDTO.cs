using System.ComponentModel.DataAnnotations;

namespace AgendaCampo.DTOs
{
    public class CriarEnderecoDTO
    {
        public string Logradouro { get; set; } = null!;

        public string Bairro { get; set; } = null!;

        public int Numero { get; set; }


        [RegularExpression(
        @"^\d{5}-\d{3}$",
        ErrorMessage = "O CEP deve estar no formato 00000-000."
)]

        public string Cep { get; set; } = null!;


    }
}
