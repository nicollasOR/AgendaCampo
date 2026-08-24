using AgendaCampo.DTOs.UsuarioDTO;
using AgendaCampo.Domains;
using AgendaCampo.Exceptions;
using AgendaCampo.Interface;
using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;
using AgendaCampo.Applications.Conversoes;

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
            
            List<lerUsuarioDTO> lerUsuarioDTO = Listar.Select(varAux => UsuarioConversoes.lerDTO(varAux)).ToList();
            return lerUsuarioDTO;
        }


        public lerUsuarioDTO BuscarPorID(Guid id)
        {
            Usuario usuarioDto = _rep.ObterPorId(id);
            if(usuarioDto == null)
                throw new DomainException("Usuário não encontrado");

            return UsuarioConversoes.lerDTO(usuarioDto);

        }

        public lerUsuarioDTO buscarPorEmail(string email)
        {
            Usuario usuarioDTO = _rep.ObterPorEmail(email);
            if (usuarioDTO == null)
                throw new DomainException("Usuário não encontrado");

            return UsuarioConversoes.lerDTO(usuarioDTO);
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
                statusUsuario = true,
                Imagem = converterImg.ConverterImg(usuarioDTO.img)
            };
            
            _rep.Adicionar(usuario);
            return UsuarioConversoes.lerDTO(usuario);
        }

        public lerUsuarioDTO Atualizar(Guid id, atualizarUsuarioDTO usuarioDTO)
        {
            Usuario usuarioBanco = _rep.ObterPorId(id);

            if (usuarioBanco == null)
                throw new DomainException("Usuario nao encontrado");
            
            Validacoes.validarEmail(usuarioDTO.email);
            Validacoes.validarNome(usuarioDTO.nome);

            if (usuarioDTO != null && usuarioBanco.usuarioID != id)
                throw new DomainException("Usuario inexistente");

            if (_rep.EmailExiste(usuarioDTO.email))
                throw new DomainException("Já existe um usuário com esse e-mail");

            usuarioBanco.email = usuarioDTO.email;
            usuarioBanco.nome = usuarioDTO.nome;
            usuarioBanco.senha = HashSenha_(usuarioDTO.senha);
            
            _rep.Atualizar(usuarioBanco);
            return UsuarioConversoes.lerDTO(usuarioBanco);
        }

        public atualizarUsuarioDTO AtualizarImg(Guid id, atualizarUsuarioDTO atlzDTO)
        {
            Usuario? usuarioBanco = _rep.ObterPorId(id);
            if (usuarioBanco == null)
                throw new DomainException("Usuário não encontrado");

            if (atlzDTO.img != null && atlzDTO.img.Length > 0)
            {
                byte[] imagemBytes = converterImg.ConverterImg(atlzDTO.img);
                usuarioBanco.Imagem = imagemBytes;

                // 2. Passa os bytes já convertidos para o repositório
                _rep.AtualizarFoto(id, imagemBytes);                
            }

            return UsuarioConversoes.atlzrDTO(usuarioBanco);



        }

        public atualizarUsuarioDTO AtualizarSenha(Guid id, atualizarUsuarioDTO atualizarDTO)
        {
            
            Usuario usuarioBanco = _rep.ObterPorId(id);

            if (usuarioBanco == null)
                throw new DomainException("Usuario nao encontrado");
            usuarioBanco.senha = HashSenha_(atualizarDTO.senha);
            
            _rep.AtualizarSenha(id, usuarioBanco.senha);
            return UsuarioConversoes.atlzrDTO(usuarioBanco);
            

        }


        public void Remover(Guid id)
        {
            Usuario usuario = _rep.ObterPorId(id);
            if (usuario == null)
                throw new DomainException("Usuario nao encontrado");
            
            _rep.Remover(id);
        }
        
    }

}