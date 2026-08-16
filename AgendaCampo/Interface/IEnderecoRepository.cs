using AgendaCampo.Domains;

namespace AgendaCampo.Interface;

public interface IEnderecoRepository
{
    public List<Endereco> Listar();

    public Endereco? buscarPorId(int id);

    public Endereco? buscarPorNome(string logradouro);

    public Endereco?  buscarPorCEP(string cep);

    public bool enderecoExiste(string logradouro);
    public void Adicionar(Endereco enrdc);
    public void Atualizar(int id, Endereco enrdc);
    public void remover(int id);
}