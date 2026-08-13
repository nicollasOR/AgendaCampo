using AgendaCampo.Applications.Services;
using AgendaCampo.DTOs;
using AgendaCampo.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgendaCampo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnderecoController : ControllerBase
    {
        private readonly EnderecoService _service;
        public EnderecoController(EnderecoService service)
        {
            _service = service;
        }


        [HttpGet]
        public ActionResult<List<LerEnderecoDTO>> BuscarTodosEnderecos()
        {
            var enderecos = _service.BuscarTodosEnderecos();
            return Ok(enderecos);
        }


        [HttpGet("{id}")]

        public ActionResult<LerEnderecoDTO> BuscarPorID(int id)
        {
            
                var endereco = _service.BuscarPorID(id);

            if (endereco == null)
            {
                return NotFound();
            }

                return Ok(endereco);

        }


        [HttpPost]

        public ActionResult<LerEnderecoDTO> CriarEndereco(CriarEnderecoDTO dto)
        {
            try
            {
                var endereco = _service.CriarEndereco(dto);
                return StatusCode(201, endereco);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpPut("{id}")]

        public ActionResult AtualizarEndereco(int id, CriarEnderecoDTO dto)
        {
            var endereco = _service.BuscarPorID(id);

            if (endereco == null)
            {
                return NotFound();
            }

            _service.AtualizarEndereco(id, dto);
                return NoContent();
           
        }
    }
}
