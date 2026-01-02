using Step1_Backend.Helpers;
using System.ComponentModel.DataAnnotations;

namespace Step1_Backend.DTOs.PackageDTOs
{
    public class UpdatePackageDTO
    {
        [Required]
        public int PackageId { get; set; }
        [AllowedImageExtensions(".jpg,.jpeg,.png,.gif,.bmp,.webp", 5)]
        public IFormFile Picture { get; set; }
        [MaxLength(200, ErrorMessage = "Package Title must be between less than 200 characters")]
        public string Title { get; set; }

        [MaxLength(1000, ErrorMessage = "Package Description must be between less than 1000 characters")]
        public string Description { get; set; }
        [Range(1.0, 100000.0, ErrorMessage = "Price must be between 1 and 100,000.")]
        public float Price { get; set; }
    }
}
