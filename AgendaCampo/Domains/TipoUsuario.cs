namespace AgendaCampo.Domains;

public partial class TipoUsuario
{
    public int tipoUsuarioID { get; set; }
    public string nomeTipo { get; set; } = null!;

    public virtual ICollection<Usuario> Usuario { get; set; } = new List<Usuario>();

}