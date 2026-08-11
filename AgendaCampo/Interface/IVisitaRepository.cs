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

    public bool VisitaExistir(DateTime data);

    public void Adicionar(Visita visita, int? agendamentosIds, int? intenderecoIds);
    // public bool condicaoEventoExistir(DateTime data, Agendamento agendamento);
    // public void Atualizar(int id, Visita visita);
    // public void Remover(int id);
    
    
}