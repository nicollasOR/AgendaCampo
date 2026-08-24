using AgendaCampo.Domains;

namespace AgendaCampo.Interface;

public interface ITipoUsuarioRepository
{
    public List<TipoUsuario> Listar();

    public bool ExisteTipoUsuario(string tipoUsuario);
    public void Adicionar(TipoUsuario tipoUsuario);
}