using System;
using System.Collections.Generic;

namespace AgendaCampo.Domains;

public partial class StatusVisita
{
    public int statusVisitaID { get; set; }

    public string nomeStatus { get; set; } = null!;

    public virtual ICollection<Visita> Visita { get; set; } = new List<Visita>();
}
