using AgendaCampo.Domains;
using AgendaCampo.Exceptions;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AgendaCampo.Applications.Autenticacao
{
    public class GeradorTokenJwt
    {
        private readonly IConfiguration _config;

        public GeradorTokenJwt(IConfiguration config)
        {
            _config = config;
        }

        public string GerarToken(Usuario usuario)
        {
            var chave = _config["Jwt:Key"]!; 
            var issuer = _config["Jwt:Issuer"]!; 
            var audience = _config["Jwt:Audience"]!;

            var expiraEmMinutos = int.Parse(_config["Jwt:ExpiraEmMinutos"]!); 

            var keyBytes = Encoding.UTF8.GetBytes(chave); 

            if (keyBytes.Length < 32) 
            {
                throw new DomainException("Jwt: Key precisa ter pelo menos 32 caracteres (256 bits).");
            }

            var securityKey = new SymmetricSecurityKey(keyBytes); 

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256); 

            var claims = new List<Claim>
           {
               new Claim (ClaimTypes.NameIdentifier, usuario.usuarioID.ToString()), 

               new Claim(ClaimTypes.Name, usuario.nome), 

               new Claim(ClaimTypes.Email, usuario.email) 
           };

            var token = new JwtSecurityToken(
                issuer: issuer,                                        
                audience: audience,                                     
                claims: claims,                                         
                expires: DateTime.Now.AddMinutes(expiraEmMinutos),     
                signingCredentials: credentials                         
            );

            
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}