using AgendaCampo.Contexts;
using AgendaCampo.Domains;
using AgendaCampo.DTOs.UsuarioDTO;
using AgendaCampo.Interface;
using Microsoft.EntityFrameworkCore;

namespace AgendaCampo.Repositories;

public class VisitaRepository : IVisitaRepository
{
    private readonly AgendaCampoAtualContext _context;

    public VisitaRepository(AgendaCampoAtualContext context) => _context = context;


    public List<Visita> Listar()
    {
        return _context.Visita
              //.Include(varAux => varAux.endereco)
              .Include(varAux => varAux.statusVisita)
              .Include(varAux => varAux.usuario)
             .OrderBy(varAux => varAux.dataInicio < DateTime.Now)
             .ToList();
    }

     public Visita BuscarPorTitulo(string titulo)
     {
         return _context.Visita
              //.Include(varAux => varAux.endereco)
              .Include(varAux => varAux.statusVisita)
              .Include(varAux => varAux.usuario)
             .FirstOrDefault(varAux => varAux.titulo == titulo);
     }
//
     public Visita BuscarPorId(int id)
     {
         return _context.Visita
              //.Include(varAux => varAux.endereco)
              .Include(varAux => varAux.statusVisita)
              .Include(varAux => varAux.usuario)
             .FirstOrDefault(varAux => varAux.visitaID == id);
     }
//
     public Visita BuscarPorAgendamento(DateTime data)
     {
         return _context.Visita
             //.Include(varAux => varAux.endereco)
             .OrderBy(varAux => varAux.dataInicio)
             .Include(varAux => varAux.statusVisita)
             .Include(varAux => varAux.usuario)
             .FirstOrDefault(varAux => varAux.dataInicio == data);
    }

     public Visita BuscarPorEndereco(string logradouro)
     {
         return _context.Visita
              //.Include(varAux => varAux.endereco)
              .Include(varAux => varAux.statusVisita)
              .Include(varAux => varAux.usuario)
             .OrderBy(varAux => varAux.dataInicio)
             .FirstOrDefault(varAux => varAux.logradouro.ToLower() == logradouro.ToLower() || varAux.bairro.ToLower() == logradouro.ToLower());
     }

    //public Visita? buscarImg(Guid id)
    //{
    //    Visita? visitaBanco = _context.Visita
    //        .Include(varAux => varAux.endereco)
    //        .Where(varAux => varAux.usuario.Where(usrAux => usrAux.usuarioID == id).Select(varImg => varImg.Imagem).FirstOrDefault().ToList();
    // }
//
     public bool visita_dataExistir(DateTime data)
     {
         return _context.Visita.Any(varAux => varAux.dataInicio == data || varAux.dataTermino == data);
     }
//
      public List<Visita> listarPorUsuario(Guid usuarioId)
      {
                  
          return _context.Visita

              //.Include(varAux => varAux.endereco)
              .Include(varAux => varAux.statusVisita)
              .Include(varAux => varAux.usuario)
               .Where(varAux => varAux.usuario.Any(usrAux => usrAux.usuarioID == usuarioId))
              .OrderBy(varAux => varAux.dataInicio)
              .ToList();
 
      }
//
     public bool conflitoDeHorario(Guid usuarioId, DateTime dataComeco, DateTime dataFinal, int? visitaId = null)
     {
         return _context.Visita.Any(visitaAux => 
         #warning Filtragem para relacionar usuarios
             visitaAux.usuario.Any(usrAux => usrAux.usuarioID == usuarioId) &&
             
         #warning Se estiver reagendando (visitaId != null), ignora a própria visita
             (visitaId == null || visitaAux.visitaID != visitaId) &&
             (dataComeco < visitaAux.dataTermino && dataFinal > visitaAux.dataInicio)
         );
     }
//
     public List<Visita> listagemFuturosEventoPorUsuario(Guid usuarioId)
     {
         
         return _context.Visita
             //.Include(varAux => varAux.endereco)
             .Include(varAux => varAux.usuario)
             .Include(varAux => varAux.statusVisita) // se for necessário, carrega esses dados
             .Where(visitaAux => 
                     visitaAux.usuario.Any(usrAux => usrAux.usuarioID == usuarioId) && // Filtra a visita pelo usuário
                     visitaAux.dataInicio >= DateTime.Now &&                        // Apenas datas futuras
                     visitaAux.statusVisita.nomeStatus != "Concluída" &&            
                     visitaAux.statusVisita.nomeStatus != "Cancelada"               
             )
             .OrderBy(varAux => varAux.dataInicio)
             .ToList();

     } 
     
     public List<Visita> listagemEventosConcluidosPorUsuario(Guid usuarioId)
     {
          
         return _context.Visita
             //.Include(varAux => varAux.endereco)
             .Include(varAux => varAux.statusVisita)
             .Include(varAux => varAux.usuario)
             .Where(visitaAux =>
                 visitaAux.usuario.Any(varAux => varAux.usuarioID == usuarioId)
                 &&
                 visitaAux.dataTermino <= DateTime.Now &&
                 visitaAux.statusVisita.nomeStatus == "Concluída"
             )
             .OrderByDescending(varAux => varAux.dataInicio)
             .ToList();

         
     }


     public bool conflitoHorario(Guid usuarioId, DateTime dataComeco, DateTime dataFinal, int? visitaId = null)
     {
         return _context.Visita.Any(v => 
             v.usuario.Any(u => u.usuarioID == usuarioId) &&
             
             #warning Se for uma edição/reagendamento, ignora a própria visita que está sendo alterada
             (visitaId == null || v.visitaID != visitaId) &&

             // regra de conflito
             (dataComeco < v.dataTermino && dataFinal > v.dataInicio)
         );
     }
 

//
     //public bool enderecoExiste(int id)
     //{
     //    return _context.Endereco.Any(varAux => varAux.enderecoID == id);
     //}

     public bool eventoExiste(int id)
     {
         return _context.Visita.Any(varAux => varAux.visitaID == id);
     }

     //
     public void Adicionar(Visita visita)//, int? agendamentosIds, int? enderecoIds)
     {
         _context.Visita.Add(visita);
         _context.SaveChanges();

     }
//
     public void Atualizar(Visita visita)
     {

         Visita? visitaBanco = BuscarPorId(visita.visitaID);

         if (visitaBanco == null)
             return;
         visitaBanco.descricao = visita.descricao;
         visitaBanco.dataTermino = visita.dataTermino;
         visitaBanco.dataInicio = visita.dataInicio;
         visitaBanco.titulo = visita.titulo;
         visitaBanco.cliente = visita.cliente;
         visitaBanco.sedeVisitada = visita.sedeVisitada;
         
         visitaBanco.statusVisitaID = visita.statusVisitaID;
         //visitaBanco.enderecoID = visita.enderecoID;


         _context.SaveChanges();
          
     }



     public bool Reagendar(int visitaId, DateTime novaDataInicio, DateTime novaDataTermino)
     {
         throw new NotImplementedException();
     }

     public void Remover(int id)
     {
         Visita? visitaBanco = _context.Visita.Find(id);
         if (visitaBanco == null)
             return;
         
         var statusCanceladoId = _context.StatusVisita
             .Where(varAux => varAux.nomeStatus.ToLower() == "Cancelada")
             .Select(varAux => varAux.statusVisitaID)
             .FirstOrDefault();
         
         visitaBanco.statusVisitaID = statusCanceladoId;

         _context.SaveChanges();
     }

     
}