using AgendaCampo.Applications.Conversões;
using AgendaCampo.Domains;
 using AgendaCampo.DTOs.VisitaDTO;
//using AgendaCampo.DTOs.VisitaDTONN;
using AgendaCampo.Exceptions;
using AgendaCampo.Interface;

namespace RoyalGamess.Aplications.Services;

public class VisitaService
{
    private readonly IVisitaRepository _rep;
    
    private readonly IUsuarioRepository _usrRep;
    private readonly IStatusVisitaRepository _stsRep;
 
 
    public VisitaService(IVisitaRepository rep, IUsuarioRepository usrRep, IStatusVisitaRepository stsRep)
    {
        _rep = rep;
        _usrRep = usrRep;
        _stsRep = stsRep;
    }
  
    public List<lerVisitaDTO> Listar()
    {
        List<Visita> visita = _rep.Listar();

        List<lerVisitaDTO> lerVisitas = visita.Select(varAux => visitaConversoes.lerVisitaDto(varAux)).ToList();
        return lerVisitas;
    }
    
    
    
     
     public List<lerVisitaDTO> listarFuturasVisitas(Guid usuarioId)
     {
         List<Visita> visita = _rep.listagemFuturosEventoPorUsuario(usuarioId);
        List<lerVisitaDTO?> listagem = visita.Select(varAux => visitaConversoes.lerVisitaDto(varAux)).ToList();
        if (!listagem.Any())
            throw new DomainException("Visitas não encontradas");
        return listagem;
        // return _rep
        //     .listagemFuturosEventoPorUsuario(usuarioId)
        //     .Select(visitaConversoes.lerVisitaDto).ToList();
    }
    
    // listagem para puxar apenas as concluidas
    public List<lerVisitaDTO> ListarConcluidas(Guid usuarioId)
    {
        List<Visita> visita = _rep.listagemEventosConcluidosPorUsuario(usuarioId);
        List<lerVisitaDTO> listagem = visita.Select(varAux => visitaConversoes.lerVisitaDto(varAux)).ToList();
        if (!listagem.Any())
            throw new DomainException("Visitas não encontradas");
        return listagem;
    }

    public List<lerVisitaDTO> ListarEventosPorUsuarios(Guid usuarioId)
    {
        List<Visita> visita = _rep.listarPorUsuario(usuarioId);
        List<lerVisitaDTO> listagem = visita.Select(varAux => visitaConversoes.lerVisitaDto(varAux)).ToList();
        if (!listagem.Any())
            throw new DomainException("Visitas não encontradas");
        return listagem;
    }
    
    public lerVisitaDTO buscarPorId(int id)
    {
        Visita visitaBanco = _rep.BuscarPorId(id);
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");
    
        return visitaConversoes.lerVisitaDto(visitaBanco);
    
    }
    public lerVisitaDTO buscarPorAgendamento(DateTime date)
    {
        Visita visitaBanco = _rep.BuscarPorAgendamento(date);
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");
    
        return visitaConversoes.lerVisitaDto(visitaBanco);
    }
    
