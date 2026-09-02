using System;
using System.Collections.Generic;

namespace AgendaCampo.Domains;

public partial class Visita
{
    public int visitaID { get; set; }

    public int statusVisitaID { get; set; }

    public string cliente { get; set; } = null!;

    public string? sedeVisitada { get; set; }

    public string titulo { get; set; } = null!;

    public string? descricao { get; set; }

    public DateTime dataInicio { get; set; }

    public DateTime dataTermino { get; set; }

    public string logradouro { get; set; } = null!;

    public string bairro { get; set; } = null!;

    public int numero { get; set; }

    public string cep { get; set; } = null!;

    public bool StatusVisitaBit { get; set; }

    public virtual StatusVisita statusVisita { get; set; } = null!;

    public virtual ICollection<Usuario> usuario { get; set; } = new List<Usuario>();
}
