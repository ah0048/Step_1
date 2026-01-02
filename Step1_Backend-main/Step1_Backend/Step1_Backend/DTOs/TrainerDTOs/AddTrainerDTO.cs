using Step1_Backend.Helpers;
using System.ComponentModel.DataAnnotations;

namespace Step1_Backend.DTOs.TrainerDTOs
{
    public class AddTrainerDTO
    {
        [Required]
        [AllowedImageExtensions(".jpg,.jpeg,.png,.gif,.bmp,.webp", 5)]
        public IFormFile Picture { get; set; }
        [Required]
        [RegularExpression(
            @"^[\p{IsArabic}\s]{2,500}$",
            ErrorMessage = "Arabic name may only contain Arabic letters and spaces (2–500 chars)."
        )]
        public string ArabicName { get; set; }
        [Required]
        [RegularExpression(
            @"^[A-Za-z\s]{2,500}$",
            ErrorMessage = "English name may only contain A–Z letters and spaces (2–500 chars)."
        )]
        public string EnglishName { get; set; }
        [Required, MaxLength(200)]
        public string Major { get; set; }
        [Required, MaxLength(200)]
        public string Specilization { get; set; }
    }
}
