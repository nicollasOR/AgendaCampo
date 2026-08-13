using System;
using System.Collections.Generic;

namespace AgendaCampo.Domains;

public partial class Endereco
{
    public int enderecoID { get; set; }

    public string logradouro { get; set; } = null!;

    public string bairro { get; set; } = null!;

    public int numero { get; set; }

    public string cep { get; set; } = null!;

    public virtual ICollection<Visita> Visita { get; set; } = new List<Visita>();
}
