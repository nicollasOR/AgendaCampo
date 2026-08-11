using System.ComponentModel.DataAnnotations;
using AgendaCampo.Domains;

namespace AgendaCampo.DTOs.UsuarioDTO
{
    public class lerUsuarioDTO
    {
        [Required(ErrorMessage = "O ID e obrigatorio!")]
        public Guid usuarioID { get; set; } = Guid.Empty;
        
        [Required(ErrorMessage = "O nome é obrigatório")]
        [MaxLength(70, ErrorMessage = "É permitido no maximo 70 caracteres")]
        public string nome { get; set; } = null!;

        [Required(ErrorMessage = "O email é obrigatório")]
        [MaxLength(70, ErrorMessage = "É permitido no maximo 70 caracteres")]
        public string email { get; set; } = null!;

        public bool? statusUsuario { get; set; } = null!;
    }


    public class atualizarUsuarioDTO
    {
        [Required(ErrorMessage = "O ID e obrigatorio!")]
        public Guid usuarioID { get; set; } = Guid.Empty;
        
        [Required(ErrorMessage = "O nome é obrigatório")]
        [MaxLength(70, ErrorMessage = "É permitido no maximo 70 caracteres")]
        public string nome { get; set; } = null!;

        [Required(ErrorMessage = "O email é obrigatório")]
        [MaxLength(70, ErrorMessage = "É permitido no maximo 70 caracteres")]
        public string email { get; set; } = null!;
        
        [Required(ErrorMessage = "A senha é obrigatório")]
        public string senha { get; set; } = null!;

        // public bool? statusUsuario { get; set; } = null!;
    }


    public class atualizarSenhaDTO
    {
        [Required(ErrorMessage = "A senha é obrigatório")]
        public string senha { get; set; } = null!;
        
    }
}