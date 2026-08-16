using AgendaCampo.Applications.Services;
using AgendaCampo.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using AgendaCampo.Applications;
using AgendaCampo.DTOs.EnderecoDTO;

namespace AgendaCampo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnderecoController : ControllerBase
    {
        private readonly EnderecoService _service;

        public EnderecoController(EnderecoService service) =>
        
            _service = service;
        

        [HttpGet]
        public ActionResult<List<lerEnderecoDTO>> Listar()
        {
            List<lerEnderecoDTO> endereco = _service.Listar();
            return Ok(endereco);
        }

        [HttpGet("{id}")]
        public ActionResult<lerEnderecoDTO> BuscarPorId(int id)
        {
            try
            {
                lerEnderecoDTO endereco = _service.buscarPorId(id);
                return Ok(endereco);

            }
            catch (DomainException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("cep/{cep}")]
        public ActionResult <lerEnderecoDTO> buscarporCep(string cep)
        {
            try
            {

                lerEnderecoDTO enderecos = _service.buscarPorCEP(cep);
                return Ok(enderecos);
            }
            catch(DomainException ex)
            {
                return NotFound(ex.Message);
            }
        }
        
        [HttpGet("logradouro/{cep}")]
        public ActionResult <lerEnderecoDTO> buscarporLogradouro(string cep)
        {
            try
            {

                lerEnderecoDTO enderecos = _service.buscarPorNome(cep);
                return Ok(enderecos);
            }
            catch(DomainException ex)
            {
                return NotFound(ex.Message);
            }
        }
        
        

        
        [HttpPost]
        public ActionResult<lerEnderecoDTO> Adicionar(criarEnderecoDTO dto)
        {
            try
            {
                lerEnderecoDTO enderecoCriado = _service.Adicionar(dto);
                return StatusCode(201, enderecoCriado);
            }
            catch (DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        
        [HttpPut("{id}")]
        public ActionResult<lerEnderecoDTO> Atualizar(int id, lerEnderecoDTO criarDto)
        {
            try
            {
                lerEnderecoDTO lerDto = _service.atualizar(id, criarDto);
                return Ok(lerDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        
        [HttpDelete("{id}")]
        public ActionResult Remover(int id)
        {
            try
            {
                _service.Deletar(id);
                return Ok();
            }
            catch (DomainException ex)
            {
                return NotFound(ex.Message);
            }

        }
    }

    }
