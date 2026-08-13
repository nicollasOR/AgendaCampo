using AgendaCampo.Models;

namespace AgendaCampo.Interfaces
{
    public interface IEnderecoRepository
    {

        public List<Endereco> BuscarTodosEnderecos();
        public void CriarEndereco(Endereco endereco);
        public void AtualizarEndereco(Endereco endereco);
        Endereco? BuscarPorID(int Id);

    }
}
