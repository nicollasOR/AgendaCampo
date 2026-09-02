using System;
using System.Collections.Generic;

namespace AgendaCampo.Domains;

public partial class Usuario
{
    public Guid usuarioID { get; set; }

    public string nome { get; set; } = null!;

    public string email { get; set; } = null!;

    public byte[] senha { get; set; } = null!;

    public string? telefone { get; set; }

    public bool statusUsuario { get; set; }

    public byte[]? Imagem { get; set; }

    public virtual ICollection<Visita> visita { get; set; } = new List<Visita>();
}
