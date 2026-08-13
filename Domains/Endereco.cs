using System;
using System.Collections.Generic;

namespace AgendaCampo.Models;

public partial class Endereco
{
    public int EnderecoId { get; set; }

    public string Logradouro { get; set; } = null!;

    public string Bairro { get; set; } = null!;

    public int Numero { get; set; }

    public string? Cep { get; set; } = null!;
}
