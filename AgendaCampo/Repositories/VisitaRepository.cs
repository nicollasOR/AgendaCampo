using AgendaCampo.Contexts;
using AgendaCampo.Domains;
using AgendaCampo.Interface;
using Microsoft.EntityFrameworkCore;

namespace AgendaCampo.Repositories;

public class VisitaRepository : IVisitaRepository
{
    private readonly AgendaCampoContext _context;

    public VisitaRepository(AgendaCampoContext context) => context = context;

    public List<Visita> Listar()
    {
        List<Visita> visita = _context.Visita
            .Include(varAux => varAux.endereco)
            .Include(varAux => varAux.agendamento)
            .ToList();

        return visita;
    }

    // public bool condicaoEventoExistir(DateTime data, Agendamento agendamento)
    // {
    //     var condicao = _context.Visita.AsQueryable();
    //     
    //     
    // }

    public Visita BuscarPorTitulo(string titulo)
    {
        return _context.Visita
            .Include(varAux => varAux.endereco)
            .Include(varAux => varAux.agendamento)
            .FirstOrDefault(varAux => varAux.titulo == titulo);

        // return visita;
    }

    public Visita BuscarPorId(int id)
    {
        return _context.Visita
            .Include(varAux => varAux.agendamento)
            .Include(varAux => varAux.endereco)
            .First(varAux => varAux.visitaID == id);
    }

    public Visita BuscarPorAgendamento(DateTime data)
    {
        return _context.Visita
            .Include(varAux => varAux.endereco)
            .Include(varAux => varAux.agendamento)
            .FirstOrDefault(varAux => varAux.agendamento.data == data);
            
    }

    public Visita BuscarPorEndereco(string logradouro)
    {
        return _context.Visita
            .Include(varAux => varAux.endereco)
            .Include(varAux => varAux.agendamento)
            .FirstOrDefault(varAux => varAux.endereco.logradouro == logradouro);
    }

    public bool VisitaExistir(DateTime data)
    {
        return _context.Visita.Any(varAux => varAux.agendamento.data.HasValue && varAux.agendamento.data == data);
    }

    public bool agendamentoExiste(int id)
    {
        return _context.Agendamento.Any(varAux => varAux.agendaID == id);
    }

    public bool enderecoExiste(int id)
    {
        return _context.Endereco.Any(varAux => varAux.enderecoID == id);
    }

    public void Adicionar(Visita visita, int? agendamentosIds, int? enderecoIds)
    {
        _context.Visita.Add(visita);
        _context.SaveChanges();

    }
}