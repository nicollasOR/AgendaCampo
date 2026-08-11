using AgendaCampo.Contexts;
using AgendaCampo.Domains;
using AgendaCampo.Interface;

namespace AgendaCampo.Repositories
{
    public class AgendaRepository : IAgendaRepository 
    {
        private readonly AgendaCampoContext _context;

        public AgendaRepository(AgendaCampoContext context)
        {
            _context = context;
        }

        public Agendamento Adicionar(Agendamento agendamento)
        {
            _context.Agendamento.Add(agendamento);
            _context.SaveChanges();
            return agendamento;
        }

        public void Atualizar(int id, Agendamento agendamento)
        {
            _context.Agendamento.Update(agendamento);
            _context.SaveChanges();
        }

        public List<Agendamento> Buscar()
        {
            return _context.Agendamento
                 .OrderBy(a => a.data)
                 .ToList();
        }

        public Agendamento? BuscarPorId(int id)
        {
            return _context.Agendamento
                .FirstOrDefault(a => a.agendaID == id);
        }

        public List<Agendamento> BuscarPorTecnico(Guid id)
        {
            return _context.Agendamento
                .Where(a => a.usuarioID == id)
                .OrderBy(a => a.data)
                .ToList();
        }

        public bool ExisteConflitoHorario(Guid idUsuario, DateTime horario)
        {
            return _context.Agendamento
                .Any(a => a.usuarioID == idUsuario && a.data == horario);
        }
    }
}
