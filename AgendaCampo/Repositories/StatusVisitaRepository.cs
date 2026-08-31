using AgendaCampo.Contexts;
using AgendaCampo.Domains;
using AgendaCampo.Interface;

namespace AgendaCampo.Repositories;

public class StatusVisitaRepository : IStatusVisitaRepository
{
    private readonly AgendaCampoNovoContext _ctx;

    public StatusVisitaRepository(AgendaCampoNovoContext ctx) => _ctx = ctx;

    public List<StatusVisita> Listar()
    {
        return _ctx.StatusVisita.ToList();
    }

    public StatusVisita? buscarStatusVisitaId(int statusId)
    {
        StatusVisita? statusVisitaBanco = _ctx.StatusVisita.Find(statusId);
        return statusVisitaBanco;
    }

    public bool existeStatus(string nomeStatus)
    {
        return _ctx.StatusVisita.Any(varAux => varAux.nomeStatus == nomeStatus);
    }

    public void Adicionar(StatusVisita status)
    {
        // existeStatus(status.nomeStatus);

        // if (!existeStatus(status.nomeStatus))
        //     return;
        //
        _ctx.StatusVisita.Add(status);
        _ctx.SaveChanges();
    }
}