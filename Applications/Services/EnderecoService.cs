using AgendaCampo.DTOs;
using AgendaCampo.Exceptions;
using AgendaCampo.Interfaces;
using AgendaCampo.Models;
using AgendaCampo.Repositories;

namespace AgendaCampo.Applications.Services
{
    public class EnderecoService 
    {
        private readonly IEnderecoRepository _repository;
        public EnderecoService(IEnderecoRepository repository)
        {
            _repository = repository;
        }

        private LerEnderecoDTO LerDTO(Endereco endereco)
        {
            return new LerEnderecoDTO
            {
                EnderecoId = endereco.EnderecoId,
                Logradouro = endereco.Logradouro,
                Bairro = endereco.Bairro,
                Numero = endereco.Numero,
                Cep = endereco.Cep
            };
        }



        public List<LerEnderecoDTO> BuscarTodosEnderecos()
        {
            List<Endereco> enderecos = _repository.BuscarTodosEnderecos();
            return enderecos.Select(e => new LerEnderecoDTO
            {
                EnderecoId = e.EnderecoId,
                Logradouro = e.Logradouro,
                Bairro = e.Bairro,
                Numero = e.Numero,
                Cep = e.Cep
            }).ToList();
        }


        public LerEnderecoDTO BuscarPorID(int id)
        {
            Endereco endereco = _repository.BuscarPorID(id)!;
            if(endereco == null)
            {
                throw new DomainException("Endereco não encontrado");
            }

            return LerDTO(endereco);
        }


        public LerEnderecoDTO CriarEndereco(CriarEnderecoDTO enderecoDTO)
        {
            Endereco endereco = new Endereco
            {
                Logradouro = enderecoDTO.Logradouro,
                Bairro = enderecoDTO.Bairro,
                Numero = enderecoDTO.Numero,
                Cep = enderecoDTO.Cep
            };
            _repository.CriarEndereco(endereco);

            return LerDTO(endereco);
              
        }

        public LerEnderecoDTO AtualizarEndereco(int id, CriarEnderecoDTO enderecoDTO)
        {
            Endereco endereco = _repository.BuscarPorID(id)!;
            if(endereco == null)
            {
                throw new DomainException("Endereco não encontrado");
            }

            endereco.Logradouro = enderecoDTO.Logradouro;
            endereco.Bairro = enderecoDTO.Bairro;
            endereco.Numero = enderecoDTO.Numero;
            endereco.Cep = enderecoDTO.Cep;

            _repository.AtualizarEndereco(endereco);

            return LerDTO(endereco);
        }






    }
}
