using System.ComponentModel.DataAnnotations;

namespace AgendaCampo.DTOs.VisitaDTO;

public class criarVisitaDTO
{
    [Required(ErrorMessage = "O nome do evento é obrigatório")]
    [MaxLength(70, ErrorMessage = "É permitido no maximo 50 caracteres")]
    public string nomeEvento { get; set; } = null!;

    [Required(ErrorMessage = "a descricao é obrigatório")]
    public string descricao { get; set; } = null!;
 

    [Required(ErrorMessage = "um id de statusVisita é obrigatório")]
    public int statusVisitaId { get; set; }
    
    [Required(ErrorMessage = "um id de endereco é obrigatório")]
    public int enderecoId { get; set; }

    [Required(ErrorMessage = "Um nome do que e qual sede será visitada, é obrigatório")]
    public string nomeSede { get; set; } = string.Empty;

    // [Required(ErrorMessage = "Um nome de cliente pode ser necessário")]
    // public string nomeCliente { get; set; } = string.Empty;

    public Guid clienteId { get; set; } = Guid.Empty;
    [Required(ErrorMessage = "uma data inicial é obrigatória")]
    public DateTime dataInicio { get; set; } 
    [Required(ErrorMessage = "uma data final é obrigatória")]
    public DateTime dataTermino { get; set; }
    
    [Required(ErrorMessage = "Um ou mais usuários são necessários (sejam técnicos ou não)")] //
    public List<Guid?> usuariosIds { get; set; } = new List<Guid?>();


}