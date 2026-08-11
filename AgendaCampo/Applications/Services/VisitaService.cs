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
    
    
}