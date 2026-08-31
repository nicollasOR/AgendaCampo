using AgendaCampo.Domains;
using AgendaCampo.DTOs.VisitaDTO;
using AgendaCampo.Exceptions;
using AgendaCampo.Interface;

namespace RoyalGamess.Aplications.Services;

public class VisitaService
{
    private readonly IVisitaRepository _rep;
    private readonly IAgendamentoRepository _agndRep;

    private readonly IEnderecoRepository _endrcRep;
    public VisitaService(IVisitaRepository rep, IAgendamentoRepository _agendRep, IEnderecoRepository endrcRep)
    {
        _rep = rep;
        _agndRep = _agendRep;
        _endrcRep = endrcRep;
    }


    private static lerVisitaDTO lerDTO(Visita visita)
    {
        return new lerVisitaDTO
        {
            visitaID = visita.visitaID,
            agendamentoId = visita.agendamentoID,
            dataInicio = visita.dataInicio,
            dataTermino = visita.dataTermino,
            descricao = visita.descricao,
            nomeEvento = visita.titulo,
            nomeSede = visita.sedeVisitada,
            statusRealizado = visita.statusRealizado,
            enderecoId = visita.enderecoID,
            
            // dados para usar no front:
            logadouroEndereco = visita.endereco?.logradouro,
            nomeCliente = visita.agendamento?.empresaSede
        };
    }

    // METODOS GET
    public List<lerVisitaDTO> Listar()
    {
        List<Visita> visita = _rep.Listar();

        List<lerVisitaDTO> lerVisitas = visita.Select(varAux => lerDTO(varAux)).ToList();

        return lerVisitas;
    }

    public List<lerVisitaDTO> listarFuturasVisitas(Guid usuarioId)
    {
        return _rep
            .listagemFuturosEvento(usuarioId)
            .Select(lerDTO).ToList();
    }

    // listagem para puxar apenas as concluidas
    public List<lerVisitaDTO> ListarConcluidas(Guid usuarioId)
    {
        return _rep.listagemEventosConcluidos(usuarioId).Select(lerDTO).ToList();
    }
    

    public lerVisitaDTO buscarPorId(int id)
    {
        Visita visitaBanco = _rep.BuscarPorId(id);
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");

        return lerDTO(visitaBanco);

    }

    public lerVisitaDTO buscarPorAgendamento(DateTime date)
    {
        Visita visitaBanco = _rep.BuscarPorAgendamento(date);
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");

        return lerDTO(visitaBanco);
    }

    public lerVisitaDTO buscarPorEndereco(string logradouro)
    {
        //if (_rep.enderecoExiste(logradouro))
        //    throw new DomainException("");
        Visita visitaBanco = _rep.BuscarPorEndereco(logradouro.ToLower());
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");

        return lerDTO(visitaBanco);
    }

    public lerVisitaDTO buscarPorTitulo(string titulo)
    {
        Visita visitaBanco = _rep.BuscarPorTitulo(titulo.ToLower());
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");

        return lerDTO(visitaBanco);
    }

