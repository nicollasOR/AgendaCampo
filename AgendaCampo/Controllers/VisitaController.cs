using System.Security.Claims;
using AgendaCampo.Domains;
using AgendaCampo.DTOs.VisitaDTO;
using AgendaCampo.DTOs.UsuarioDTO;
using AgendaCampo.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RoyalGamess.Aplications.Services;


namespace AgendaCampo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitaController : ControllerBase
    {
        private readonly VisitaService _service;

        public VisitaController(VisitaService service)
        {
            _service = service;
        }

        private Guid obterUsuarioLogado()
        {
            string? idTexto = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(idTexto))
                throw new DomainException("Usuário não encontrado");

            return Guid.Parse(idTexto);
        }

        [HttpGet]
        public ActionResult<List<lerVisitaDTO>> Listar()
        {
            var list = _service.Listar();
            return Ok(list);
        }

        [HttpGet("futurasVisitas/{usuarioId}")]
        public ActionResult<List<lerVisitaDTO>> ListarFuturas(Guid usuarioId)
        {
            try
            {
                var lista = _service.listarFuturasVisitas(usuarioId);
                return Ok(lista);
            }
            catch (DomainException ex)
            {
                return NotFound(new { mensagem = ex.Message });
            }
        }

        [HttpGet("concluidas/{usuarioId}")]
        public ActionResult<List<lerVisitaDTO>> ListarConcluidas(Guid usuarioId)
        {
            try
            {
                //Guid? usuarioIds = obterUsuarioLogado();
                var lista = _service.ListarConcluidas(usuarioId);
                return Ok(lista);
            }
            catch (DomainException ex)
            {
                return NotFound(new { mensagem = ex.Message });
            }
        }

        [HttpGet("{id:int}")]
        public ActionResult<lerVisitaDTO> ObterPorId(int id)
        {
            try
            {
                lerVisitaDTO lerDTO = _service.buscarPorId(id);
                return Ok(lerDTO);
            }
            catch (DomainException ex)
            {
                return NotFound(new { mensagem = ex.Message });
            }
        }

        [HttpGet("buscarTitulo/{titulo}")]
        public ActionResult<lerVisitaDTO> BuscarPorTitulo(string titulo)
        {
            try
            {
                lerVisitaDTO lerDTO = _service.buscarPorTitulo(titulo);
                return Ok(lerDTO);
            }
            catch (DomainException ex)
            {
                return NotFound(new { mensagem = ex.Message });
            }
        }

        [HttpGet("buscarAgenda/{data}")]
        public ActionResult<lerVisitaDTO> BuscarData(DateTime data)
        {
            try
            {
                lerVisitaDTO lerDTO = _service.buscarPorAgendamento(data);
                return Ok(lerDTO);
            }
            catch (DomainException ex)
            {
                return NotFound(new { mensagem = ex.Message });
            }
        }

        [HttpGet("buscarEndereco/{logradouro}")]
        public ActionResult<lerVisitaDTO> BuscarPorEndereco(string logradouro)
        {
            try
            {
                lerVisitaDTO lerDTO = _service.buscarPorEndereco(logradouro.ToLower());
                return Ok(lerDTO);
            }
            catch (DomainException ex)
            {
                return NotFound(new { mensagem = ex.Message });
            }
        }

        [HttpPost("{usuarioId}")]
        public ActionResult<lerVisitaDTO> Adicionar([FromBody] criarVisitaDTO criarDTO, Guid usuarioId)
        {
            try
            {
                lerVisitaDTO postDTO = _service.Adicionar(criarDTO, usuarioId);
                return Created();
            }
            catch (DomainException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpPut("{id:int}")]
        public ActionResult<lerVisitaDTO> Atualizar(int id, [FromBody] atualizarVisitaDTO dto, Guid usuarioId)
        {
            try
            {
                lerVisitaDTO lerDTOs = _service.Atualizar(id, dto, usuarioId);
                return Ok(lerDTOs);
            }
            catch (DomainException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpPatch("reagendar/{id}")]
        public ActionResult<lerVisitaDTO> Reagendar(int id, [FromBody] reagendarVisita request)
        {
            try
            {
                var usuarioId = obterUsuarioLogado();
                var visitaReagendada = _service.atualizarData(id, request.dataInicio, request.dataFinal, usuarioId);
                return Ok(visitaReagendada);
            }
            catch (DomainException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Remover(int id)
        {
            try
            {
                _service.Remover(id);
                return NoContent();
            }
            catch (DomainException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }
    }

}