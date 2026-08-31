using AgendaCampo.Applications.Services;
using AgendaCampo.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using AgendaCampo.Applications;
using AgendaCampo.DTOs.EnderecoDTO;
using AgendaCampo.DTOs.VisitaDTO;
using RoyalGamess.Aplications.Services;

namespace AgendaCampo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusVisitaController : ControllerBase
    {
        private readonly StatusVisitaService _service;

        public StatusVisitaController(StatusVisitaService service) =>
        
            _service = service;
        

        [HttpGet]
        public ActionResult<List<lerStatusVisitaDTO>> Listar()
        {
            List<lerStatusVisitaDTO> endereco = _service.Listar();
            return Ok(endereco);
        }

        [HttpGet("{id}")]
        public ActionResult<lerStatusVisitaDTO> BuscarPorId(int id)
        {
            try
            {
                lerStatusVisitaDTO endereco = _service.BuscarPorID(id);
                return Ok(endereco);

            }
            catch (DomainException ex)
            {
                return NotFound(ex.Message);
            }
        }
 
        

        
        [HttpPost]
        public ActionResult<lerStatusVisitaDTO> Adicionar(criarStatusVisitaDTO dto)
        {
            try
            {
                lerStatusVisitaDTO statusVisitacreated = _service.Adicionar(dto);
                return StatusCode(201, statusVisitacreated);
            }
            catch (DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    
    }

    }
