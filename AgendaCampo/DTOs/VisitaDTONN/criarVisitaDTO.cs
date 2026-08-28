using System.ComponentModel.DataAnnotations;

namespace AgendaCampo.DTOs.VisitaDTO;

public class criarVisitaDTO
{
    [Required(ErrorMessage = "O nome do evento é obrigatório")]
    [MaxLength(70, ErrorMessage = "É permitido no maximo 50 caracteres")]
    public string nomeEvento { get; set; } = null!;

    [Required(ErrorMessage = "a descricao é obrigatório")]
    public string descricao { get; set; } = null!;
    
    public bool statusRealizado { get; set; }

    [Required(ErrorMessage = "um id de agendamento é obrigatório")]
    public int agendamentoId { get; set; }
    
    [Required(ErrorMessage = "um id de endereco é obrigatório")]
    public int enderecoId { get; set; }

    [Required(ErrorMessage = "Um nome do que e qual sede será visitada, é obrigatório")]
    public string nomeSede { get; set; } = string.Empty;

    [Required(ErrorMessage = "uma data inicial é obrigatória")]
    public DateTime dataInicio { get; set; } 
    [Required(ErrorMessage = "uma data final é obrigatória")]
    public DateTime dataTermino { get; set; }


}