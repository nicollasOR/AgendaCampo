using AgendaCampo.Contexts;
using Microsoft.EntityFrameworkCore;
using AgendaCampo.Domains;
using AgendaCampo.Interface;

namespace AgendaCampo.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AgendaCampoContext _context;
        public UsuarioRepository(AgendaCampoContext context) => _context = context;

        
        public bool NomeExiste(string nome)
        {
            return _context.Usuario.Any(varAux => varAux.nome == nome);
        }
        public bool EmailExiste(string email)
        {
            return _context.Usuario.Any(varAux => varAux.email == email);
        }
        
        public List<Usuario> Listar()
        {
            return _context.Usuario.ToList();
        }

        public Usuario? ObterPorId(int id)
        {
            return _context.Usuario.Find(id);
        }

        public Usuario? ObterPorEmail(string email)
        {
            return _context.Usuario.FirstOrDefault(varAux => varAux.email == email);
        }

        public void Adicionar(Usuario usuario)
        {
            _context.Usuario.Add(usuario);
            _context.SaveChanges();
        }

        public void Atualizar(Usuario usuario)
        {
            // var usuarioBanco = _context.Usuario.Find()
            _context.Usuario.Update(usuario);
            _context.SaveChanges();
        }

        public void Remover(int id)
        {
            var usuarioBanco = ObterPorId(id);
            if (usuarioBanco == null)
                return;
            
            _context.Usuario.Remove(usuarioBanco);
            _context.SaveChanges();
        }
        
    }
}