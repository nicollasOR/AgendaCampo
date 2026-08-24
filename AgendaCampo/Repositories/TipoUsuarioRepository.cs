using AgendaCampo.Contexts;
using AgendaCampo.Domains;
using AgendaCampo.Interface;

namespace AgendaCampo.Repositories;

public class TipoUsuarioRepository : ITipoUsuarioRepository
{
    private readonly AgendaCampoContext _ctx;

    public TipoUsuarioRepository(AgendaCampoContext ctx) => _ctx = ctx;

    public List<TipoUsuario> Listar()
    {
        return _ctx.TipoUsuario.ToList();
    }

    public void Adicionar(TipoUsuario tipoUsuario)
    {
        _ctx.TipoUsuario.Add(tipoUsuario);
        _ctx.SaveChanges();
    }

    public bool ExisteTipoUsuario(string tipoUsuario)
    {
        return _ctx.TipoUsuario.Any(t => t.nomeTipo == tipoUsuario);
    }
}