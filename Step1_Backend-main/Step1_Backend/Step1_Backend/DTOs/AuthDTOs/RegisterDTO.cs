using System.ComponentModel.DataAnnotations;

namespace Step1_Backend.DTOs.AuthDTOs
{
    public class RegisterDTO
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(100, MinimumLength = 7, ErrorMessage = "Password must be at least 7 characters long.")]
        public string Password { get; set; }
    }
}
