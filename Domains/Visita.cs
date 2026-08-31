using System;
using System.Collections.Generic;

namespace AgendaCampo.Domains;

public partial class Visita
{
    public int visitaID { get; set; }

    public int agendamentoID { get; set; }

    public int enderecoID { get; set; }

    public string? sedeVisitada { get; set; }

    public string titulo { get; set; } = null!;

    public string? descricao { get; set; }

    public bool statusRealizado { get; set; }

    public DateTime dataInicio { get; set; }

    public DateTime dataTermino { get; set; }

    public virtual Agendamento agendamento { get; set; } = null!;

    public virtual Endereco endereco { get; set; } = null!;
}
