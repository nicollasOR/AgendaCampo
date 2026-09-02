using AgendaCampo.DTOs.UsuarioDTO;
using AgendaCampo.Domains;
using AgendaCampo.Exceptions;
using AgendaCampo.Interface;
using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;
using AgendaCampo.Applications.Conversões;
using AgendaCampo.Applications.Validações;

namespace RoyalGamess.Aplications.Services
{
    public class UsuarioService
    {

        private readonly IUsuarioRepository _rep;
        
        public UsuarioService(IUsuarioRepository repo) => _rep = repo;

        private static byte[] HashSenha_(string senha)
        {
            if (string.IsNullOrEmpty(senha)) 
                throw new DomainException("Senha é obrigatória"); 
            using var sha256 = SHA256.Create();
            return sha256.ComputeHash(Encoding.UTF8.GetBytes(senha));
        }
        
 
        public List<lerUsuarioDTO> Listar()
        {
            List<Usuario> Listar = _rep.Listar();

            List<lerUsuarioDTO> lerUsuarioDTO = Listar.Select(varAux => usuarioConversoes.lerUsuarioDTO(varAux)).ToList();
            return lerUsuarioDTO;
        }


        public lerUsuarioDTO BuscarPorTelefone(string telefone)
        {
            Usuario? usuarioD = _rep.ObterPorTelefone(telefone);
            if (usuarioD == null)
                throw new DomainException("Telefone não encontrado");

            return usuarioConversoes.lerUsuarioDTO(usuarioD);
        }


        public lerUsuarioDTO BuscarPorID(Guid id)
        {
            Usuario usuarioDto = _rep.ObterPorId(id);
            if(usuarioDto == null)
                throw new DomainException("Usuário não encontrado");

            return usuarioConversoes.lerUsuarioDTO(usuarioDto);

        }

        public lerUsuarioDTO buscarPorEmail(string email)
        {
            Usuario usuarioDTO = _rep.ObterPorEmail(email);
            Validacoes.validarEmail(email);
            if (usuarioDTO == null)
                throw new DomainException("Usuário não encontrado");

            return usuarioConversoes.lerUsuarioDTO(usuarioDTO);
        }

        public byte[] obterImg(Guid id)
        {
            byte[] img = _rep.ObterImg(id);

            if (img == null || img.Length == 0)
                throw new DomainException("Imagem não encontrada");

            return img;
        }

        public lerUsuarioDTO Adicionar(criarUsuarioDTO usuarioDTO)
        {
            Validacoes.validarEmail(usuarioDTO.email);
            
            Validacoes.validarNome(usuarioDTO.nome);

            if (_rep.EmailExiste(usuarioDTO.email))
                throw new DomainException("Já existe um usuário com esse e-mail");

            Usuario usuario = new Usuario
            {
                nome = usuarioDTO.nome,
                email = usuarioDTO.email,
                senha = HashSenha_(usuarioDTO.senha),
                Imagem = conversoesParaDTO.converterImg(usuarioDTO.img),
                telefone = usuarioDTO.telefone,
                statusUsuario = true
            };
            
            _rep.Adicionar(usuario);
            return usuarioConversoes.lerUsuarioDTO(usuario);
        }

        public lerUsuarioDTO Atualizar(Guid id, atualizarUsuarioDTO usuarioDTO)
        {
            Usuario usuarioBanco = _rep.ObterPorId(id);

            if (usuarioBanco == null)
                throw new DomainException("Usuario não encontrado");
            
            Validacoes.validarEmail(usuarioDTO.email);
            Validacoes.validarNome(usuarioDTO.nome);

            if (usuarioDTO != null && usuarioBanco.usuarioID != id)
                throw new DomainException("Usuario inexistente");

            if (_rep.EmailExiste(usuarioDTO.email))
                throw new DomainException("Já existe um usuário com esse e-mail");

            usuarioBanco.email = usuarioDTO.email;
            usuarioBanco.nome = usuarioDTO.nome;
            usuarioBanco.senha = HashSenha_(usuarioDTO.senha);
            usuarioBanco.Imagem = conversoesParaDTO.converterImg(usuarioDTO.img);
            
            _rep.Atualizar(usuarioBanco);
            return usuarioConversoes.lerUsuarioDTO(usuarioBanco);
        }

        public void AtualizarSenha(Guid id, atualizarSenhaDTO atualizarDTO)
        {
            
            Usuario usuarioBanco = _rep.ObterPorId(id);

            if (usuarioBanco == null)
                throw new DomainException("Usuario não encontrado");
            usuarioBanco.senha = HashSenha_(atualizarDTO.senha);
            
            _rep.AtualizarSenha(id, usuarioBanco.senha);
            // return lerDTO(atualizarDTO);

        }

        public lerUsuarioDTO atualizarImg(Guid id, IFormFile img)
        {
            Usuario? usuarioBanco = _rep.ObterPorId(id);
            if (usuarioBanco == null)
                throw new DomainException("Usuario não encontrado");

            usuarioBanco.Imagem = conversoesParaDTO.converterImg(img);
            
            _rep.Atualizar(usuarioBanco);
            return usuarioConversoes.lerUsuarioDTO(usuarioBanco);
        }


        public void Remover(Guid id)
        {
            Usuario usuario = _rep.ObterPorId(id);
            if (usuario == null)
                throw new DomainException("Usuário não encontrado");
            
            _rep.Remover(id);
        }
        
    }

}