using AgendaCampo.Domains;
using AgendaCampo.DTOs.EventoDTO;
using AgendaCampo.Exceptions;
using AgendaCampo.Interface;

namespace RoyalGamess.Aplications.Services;

public class VisitaService
{
    private readonly IVisitaRepository _rep;
    private readonly IAgendamentoRepository _agndRep;
    public VisitaService(IVisitaRepository rep, IAgendamentoRepository _agendRep)
    {
        _rep = rep;
        _agndRep = _agendRep;
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
        };
    }


    public List<lerVisitaDTO> Listar()
    {
        List<Visita> visita = _rep.Listar();

        List<lerVisitaDTO> lerVisitas = visita.Select(varAux => lerDTO(varAux)).ToList();

        return lerVisitas;
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
        Visita visitaBanco = _rep.BuscarPorEndereco(logradouro);
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");

        return lerDTO(visitaBanco);
    }

    public lerVisitaDTO buscarPorTitulo(string titulo)
    {
        Visita visitaBanco = _rep.BuscarPorTitulo(titulo);
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");

        return lerDTO(visitaBanco);
    }

    public lerVisitaDTO Adicionar(criarVisitaDTO criarVisitaDto)
    {
        var agndBanco = _agndRep.buscarPorId(criarVisitaDto.agendamentoId);
        if (agndBanco == null || !(agndBanco.data.HasValue)) 
            throw new DomainException("Agendamento não encontrado!"); // if(agendamento) visita == true

        if (agndBanco.data != criarVisitaDto.dataInicio)
            throw new DomainException("A visita deve ter a mesma data, hora de inicio do agendamento");
      
      // falta adicionar o endereco de validação.

      Visita visita = new Visita
      {
          agendamentoID = criarVisitaDto.agendamentoId,
          dataInicio = criarVisitaDto.dataInicio,
          dataTermino = criarVisitaDto.dataTermino,
          descricao = criarVisitaDto.descricao,
          titulo = criarVisitaDto.nomeSede,
          sedeVisitada = criarVisitaDto.nomeSede,
          statusRealizado = criarVisitaDto.statusRealizado,
          enderecoID = criarVisitaDto.enderecoId,
      };
        
      _rep.Adicionar(visita, visita.enderecoID, visita.agendamentoID);
      return lerDTO(visita);
    }
    
    public lerVisitaDTO Atualizar(int id, atualizarVisitaDTO atualizarDTO)
    {
        Visita visitaBanco = _rep.BuscarPorId(id);
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");

        if (!(_rep.agendamentoExiste(visitaBanco.agendamentoID)) || !(_rep.enderecoExiste(visitaBanco.enderecoID)))
            throw new DomainException("Agendamento e/ou endereço não encontrado");

        visitaBanco.titulo = atualizarDTO.nomeEvento;
        visitaBanco.descricao = atualizarDTO.descricao;
        visitaBanco.dataTermino = atualizarDTO.dataTermino;
        visitaBanco.dataInicio = atualizarDTO.dataInicio;
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