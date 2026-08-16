using AgendaCampo.Contexts;
using AgendaCampo.Domains;
using AgendaCampo.Interface;

namespace AgendaCampo.Repositories;

public class EnderecoRepository : IEnderecoRepository
{
    private readonly AgendaCampoContext _ctx;
    public EnderecoRepository(AgendaCampoContext ctx) => _ctx = ctx;

    public List<Endereco> Listar()
    {
        return _ctx.Endereco.ToList();
    }

    public Endereco? buscarPorId(int id)
    {
        return _ctx.Endereco.Find(id);
    }

    public Endereco? buscarPorNome(string logradouro)
    {
        return _ctx.Endereco.FirstOrDefault(varAux => varAux.logradouro == logradouro);
    }

    public Endereco? buscarPorCEP(string cep)
    {
        return _ctx.Endereco.FirstOrDefault(varAux => varAux.cep == cep);
    }

    public void Adicionar(Endereco enrdc)
    {
        _ctx.Endereco.Add(enrdc);
        _ctx.SaveChanges();
    }

    public bool enderecoExiste(string logradouro)
    {
        return _ctx.Endereco.Any(varAux => varAux.logradouro == logradouro);
    }

    public void Atualizar(int id, Endereco enrdc)
    {
        Endereco? enderecoBanco = buscarPorId(id);
        if (enderecoBanco == null)
            return;
        
        enderecoBanco.logradouro = enrdc.logradouro;
        enderecoBanco.cep = enrdc.cep;
        enderecoBanco.bairro = enrdc.bairro;
        enderecoBanco.numero = enrdc.numero;
        

        _ctx.SaveChanges();
    }

    public void remover(int id)
    {
        Endereco? enderecoBanco = buscarPorId(id);
        if (enderecoBanco == null)
            return;
        _ctx.Endereco.Remove(enderecoBanco);
        _ctx.SaveChanges();
    }
}