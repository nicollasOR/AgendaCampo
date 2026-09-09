using AgendaCampo.Applications.Services;
using AgendaCampo.DTOs.AutenticacaoDto;
using AgendaCampo.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgendaCampo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacaoController : ControllerBase
    {
        private readonly AutenticacaoService _service;

        public AutenticacaoController(AutenticacaoService service)
        {
            _service = service;
        }

        [HttpPost("login")] 
        public ActionResult<TokenDTO> Login(LoginDTO loginDto)
        {
            try
            {
                var token = _service.Login(loginDto);

                return Ok(token);
            }
            catch (DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
