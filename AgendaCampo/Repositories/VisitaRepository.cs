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
            //.Include(varAux => varAux.agendamento)
            //.OrderBy(varAux => varAux.agendamento)
            .ToList();

        return visita;
    }

    public Visita BuscarPorTitulo(string titulo)
    {
        return _context.Visita
            .Include(varAux => varAux.endereco)
            //.Include(varAux => varAux.agendamento)
            .FirstOrDefault(varAux => varAux.titulo == titulo);

        // return visita;
    }

    public Visita BuscarPorId(int id)
    {
        return _context.Visita
            //.Include(varAux => varAux.agendamento)
            .Include(varAux => varAux.endereco)
            .FirstOrDefault(varAux => varAux.visitaID == id);
    }

    public Visita BuscarPorAgendamento(DateTime data)
    {
        return _context.Visita
            .Include(varAux => varAux.endereco)
            .OrderBy(varAux => varAux.dataInicio)
            //.Include(varAux => varAux.agendamento)
            .FirstOrDefault(varAux => varAux.dataInicio == data);
            
        

    }

    public Visita BuscarPorEndereco(string logradouro)
    {
        return _context.Visita
            .Include(varAux => varAux.endereco)
            //.Include(varAux => varAux.agendamento)
            .OrderBy(varAux => varAux.dataInicio)
            .FirstOrDefault(varAux => varAux.endereco.logradouro.ToLower() == logradouro.ToLower());
    }

    // public bool visita_dataExistir(DateTime data)
    // {
    //     return _context.Visita.Any(varAux => varAux.agendamento.data. && varAux.agendamento.data == data);
    // }

    public List<Visita> listarPorUsuario(Guid usuarioId)
    {
        var usuario = _context.Usuario.Find(usuarioId);
                
        var visita =  _context.Visita
            .Include(varAux => varAux.dataInicio)
            .Include(varAux => varAux.dataTermino)
            .Include(varAux => varAux.endereco)
            .Include(varAux => varAux.usuario.Where(varAux => varAux.usuarioID == usuarioId))
            
            .OrderBy(varAux => varAux.dataInicio)
            .ToList();

        return visita;
    }

    public bool conflitoDeHorario(Guid usuarioId, DateTime dataComeco, DateTime dataFinal, int? visitaId = null)
    {
        var usuarioBanco = _context.Usuario.Find(usuarioId);

        var visitaBanco =  _context.Visita.Any(v => 
            v.usuario.Any(varAux => varAux.usuarioID == usuarioId) &&
            (visitaId == null || v.visitaID != visitaId) &&
            ((dataComeco >= v.dataInicio && dataComeco < v.dataTermino)
            || (dataFinal > v.dataInicio && dataFinal <= v.dataTermino) 
            || (dataFinal <= v.dataInicio && dataFinal >= v.dataTermino)));

        return visitaBanco;
    }

    public List<Visita> listagemFuturosEvento(Guid usuarioId)
    {


        return _context.Visita
             .Include(varAux => varAux.endereco)
             .Include(varAux => varAux.usuario.FirstOrDefault(varAux => varAux.usuarioID == usuarioId))
             .Where(varAux => varAux.dataInicio >= DateTime.Now && !varAux.statusRealizado)
             .OrderBy(varAux => varAux.dataInicio)
             .ToList();

}

    public List<Visita> listagemEventosConcluidos(Guid usuarioId)
    {
        //return _context.Visita
        //    .Include(v => v.endereco)
        //    .Include(v => v.agendamento)
        //    .Where(varAux => 
        //        varAux.agendamento.usuarioID == usuarioId 
        //                     && (varAux.statusRealizado && varAux.dataTermino < DateTime.UtcNow))
        //    .OrderByDescending(varAux => varAux.dataInicio)
        //    .ToList();

        return _context.Visita.
            Include(varAux => varAux.endereco).
            Include(varAux => varAux.usuario).
            Where(varAux => varAux.usuario.Any(varAux => varAux.usuarioID == usuarioId) && 
            varAux.statusRealizado && 
            varAux.dataTermino < DateTime.UtcNow).
            OrderByDescending(varAux => varAux.dataInicio).
            ToList();
 
    }



    public bool enderecoExiste(int id)
    {
        return _context.Endereco.Any(varAux => varAux.enderecoID == id);
    }

    public void Adicionar(Visita visita)//, int? agendamentosIds, int? enderecoIds)
    {
        _context.Visita.Add(visita);
        _context.SaveChanges();

    }

    public void AtualizarUsuarios(Visita visita, Guid usuarioIds, int? enderecoIds)
    {
        Visita visitaBanco = _context.Visita
            .Include(varAux => varAux.usuario.First(varAux => varAux.usuarioID == usuarioIds))
            .Include(varAux => varAux.enderecoID == enderecoIds)
            .FirstOrDefault(varAux => varAux.visitaID == visita.visitaID);

        if (visitaBanco == null)
            return;


        visitaBanco.descricao = visita.descricao;
        visitaBanco.dataTermino = visita.dataTermino;
        visitaBanco.dataInicio = visita.dataInicio;
        visitaBanco.titulo = visita.titulo;

        visitaBanco.enderecoID = visita.enderecoID;

        _context.SaveChanges();


        //var agenda = _context.Agendamento.Where(varAux => )
    }

    public bool Reagendar(int visitaId, DateTime novaDataInicio, DateTime novaDataTermino)
    {
        Visita visitaBanco = BuscarPorId(visitaId);
        if (visitaBanco == null) return false;

        visitaBanco.dataInicio = novaDataInicio;
        visitaBanco.dataTermino = novaDataTermino;

        _context.SaveChanges();
        return true;
    }
    
    public void atualizarEndereco(int id, int enderecoId)
    {
        Visita visitaBanco = BuscarPorId(id);
        if (visitaBanco == null)
            return;

        visitaBanco.enderecoID = enderecoId;

        _context.SaveChanges();
    }


    public void atualizarAgendamento(int id, DateTime dataInicio, DateTime dataFinal)
    {
        Visita visitaBanco = BuscarPorId(id);
        if (visitaBanco == null)
            return;
        visitaBanco.dataTermino = dataFinal;
        visitaBanco.dataInicio = dataInicio;
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