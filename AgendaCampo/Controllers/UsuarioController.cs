using AgendaCampo.DTOs.UsuarioDTO;
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
    }
    
}