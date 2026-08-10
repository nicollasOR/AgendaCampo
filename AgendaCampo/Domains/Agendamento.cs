using System;
using System.Collections.Generic;

namespace AgendaCampo.Domains;

public partial class Agendamento
{
    public int agendaID { get; set; }

    public DateTime? data { get; set; }

    public string empresaSede { get; set; } = null!;

    public Guid usuarioID { get; set; }

    public bool statusAgenda { get; set; }

    public virtual Usuario usuario { get; set; } = null!;
}
