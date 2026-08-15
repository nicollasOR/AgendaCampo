using AgendaCampo.Contexts;
using AgendaCampo.Interfaces;
using AgendaCampo.Models;

namespace AgendaCampo.Repositories
{
    public class EnderecoRepository: IEnderecoRepository
    {
        private readonly AgendaCampoContext _context;
        public EnderecoRepository(AgendaCampoContext context)
        {
            _context = context;
        }

        public List<Endereco> BuscarTodosEnderecos()
        {
            return _context.Enderecos.ToList();
        }

         public Endereco? BuscarPorID(int id)
        {
            return _context.Enderecos.Find(id);

        }


        public void CriarEndereco(Endereco endereco)
        {
            _context.Enderecos.Add(endereco);
            _context.SaveChanges();
        }



        public void AtualizarEndereco(Endereco endereco)
        {
            _context.Enderecos.Update(endereco);
            _context.SaveChanges();
        }
    }
}
