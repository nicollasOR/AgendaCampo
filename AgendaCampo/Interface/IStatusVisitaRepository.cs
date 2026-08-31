using AgendaCampo.Domains;

namespace AgendaCampo.Interface;

public interface IStatusVisitaRepository
{
    public List<StatusVisita> Listar();
    public bool existeStatus(string nomeStatus);
    public StatusVisita? buscarStatusVisitaId(int statusId);
    public void Adicionar(StatusVisita status);
    
}