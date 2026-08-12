using AgendaCampo.Contexts;
using AgendaCampo.Domains;
using AgendaCampo.DTOs.UsuarioDTO;
using AgendaCampo.Interface;
using Microsoft.EntityFrameworkCore;

namespace AgendaCampo.Repositories;

public class VisitaRepository : IVisitaRepository
{
    private readonly AgendaCampoContext _context;

    public VisitaRepository(AgendaCampoContext context) => _context = context;

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

    public bool visita_dataExistir(DateTime data)
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

    public void Atualizar(Visita visita, int? agendamentosIds, int? enderecoIds)
    {
        Visita visitaBanco = _context.Visita
            .Include(varAux => varAux.agendamentoID == agendamentosIds)
            .Include(varAux => varAux.enderecoID == enderecoIds)
            .FirstOrDefault(varAux => varAux.visitaID == visita.visitaID);

        if (visitaBanco == null)
            return;


        visitaBanco.descricao = visita.descricao;
        visitaBanco.dataTermino = visita.dataTermino;
        visitaBanco.dataInicio = visita.dataInicio;
        visitaBanco.titulo = visita.titulo;
        visitaBanco.agendamentoID = visita.agendamentoID;
        visitaBanco.enderecoID = visita.enderecoID;

        _context.SaveChanges();


        //var agenda = _context.Agendamento.Where(varAux => )
    }

    public void atualizarEndereco(int id, int enderecoId)
    {
        Visita visitaBanco = BuscarPorId(id);
        if (visitaBanco == null)
            return;

        visitaBanco.enderecoID = enderecoId;

        _context.SaveChanges();
    }


    public void atualizarAgendamento(int id, int agendamentoId)
    {
        Visita visitaBanco = BuscarPorId(id);
        if (visitaBanco == null)
            return;
        visitaBanco.agendamentoID = agendamentoId;
        _context.SaveChanges();
    }

    public void Remover(int id)
    {
        Visita visitaBanco = BuscarPorId(id);

        if (visitaBanco == null)
            return;

        _context.Visita.Remove(visitaBanco);
        _context.SaveChanges();

    }
}