    public lerVisitaDTO buscarPorEndereco(string logradouro)
    {
         Visita visitaBanco = _rep.BuscarPorEndereco(logradouro.ToLower());
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");
    
        return visitaConversoes.lerVisitaDto(visitaBanco);
    }
    //
    public lerVisitaDTO buscarPorTitulo(string titulo)
    {
        Visita visitaBanco = _rep.BuscarPorTitulo(titulo.ToLower());
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");
    
        return visitaConversoes.lerVisitaDto(visitaBanco);
    }
    //
    public lerVisitaDTO Adicionar(criarVisitaDTO criarVisitaDtos, Guid usuarioId)
    {

        Usuario? usuarioNome = _usrRep.ObterPorNome(criarVisitaDtos.clienteNome);
        // if (usuarioNome == null)
        //     throw new DomainException("Usuário não encontrado.");

        StatusVisita? stsVisitaPendente = _stsRep.buscarNomeStatus("Pendente");
        if (stsVisitaPendente == null)
            throw new DomainException("Status Visita não encontrado");
        if (criarVisitaDtos.dataTermino <= criarVisitaDtos.dataInicio)
            throw new DomainException("A data termino tem que ser depois da inicial");

        Usuario? usuarioBanco = _usrRep.ObterPorId(usuarioId);
        if (usuarioBanco == null)
            throw new DomainException("Usuario cliente não encontrado!");

        bool temConflito = _rep.conflitoDeHorario(usuarioId, criarVisitaDtos.dataInicio, criarVisitaDtos.dataTermino);
        if (temConflito)
            throw new DomainException("Já existe uma visita agendada para este técnico no horário selecionado");
        List<Usuario> listaTecnicos = new List<Usuario> { usuarioBanco };
        
        if(criarVisitaDtos.usuariosIds != null && criarVisitaDtos.usuariosIds.Any())
            foreach (Guid idTecnicos in criarVisitaDtos.usuariosIds)
            {
                if (idTecnicos == usuarioId)
                    continue;

                Usuario? outrosTecnicos = _usrRep.ObterPorId(idTecnicos);
                if (outrosTecnicos != null)
                {
                    bool conflitoOutro = _rep.conflitoDeHorario(outrosTecnicos.usuarioID, criarVisitaDtos.dataInicio, criarVisitaDtos.dataTermino);
                    if (conflitoOutro)
                        throw new DomainException($"O técnico {outrosTecnicos.nome} já possui um compromisso nesse horário.");

                    listaTecnicos.Add(outrosTecnicos);
                }
            }
      // falta adicionar o endereco de validação.
    
      Visita visita = new Visita
      {
          dataInicio = criarVisitaDtos.dataInicio,
          dataTermino = criarVisitaDtos.dataTermino,
          descricao = criarVisitaDtos.descricao,
          titulo = criarVisitaDtos.nomeEvento,
          sedeVisitada = criarVisitaDtos.nomeSede,
          cliente = string.IsNullOrEmpty(usuarioBanco.nome) ? usuarioBanco.nome : criarVisitaDtos.clienteNome,
          statusVisitaID = stsVisitaPendente.statusVisitaID,
          bairro = criarVisitaDtos.Bairro,
          cep = criarVisitaDtos.Cep,
          logradouro = criarVisitaDtos.Logradouro,
          numero = criarVisitaDtos.Numero,
          
          usuario = listaTecnicos
      };
      _rep.Adicionar(visita);//);
      return visitaConversoes.lerVisitaDto(visita);
    }
    
    
    //
    public lerVisitaDTO Atualizar(int id, atualizarVisitaDTO atualizarDTO, Guid usuarioId)
    {
        Usuario? usuarioBanco = _usrRep.ObterPorNome(atualizarDTO.nomeCliente);
        // if (usuarioBanco == null)
        //     throw new DomainException("Usuário não encontrado.");
        
        StatusVisita? stsVisitaPendente = _stsRep.buscarNomeStatus(atualizarDTO.statusVisita);
        if (stsVisitaPendente == null && !_stsRep.existeStatus(atualizarDTO.statusVisita))
            throw new DomainException("Status Visita não encontrado");
        Visita? visitaBanco = _rep.BuscarPorId(id);
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");

         if (atualizarDTO.dataTermino <= atualizarDTO.dataInicio)
            throw new DomainException("A data de término deve ser posterior à data de início");

         bool temConflito = _rep.conflitoDeHorario(usuarioId, atualizarDTO.dataInicio, atualizarDTO.dataTermino, id);
        if (temConflito)
            throw new DomainException("O técnico já possui outro compromisso no horário selecionado");

 
        visitaBanco.titulo = atualizarDTO.titulo;
        visitaBanco.descricao = atualizarDTO.descricao;
        visitaBanco.dataInicio = atualizarDTO.dataInicio;
        visitaBanco.dataTermino = atualizarDTO.dataTermino;
        // visitaBanco.cliente = usuarioBanco ? usuarioBanco.nome : atualizarDTO.nomeCliente;
        visitaBanco.cliente = !string.IsNullOrEmpty(usuarioBanco.nome) ? usuarioBanco.nome : atualizarDTO.nomeCliente;
        visitaBanco.sedeVisitada = atualizarDTO.nomeSede;
        //visitaBanco.statusVisitaID = atualizarDTO.statusVisitaId;
        visitaBanco.statusVisitaID = stsVisitaPendente.statusVisitaID;
        //
        visitaBanco.cep = atualizarDTO.Cep;
        visitaBanco.numero = atualizarDTO.Numero;
        visitaBanco.logradouro = atualizarDTO.Logradouro;
        visitaBanco.bairro = atualizarDTO.Bairro;

        _rep.Atualizar(visitaBanco);

        return visitaConversoes.lerVisitaDto(visitaBanco);
    }
 
    public lerVisitaDTO atualizarEndereco(int id, atualizarVisitaDTO atlDTO)
    {
        Visita visitaBanco = _rep.BuscarPorId(id);
    
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");


        visitaBanco.cep = atlDTO.Cep;
        visitaBanco.numero = atlDTO.Numero;
        visitaBanco.descricao = atlDTO.descricao;
        visitaBanco.bairro = atlDTO.Bairro;

        _rep.Atualizar(visitaBanco);
        return visitaConversoes.lerVisitaDto(visitaBanco);
    }

    public lerVisitaDTO atualizarData(int id, DateTime dataInicio, DateTime dataFinal, Guid usuarioId)
    {
        Visita visitaBanco = _rep.BuscarPorId(id);
    
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");

        if (dataFinal <= dataInicio)
            throw new DomainException("Data inserida de forma incorreta");
        bool temConflito = _rep.conflitoDeHorario(usuarioId, dataInicio, dataFinal, id);
        if (temConflito)
            throw new DomainException("O técnico já possui um compromisso agendado para este horário.");
        visitaBanco.dataInicio = dataInicio;
        visitaBanco.dataTermino = dataFinal;
        
        _rep.Atualizar(visitaBanco);
        
        return visitaConversoes.lerVisitaDto(visitaBanco);
    }

    public lerVisitaDTO atualizarCliente(Guid usuarioId, int id, atualizarVisitaDTO atlDTO)
    {
        Visita visitaBanco = _rep.BuscarPorId(id);
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");
        if (atlDTO.nomeCliente != string.Empty)
        {
            Usuario? usuarioBanco = _usrRep.ObterPorId(usuarioId);
            if (usuarioBanco == null)
                throw new DomainException("Usuário não encontrado");

            visitaBanco.cliente = usuarioBanco.nome;
        }

        else
        {
            visitaBanco.cliente = atlDTO.nomeCliente;
        }
    
        
        _rep.Atualizar(visitaBanco);

        return visitaConversoes.lerVisitaDto(visitaBanco);

    }
 
    public void Remover(int id)
    {
        Visita visitaBanco = _rep.BuscarPorId(id);
        if (visitaBanco == null)
            throw new DomainException("Visita não encontrada");
        _rep.Remover(id);
    
    }
}
