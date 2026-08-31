using System.ComponentModel.DataAnnotations;

namespace AgendaCampo.DTOs.VisitaDTO;

public class atualizarStatusVisitaDTO
{
    // [Required(ErrorMessage = "o id do evento é obrigatório")]
    // public int? eventoid { get; set; } 
    [Required(ErrorMessage = "O nome do status é obrigatório")]
    [MaxLength(70, ErrorMessage = "É permitido no maximo 30 caracteres")]
    public string nomeStatusVisita { get; set; } = null!;
}

public class lerStatusVisitaDTO
{
    
    public int statusVisitaId { get; set; }
    [Required(ErrorMessage = "O nome do status é obrigatório")]
    [MaxLength(70, ErrorMessage = "É permitido no maximo 30 caracteres")]
    public string nomeStatusVisita { get; set; } = null!;


}