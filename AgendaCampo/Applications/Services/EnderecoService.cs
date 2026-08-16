using AgendaCampo.Applications.Validações;
using AgendaCampo.Domains;
using AgendaCampo.DTOs.EnderecoDTO;
using AgendaCampo.Exceptions;
using AgendaCampo.Interface;

namespace AgendaCampo.Applications;

public class EnderecoService
{
    private readonly IEnderecoRepository _rep;

    public EnderecoService(IEnderecoRepository rep) => _rep = rep;

    private static lerEnderecoDTO lerDTO(Endereco endereco)
    {
        return new lerEnderecoDTO
        {
            Bairro = endereco.bairro,
            Cep = endereco.cep,
            Logradouro = endereco.logradouro,
            Numero = endereco.numero,
            EnderecoId = endereco.enderecoID
        };
    }


    public List<lerEnderecoDTO> Listar()
    {
        List<Endereco> endereco = _rep.Listar();

        List<lerEnderecoDTO> enderecoDTO = endereco.Select(varAux => lerDTO(varAux)).ToList();

        return enderecoDTO;
    }

    public lerEnderecoDTO buscarPorId(int id)
    {
        Endereco? bancoEndrc = _rep.buscarPorId(id);

        if (bancoEndrc == null)
            throw new DomainException("Endereco nao encontrado!");

        return lerDTO(bancoEndrc);
    }

    public lerEnderecoDTO buscarPorNome(string logradouro)
    {
        Endereco? bancoEndrc = _rep.buscarPorNome(logradouro);

        if (bancoEndrc == null)
            throw new DomainException("Endereco nao encontrado!");

        return lerDTO(bancoEndrc);
    }


    public lerEnderecoDTO buscarPorCEP(string cep)
    {
        Endereco? endereco = _rep.buscarPorCEP(cep);
        if (endereco == null)
            throw new DomainException("Endereco nao encontrado!");

        return lerDTO(endereco);

    }


    public lerEnderecoDTO Adicionar(criarEnderecoDTO criarDTO)
    {
        if (_rep.enderecoExiste(criarDTO.Logradouro))
            throw new DomainException("Já existe este logradouro");
        Validacoes.validarCEP(criarDTO.Cep);

        Endereco? endereco = new Endereco
        {
            logradouro = criarDTO.Logradouro,
            bairro = criarDTO.Bairro,
            cep = criarDTO.Cep,
            numero = criarDTO.Numero
        };
        _rep.Adicionar(endereco);
        return lerDTO(endereco);


    }


    public lerEnderecoDTO atualizar(int id, lerEnderecoDTO atualizarDTO)
    {
        Endereco? enderecoBanco = _rep.buscarPorId(id);
        if (enderecoBanco == null)
            throw new DomainException("Endereço não encontrado");

        Validacoes.validarCEP(atualizarDTO.Cep);
        enderecoBanco.cep = atualizarDTO.Cep;
        enderecoBanco.logradouro = atualizarDTO.Logradouro;
        enderecoBanco.bairro = atualizarDTO.Bairro;
        enderecoBanco.numero = atualizarDTO.Numero;

        return lerDTO(enderecoBanco);
    }

    public void Deletar(int id)
    {
        Endereco? enderecoBanco = _rep.buscarPorId(id);
        if (enderecoBanco == null)
            throw new DomainException("Endereço não encontrado");

        _rep.remover(id);

    }



}
