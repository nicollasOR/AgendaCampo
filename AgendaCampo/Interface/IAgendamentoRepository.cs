using AgendaCampo.Domains;

namespace AgendaCampo.Interface
{
    public interface IAgendamentoRepository
    {
        public List<Agendamento> Buscar();
        public Agendamento? BuscarPorId(int id);
        public List<Agendamento> BuscarPorTecnico(Guid id);
        public Agendamento Adicionar (Agendamento agendamento);
        public void Atualizar(int id, Agendamento agendamento);
        public bool ExisteConflitoHorario(Guid idUsuario, DateTime horario);
    }
}
