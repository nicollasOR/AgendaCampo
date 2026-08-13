using AgendaCampo.Domains;

namespace AgendaCampo.Interface;

public interface IVisitaRepository
{
    public List<Visita> Listar();

    public Visita BuscarPorTitulo(string titulo);

    public Visita BuscarPorId(int id);

    public bool agendamentoExiste(int id);
    public bool enderecoExiste(int id);
    public Visita BuscarPorAgendamento(DateTime data);

    public Visita BuscarPorEndereco(string logradouro);

    // public bool visita_dataExistir(DateTime data);
    public List<Visita> listarPorUsuario(Guid usuarioId);
    public List<Visita> listagemFuturosEvento(Guid usuarioId);
    public List<Visita> listagemEventosConcluidos(Guid usuarioId);

    // ver com o grupo btw
    public bool conflitoDeHorario(Guid usuarioId, DateTime dataComeco, DateTime dataFinal, int? visitaId = null);

    public bool Reagendar(int visitaId, DateTime novaDataInicio, DateTime novaDataTermino);

    public void Adicionar(Visita visita);//, int? agendamentosIds, int? intenderecoIds);
    // public bool condicaoEventoExistir(DateTime data, Agendamento agendamento);
    public void Atualizar(Visita visita, int? agendamentosIds, int? enderecoIds);

    public void atualizarEndereco(int id, int enderecoId);
    public void atualizarAgendamento(int id, int agendamentoId);
    public void Remover(int id);


}