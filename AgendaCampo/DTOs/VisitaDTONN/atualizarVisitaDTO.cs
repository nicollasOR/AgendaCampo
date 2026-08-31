using System.ComponentModel.DataAnnotations;
using AgendaCampo.DTOs.EnderecoDTO;
using AgendaCampo.DTOs.VisitaDTO;

namespace AgendaCampo.DTOs.VisitaDTONN;

public class atualizarVisitaDTO
{
    [Required(ErrorMessage = "O nome do evento é obrigatório")]
    [MaxLength(70, ErrorMessage = "É permitido no maximo 50 caracteres")]
    public string titulo { get; set; } = null!;

    [Required(ErrorMessage = "a descricao é obrigatório")]
    public string descricao { get; set; } = null!;

    [Required(ErrorMessage = "um id de statusVisita é obrigatório")]
    public int statusVisitaId { get; set; }
    
    [Required(ErrorMessage = "um id de endereco é obrigatório")]
    public int enderecoId { get; set; }

    [Required(ErrorMessage = "Um nome do que e qual sede será visitada, é obrigatório")]
    public string nomeSede { get; set; } = string.Empty;

    public Guid clienteId { get; set; }
    
    [Required(ErrorMessage = "Um nome de cliente pode ser necessário")]
    public string nomeCliente { get; set; } = string.Empty;

    [Required(ErrorMessage = "uma data inicial é obrigatória")]
    public DateTime dataInicio { get; set; } 
    [Required(ErrorMessage = "uma data final é obrigatória")]
    public DateTime dataTermino { get; set; }
           //DateTimeOffSet
    
    
}

public class lerVisitaDTO
{
    public int visitaID { get; set; }
    [Required(ErrorMessage = "O nome do evento é obrigatório")]
    [MaxLength(70, ErrorMessage = "É permitido no maximo 50 caracteres")]
    public string nomeEvento { get; set; } = null!;

    [Required(ErrorMessage = "a descricao é obrigatório")]
    public string descricao { get; set; } = null!;
    

    // [Required(ErrorMessage = "um id de statusVisita é obrigatório")]
    // public int statusVisitaId { get; set; }
    //
    // [Required(ErrorMessage = "um id de endereco é obrigatório")]
    // public int enderecoId { get; set; }
    
    public lerEnderecoDTO Endereco { get; set; }
    public string statusVisita { get; set; } = string.Empty;
    [Required(ErrorMessage = "uma data inicial é obrigatória")]
    public DateTime dataInicio { get; set; } 
    [Required(ErrorMessage = "uma data final é obrigatória")]
    public DateTime dataTermino { get; set; }
    
    public string? logadouroEndereco { get; set; } = string.Empty;
    public string? nomeCliente { get; set; } = string.Empty;

    public List<usuariosGET> Tecnicos { get; set; } = new List<usuariosGET>();
}


public class usuariosGET
{
    public Guid usuarioID { get; set; } = Guid.Empty;
    public string nome { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string imgURL { get; set; }
}


public class reagendarVisita
{
    public DateTime dataInicio { get; set; }
    public DateTime dataFinal { get; set; }
}