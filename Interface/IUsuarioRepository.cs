using Microsoft.EntityFrameworkCore;
using AgendaCampo.Domains;

namespace AgendaCampo.Interface
{
    public interface IUsuarioRepository
    {
        public List<Usuario> Listar();
        public Usuario? ObterPorId(Guid id);
        public Usuario? ObterPorEmail(string email);
        public bool NomeExiste(string nome);
        public bool EmailExiste(string email);
        public void Adicionar(Usuario usuario);
        public void Atualizar(Usuario usuario);

        public void AtualizarSenha(Guid id, byte[] senha);
        public void Remover(Guid id);
    }
}