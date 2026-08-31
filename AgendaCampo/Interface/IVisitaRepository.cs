using AgendaCampo.Domains;

namespace AgendaCampo.Interface;

public interface IVisitaRepository
{

    //Métodos GET
    public List<Visita> Listar();

    public Visita BuscarPorTitulo(string titulo);

    public Visita BuscarPorId(int id);

    public Visita BuscarPorAgendamento(DateTime data);

    public Visita BuscarPorEndereco(string logradouro);

    //GET por Usuario
    public List<Visita> listarPorUsuario(Guid usuarioId);
    public List<Visita> listagemFuturosEventoPorUsuario(Guid usuarioId); //
    public List<Visita> listagemEventosConcluidosPorUsuario(Guid usuarioId);//

    // ver com o grupo btw
    public bool eventoExiste(int id);
    public bool conflitoDeHorario(Guid usuarioId, DateTime dataComeco, DateTime dataFinal, int? visitaId = null);

    public bool enderecoExiste(int id);
    // public bool visita_dataExistir(DateTime data);
    
    // métodos POST, PUT, DELETE
    public void Adicionar(Visita visita);
    public void Atualizar(Visita visita );
    public void Remover(int id);

    //patch simples
    // public void atualizarEndereco(int id, int enderecoId); //
    
    
    // public bool Reagendar(int visitaId, DateTime novaDataInicio, DateTime novaDataTermino);
    // implementando direto na service

}