using System.ComponentModel.DataAnnotations;

namespace AgendaCampo.DTOs.VisitaDTONN;

public class criarVisitaDTO_Novo
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

    [Required(ErrorMessage = "Todo evento deve ter um usuário")]
    public List<Guid?> usuarioIds { get; set; } 

    [Required(ErrorMessage = "uma data inicial é obrigatória")]
    public DateTime dataInicio { get; set; } 
    [Required(ErrorMessage = "uma data final é obrigatória")]
    public DateTime dataTermino { get; set; }


}