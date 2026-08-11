using AgendaCampo.Domains;
using AgendaCampo.DTOs.UsuarioDTO;
using AgendaCampo.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RoyalGamess.Aplications.Services;

// using AgendaCampo.Apl

namespace AgendaCampo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _service;

        public UsuarioController(UsuarioService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<lerUsuarioDTO>> Listar()
        {
            List<lerUsuarioDTO> list = _service.Listar();
            if (list == null)
            {
                return NotFound(list);
            }
            else
            {
                return Ok(list);
            }

        }
        
        [HttpGet("{id}")]
        public ActionResult<lerUsuarioDTO> ObterPorId(Guid id)
        {
            try
            {
                lerUsuarioDTO usuario = _service.BuscarPorID(id);
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpGet("email/{email}")]
        public ActionResult<lerUsuarioDTO> ObterPorEmail(string email)
        {
            try
            {
                lerUsuarioDTO usuario = _service.buscarPorEmail(email);
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpPost]
        public ActionResult<lerUsuarioDTO> Adicionar(criarUsuarioDTO criarDto)
        {
            try
            {
                lerUsuarioDTO lerDto = _service.Adicionar(criarDto);
                return StatusCode(201, lerDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public ActionResult<lerUsuarioDTO> Atualizar(Guid id, atualizarUsuarioDTO criarDto)
        {
            try
            {
                lerUsuarioDTO lerDto = _service.Atualizar(id, criarDto);
                return Ok(lerDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("{id}")]
        public ActionResult<atualizarUsuarioDTO> AtualizarSenha(Guid id, atualizarSenhaDTO atualizarDTO)
        {
            try
            {
                _service.AtualizarSenha(id, atualizarDTO);
                return NoContent();

            }
            catch (DomainException e)
            {
                return BadRequest(e.Message);
            }
        }
        
        
        [HttpDelete("{id}")]
        public ActionResult Remover(Guid id)
        {
            try
            {
                _service.Remover(id);
                return Ok();
            }
            catch (DomainException ex)
            {
                return NotFound(ex.Message);
            }

        }
    }
    
}