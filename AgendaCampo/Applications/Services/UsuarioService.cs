using AgendaCampo.DTOs.UsuarioDTO;
using AgendaCampo.Domains;
using AgendaCampo.Exceptions;
using AgendaCampo.Interface;
using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;

namespace RoyalGamess.Aplications.Services
{
    public class UsuarioService
    {

        private readonly IUsuarioRepository _rep;
        
        public UsuarioService(IUsuarioRepository repo) => _rep = repo;

        private static byte[] HashSenha_(string senha)
        {
            if (string.IsNullOrEmpty(senha)) 
                throw new DomainException("Senha eh obrigatoria"); 
            using var sha256 = SHA256.Create();
            return sha256.ComputeHash(Encoding.UTF8.GetBytes(senha));
        }
        
        private static lerUsuarioDTO lerDTO(Usuario usuario)
        {
            lerUsuarioDTO usuarioDTO = new lerUsuarioDTO
            {
                usuarioID = usuario.usuarioID,
                email = usuario.email,
                nome = usuario.nome,
                // senha = 
                statusUsuario = usuario.statusUsuario ?? true
            };

            return usuarioDTO;
        }
        
        public List<lerUsuarioDTO> Listar()
        {
            List<Usuario> Listar = _rep.Listar();

            List<lerUsuarioDTO> lerUsuarioDTO = Listar.Select(varAux => lerDTO(varAux)).ToList();
            return lerUsuarioDTO;
        }

    }

}