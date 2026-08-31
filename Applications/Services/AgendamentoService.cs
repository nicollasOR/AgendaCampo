using AgendaCampo.Contexts;
using AgendaCampo.Domains;
using AgendaCampo.DTOs.AgendamentoDTO;
using AgendaCampo.Interface;
using AgendaCampo.Exceptions;

namespace AgendaCampo.Applications.Services
{
    public class AgendamentoService
    {
        private readonly IAgendamentoRepository _repository;
        private readonly AgendaCampoContext _context;

        private const int DiaAntecedenciaCriacao = 3;

        public AgendamentoService(IAgendamentoRepository repository, AgendaCampoContext context)
        {
            _repository = repository;
            _context = context;
        }

        public List<LerAgendamentoDTO> Buscar()
        {
            return _repository.Buscar().Select(LerDto).ToList();
        }

        public LerAgendamentoDTO BuscarPorId(int id)
        {
            var agendamentos = _repository.BuscarPorId(id)
                ?? throw new DomainException("Agendamento nao encontrado.");

            return LerDto(agendamentos);
        }

        public List<LerAgendamentoDTO> BuscarPorTecnico(Guid id)
        {
            var tecnico = _context.Usuario.Find(id)
                ?? throw new DomainException("Usuario nao encontrado");

            return _repository.BuscarPorTecnico(id).Select(LerDto).ToList();
        }

        private static void ValidarCriacao(CriarAgendamentoDTO dto)
        {
            if (dto.data < DateTime.Now.AddDays(DiaAntecedenciaCriacao))
            {
                throw new DomainException($"O agendamento deve ser feito com pelo menos {DiaAntecedenciaCriacao} dias de antecedência.");
            }

            var usuario = dto.usuarioID;
            if (usuario == null)
            {
                throw new DomainException("Insira um tecnico");
            }

            var data = dto.data;
            if (data == null)
            {
                throw new DomainException("Insira uma data e hora");
            }

            var empresa = dto.empresaSede;
            if (empresa == null)
            {
                throw new DomainException("Insira uma empresa");
            }
        }

        public LerAgendamentoDTO Criar(CriarAgendamentoDTO dto)
        {
            ValidarCriacao(dto);

            var usuario = _context.Usuario.Find(dto.usuarioID)
                ?? throw new DomainException("Usuario não encontrado.");

            var minimoPermitido = DateTime.Now.AddDays(DiaAntecedenciaCriacao);
            if (dto.data < minimoPermitido)
                throw new DomainException(
                    $"O agendamento deve ser criado com pelo menos {DiaAntecedenciaCriacao} dias de antecedência. " + $"Agendamento mínimo aceito: {minimoPermitido:dd/MM/yyyy HH:mm}.");

            if (_repository.ExisteConflitoHorario(dto.usuarioID, dto.data))
                throw new DomainException($"O profissional '{usuario.nome}' já possui agendamento nesse horário.");

            var agendamento = new Agendamento
            {
                data = dto.data,
                empresaSede = dto.empresaSede,
                usuarioID = dto.usuarioID,
                statusAgenda = true
            };

            _repository.Adicionar(agendamento);
            return LerDto(agendamento);
        }

        private LerAgendamentoDTO LerDto(Agendamento agendamento) 
        {
            return new LerAgendamentoDTO
            {
                agendaID = agendamento.agendaID,
                data = agendamento.data,
                empresaSede = agendamento.empresaSede,
                usuarioID = agendamento.usuarioID,
                statusAgenda = agendamento.statusAgenda,

            };
        }
    }
}
