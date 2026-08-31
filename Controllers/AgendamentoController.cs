using AgendaCampo.Applications.Services;
using AgendaCampo.DTOs.AgendamentoDTO;
using AgendaCampo.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AgendaCampo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgendamentoController : ControllerBase
    {
        private readonly AgendamentoService _service;

        public AgendamentoController(AgendamentoService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<LerAgendamentoDTO>> Listar()
        {
            List<LerAgendamentoDTO> agendamentos = _service.Buscar();
            return Ok(agendamentos);
        }

        [HttpGet("{id}")]
        public ActionResult<LerAgendamentoDTO> BuscarPorId(int id)
        {
            try
            {
                LerAgendamentoDTO agendamento = _service.BuscarPorId(id);
                return Ok(agendamento);

            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("usuario/{id}")]
        public ActionResult <List<LerAgendamentoDTO>> BuscarPorTecnico(Guid id)
        {
            try
            {

                List<LerAgendamentoDTO> agendamentos = _service.BuscarPorTecnico(id);
                return Ok(agendamentos);
            }
            catch(DomainException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<LerAgendamentoDTO> Criar(CriarAgendamentoDTO dto)
        {
            try
            {
                LerAgendamentoDTO agendamentoCriado = _service.Criar(dto);
                return StatusCode(201, agendamentoCriado);
            }
            catch (DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}