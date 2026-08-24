using AgendaCampo.Domains;
using AgendaCampo.DTOs.TipoUsuarioDTO;
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
    public class TipoUsuarioController : ControllerBase
    {
        private readonly TipoUsuarioService _service;

        public TipoUsuarioController(TipoUsuarioService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<tipoUsuarioDTO>> Listar()
        {
            List<tipoUsuarioDTO> list = _service.Listar();
            if (list == null)
            return NotFound(list);
            
            else
                return Ok(list);

        }
        
        
        
        [HttpPost]
        public ActionResult<tipoUsuarioDTO> Adicionar(tipoUsuarioDTO criarDto)
        {
            try
            {
                tipoUsuarioDTO lerDto = _service.Adicionar(criarDto);
                return StatusCode(201, lerDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
         
    }
    
}