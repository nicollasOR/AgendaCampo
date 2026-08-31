using System.ComponentModel.DataAnnotations;

namespace AgendaCampo.DTOs.VisitaDTO;

public class criarStatusVisitaDTO
{
    [Required(ErrorMessage = "O nome do status é obrigatório")]
    [MaxLength(70, ErrorMessage = "É permitido no maximo 30 caracteres")]
    public string nomeStatusVisita { get; set; } = null!;

     


}