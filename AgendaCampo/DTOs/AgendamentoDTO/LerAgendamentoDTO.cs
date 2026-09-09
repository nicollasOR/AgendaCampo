namespace AgendaCampo.DTOs.AgendamentoDTO
{
    public class LerAgendamentoDTO
    {
        public int agendaID { get; set; }
        public DateTime data { get; set; }
        public string empresaSede { get; set; } = null!;
        public Guid usuarioID { get; set; } 
        public bool statusAgenda { get; set; }
    }
}
