using AgendaCampo.DTOs.UsuarioDTO;
using AgendaCampo.Domains;
using AgendaCampo.Exceptions;
using AgendaCampo.Interface;
using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;
using AgendaCampo.Applications.Conversões;
using AgendaCampo.Applications.Validações;
using AgendaCampo.DTOs.VisitaDTO;

namespace RoyalGamess.Aplications.Services
{
    public class StatusVisitaService
    {

        private readonly IStatusVisitaRepository _rep;
        
        public StatusVisitaService(IStatusVisitaRepository repo) => _rep = repo;

        private static byte[] HashSenha_(string senha)
        {
            if (string.IsNullOrEmpty(senha)) 
                throw new DomainException("Senha é obrigatória"); 
            using var sha256 = SHA256.Create();
            return sha256.ComputeHash(Encoding.UTF8.GetBytes(senha));
        }

        private static lerStatusVisitaDTO lerDTO(StatusVisita stsVisita)
        {
            return new lerStatusVisitaDTO
            {
                statusVisitaId = stsVisita.statusVisitaID,
                nomeStatusVisita = stsVisita.nomeStatus
            };
        }
        
 
        public List<lerStatusVisitaDTO> Listar()
        {
            List<StatusVisita> Listar = _rep.Listar();

            List<lerStatusVisitaDTO> lerStatusDTO = Listar.Select(varAux => lerDTO(varAux)).ToList();
            return lerStatusDTO;
        }


        public lerStatusVisitaDTO BuscarPorID(int id)
        {
            StatusVisita? statusVisitaB = _rep.buscarStatusVisitaId(id);
            if(statusVisitaB == null)
                throw new DomainException("StatusVisita não encontrado");

            return lerDTO(statusVisitaB);

        }

         
        public lerStatusVisitaDTO Adicionar(criarStatusVisitaDTO stsDto)
        {
 
            if (_rep.existeStatus(stsDto.nomeStatusVisita))
                throw new DomainException("Já existe um status com este nome");

            StatusVisita statusVisitaBan = new StatusVisita
            {
               nomeStatus = stsDto.nomeStatusVisita
            };
            
            _rep.Adicionar(statusVisitaBan);
            return lerDTO(statusVisitaBan);
        }

        // public lerUsuarioDTO Atualizar(int id, atualizarStatusVisitaDTO usuarioDTO)
        // {
        //     StatusVisita? stsBanco = _rep.buscarStatusVisitaId(id);
        //
        //     if (stsBanco == null)
        //         throw new DomainException("StatusVisita não encontrado");
        //
        //     if (usuarioDTO != null && stsBanco.statusVisitaID != id)
        //         throw new DomainException("StatusVisita inexistente");
        //
        //     if (_rep.existeStatus(usuarioDTO.nomeStatusVisita))
        //         throw new DomainException("Já existe um StatusVisita com esse ");
        //
        //     usuarioBanco.email = usuarioDTO.email;
        //     usuarioBanco.nome = usuarioDTO.nome;
        //     usuarioBanco.senha = HashSenha_(usuarioDTO.senha);
        //     usuarioBanco.Imagem = conversoesParaDTO.converterImg(usuarioDTO.img);
        //     
        //     _rep.Atualizar(stsBanco);
        //     return usuarioConversoes.lerUsuarioDTO(stsBanco);
        // }
 

 
        
    }

}