    public lerVisitaDTO Adicionar(criarVisitaDTO criarVisitaDto)
    {
        Agendamento? agndBanco = _agndRep.BuscarPorId(criarVisitaDto.agendamentoId);
        Endereco? endrcBanco = _endrcRep.buscarPorId(criarVisitaDto.enderecoId);
        if (agndBanco == null) //|| !(agndBanco.data.HasValue))    //era para funcionar o .value
            throw new DomainException("Agendamento não encontrado!"); // if(agendamento) visita == true
        if (endrcBanco == null)
            throw new DomainException("Endereço não encontrado..");
        if (agndBanco.data.Date != criarVisitaDto.dataInicio.Date)
            throw new DomainException("A visita deve ter a mesma data, hora de inicio do agendamento");

        if (criarVisitaDto.dataTermino <= criarVisitaDto.dataInicio)
            throw new DomainException("A data termino tem que ser depois da inicial");
        
        if (!_rep.enderecoExiste(criarVisitaDto.enderecoId))
            throw new DomainException("Endereco não existente..");
      // falta adicionar o endereco de validação.

      Visita visita = new Visita
      {
          agendamentoID = agndBanco.agendaID,
          dataInicio = criarVisitaDto.dataInicio,
          dataTermino = criarVisitaDto.dataTermino,
          descricao = criarVisitaDto.descricao,
          titulo = criarVisitaDto.nomeSede,
          sedeVisitada = string.IsNullOrEmpty(criarVisitaDto.nomeSede) 
                                    ? agndBanco.empresaSede // if para puxar o nome do agendamento
                                    : criarVisitaDto.nomeSede, // else para caso não consiga
          statusRealizado = criarVisitaDto.statusRealizado,
          enderecoID = endrcBanco.enderecoID,
      };

      _rep.Adicionar(visita);//);
      return lerDTO(visita);
    }
    
    public lerVisitaDTO Atualizar(int id, atualizarVisitaDTO atualizarDTO)
    {
        Visita visitaBanco = _rep.BuscarPorId(id);
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");

        if (!(_rep.agendamentoExiste(visitaBanco.agendamentoID)) || !(_rep.enderecoExiste(visitaBanco.enderecoID)))
            throw new DomainException("Agendamento e/ou endereço não encontrado");
        
        
        if (atualizarDTO.dataTermino <= atualizarDTO.dataInicio)
            throw new DomainException("A data termino tem que ser depois da inicial");

        visitaBanco.titulo = atualizarDTO.nomeEvento;
        visitaBanco.descricao = atualizarDTO.descricao;
        // visitaBanco.dataTermino = atualizarDTO.dataTermino;
        // visitaBanco.dataInicio = atualizarDTO.dataInicio; testando o de baixo
        visitaBanco.dataTermino = atualizarDTO.dataTermino.UtcDateTime;
        visitaBanco.dataInicio = atualizarDTO.dataInicio.UtcDateTime;

        visitaBanco.agendamentoID = visitaBanco.agendamentoID;
        visitaBanco.enderecoID = visitaBanco.enderecoID;

        _rep.Atualizar(visitaBanco, visitaBanco.agendamentoID, visitaBanco.enderecoID);

        return lerDTO(visitaBanco);
        //visitaBanco
        //if(!(_rep.enderecoExiste))

    }


    public void atualizarEndereco(int id, atualizarVisitaDTO atlDTO)
    {
        Visita visitaBanco = _rep.BuscarPorId(id);

        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");

        visitaBanco.enderecoID = atlDTO.enderecoId;

        _rep.atualizarEndereco(id, visitaBanco.enderecoID);
    }

    //metodo necessario mas em analise    
    public lerVisitaDTO Reagendar(int visitaId, DateTime novaDataInicio, DateTime novaDataTermino)
    {
        var visitaBanco = _rep.BuscarPorId(visitaId);
        if (visitaBanco == null)
            throw new DomainException("Visita nao encontrada");

        if (novaDataTermino <= novaDataInicio)
            throw new DomainException("A nova data de termino deve ser posterior a data de inicio");

        _rep.Reagendar(visitaId, novaDataInicio, novaDataTermino);

        visitaBanco.dataInicio = novaDataInicio;
        visitaBanco.dataTermino = novaDataTermino;

        return lerDTO(visitaBanco);
    }

    public void atualizarAgendamento(int id, atualizarVisitaDTO atlDTO)
    {
        Visita visitaBanco = _rep.BuscarPorId(id);

        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");

        visitaBanco.agendamentoID = atlDTO.agendamentoId;

        _rep.atualizarEndereco(id, visitaBanco.agendamentoID);
        //return lerDTO(atlDTO);
    }

    public void Remover(int id)
    {
        Visita visitaBanco = _rep.BuscarPorId(id);
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");
        _rep.Remover(id);

    }
}
