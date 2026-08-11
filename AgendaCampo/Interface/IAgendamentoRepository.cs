using AgendaCampo.Domains;
namespace AgendaCampo.Interface;

public interface IAgendamentoRepository
{
    public Agendamento? buscarPorId(int id);
}