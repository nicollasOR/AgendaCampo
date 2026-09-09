using AgendaCampo.Applications.Autenticacao;
using AgendaCampo.Domains;
using AgendaCampo.DTOs.AutenticacaoDto;
using AgendaCampo.Exceptions;
using AgendaCampo.Interface;

namespace AgendaCampo.Applications.Services
{
    public class AutenticacaoService
    {
        private readonly IUsuarioRepository _repository;
        private readonly GeradorTokenJwt _tokenJwt;

        public AutenticacaoService(IUsuarioRepository repository, GeradorTokenJwt tokenJwt)
        {
            _repository = repository;
            _tokenJwt = tokenJwt;
        }

        private static bool VerificarSenha(string senhaDigitada, byte[] senhaHashBanco)
        {
            using var sha = System.Security.Cryptography.SHA256.Create();
            var hashDigitado = sha.ComputeHash(System.Text.Encoding.UTF8.GetBytes(senhaDigitada));

            return hashDigitado.SequenceEqual(senhaHashBanco);
        }

        public TokenDTO Login(LoginDTO loginDto)
        {
            Usuario usuario = _repository.ObterPorEmail(loginDto.Email);

            if (usuario == null)
            {
                throw new DomainException("E-mail ou senha inválidos.");
            }

            if (!VerificarSenha(loginDto.Senha, usuario.senha))
            {
                throw new DomainException("E-mail ou senha inválidos.");
            }

            if (usuario.statusUsuario == false)
            {
                throw new DomainException("Usuário está inativado.");
            }

            var token = _tokenJwt.GerarToken(usuario);

            TokenDTO novoToken = new TokenDTO { Token = token };

            return novoToken;
        }
    }
}
