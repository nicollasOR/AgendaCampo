using AgendaCampo.Domains;
using AgendaCampo.DTOs.EventoDTO;
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

        [HttpGet]
        public ActionResult<List<lerVisitaDTO>> Listar()
        {
            List<lerVisitaDTO> list = _service.Listar();
            if (list == null)
                return NotFound(list);
            else
                return Ok(list);

        }

        [HttpGet("{id}")]
        public ActionResult<lerVisitaDTO> ObterPorId(int id)
        {
            try
            {
                lerVisitaDTO lerDTO = _service.buscarPorId(id);
                return Ok(lerDTO);
            }

            catch(DomainException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("buscarTitulo/{titulo}")]
        public ActionResult<lerVisitaDTO> buscarPorTitulo(string titulo)
        {
            try
            {
                lerVisitaDTO lerDTO = _service.buscarPorTitulo(titulo);
                return Ok(lerDTO);
            }

            catch(DomainException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("buscarAgenda/{data}")]
        public ActionResult<lerVisitaDTO> buscarData(DateTime data)
        {
            try
            {
                lerVisitaDTO lerDTO = _service.buscarPorAgendamento(data);
                return Ok(lerDTO);
            }

            catch(DomainException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("buscarEndereco/{logradouro}")]
        public ActionResult<lerVisitaDTO> buscarPorEndereco(string logradouro)
        {
            try
            {
                lerVisitaDTO lerDTO = _service.buscarPorEndereco(logradouro);
                return Ok(lerDTO);
            }

            catch(DomainException ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpPost]
        public ActionResult<lerVisitaDTO> Adicionar(criarVisitaDTO criarDTO)
        {
            try
            {
                lerVisitaDTO postDTO = _service.Adicionar(criarDTO);
                return NoContent();
            }

            catch(DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut]
        public ActionResult<lerVisitaDTO> Atualizar(lerVisitaDTO lerDTO)
        {

        }

        

    }

}