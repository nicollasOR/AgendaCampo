using AgendaCampo.Contexts;
using AgendaCampo.Domains;
using AgendaCampo.Interface;

namespace AgendaCampo.Repositories;

public class AgendamentoRepository : IAgendamentoRepository
{
    private readonly AgendaCampoContext _context;
    public AgendamentoRepository(AgendaCampoContext context) => _context = context;
    
    public Agendamento? buscarPorId(int id)
    {
        return _context.Agendamento
            .FirstOrDefault(a => a.agendaID == id);
    }
}