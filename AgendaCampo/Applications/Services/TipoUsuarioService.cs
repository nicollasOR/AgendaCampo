using AgendaCampo.Domains;
using AgendaCampo.DTOs.TipoUsuarioDTO;
using AgendaCampo.Exceptions;
using AgendaCampo.Interface;

namespace RoyalGamess.Aplications.Services;

public class TipoUsuarioService
{
    private readonly ITipoUsuarioRepository _rep;

    public TipoUsuarioService(ITipoUsuarioRepository rep) => _rep = rep;

    private static tipoUsuarioDTO lerDto(TipoUsuario tipoUsuario)
    {
        return new tipoUsuarioDTO
        {
            nomeTipo = tipoUsuario.nomeTipo
        };
    }


    public List<tipoUsuarioDTO> Listar()
    {
        List<TipoUsuario> tipoBanco = _rep.Listar();

        List<tipoUsuarioDTO> tipoDTO = tipoBanco.Select(varAux => lerDto(varAux)).ToList();
        return tipoDTO;
    }

    public tipoUsuarioDTO Adicionar(tipoUsuarioDTO tipoDTO)
    {
        if(_rep.ExisteTipoUsuario(tipoDTO.nomeTipo))
            throw new DomainException("Já existe este tipoUsuario");

        TipoUsuario tipoUsuario = new TipoUsuario
        {
            nomeTipo = tipoDTO.nomeTipo
        };

        return lerDto(tipoUsuario);



    }
}