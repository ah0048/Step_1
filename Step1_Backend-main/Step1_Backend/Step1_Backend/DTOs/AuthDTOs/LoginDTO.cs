using System.ComponentModel.DataAnnotations;

namespace Step1_Backend.DTOs.AuthDTOs
{
    public class LoginDTO
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
