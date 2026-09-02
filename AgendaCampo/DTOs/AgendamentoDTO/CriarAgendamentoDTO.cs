namespace AgendaCampo.DTOs.AgendamentoDTO
{
    public class CriarAgendamentoDTO
    {
        public Guid usuarioID { get; set; } 

        public DateTime data { get; set; } 

        public string empresaSede { get; set; } = null!;
    }
}
