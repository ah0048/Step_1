using System.ComponentModel.DataAnnotations;

namespace Step1_Backend.Models
{
    public class Package
    {
        public int Id { get; set; }
        [Required]
        public string PictureUrl { get; set; }
        [Required]
        public string PicPublicId { get; set; }
        [Required]
        [MaxLength(200)]
        public string Title { get; set; }
        [Required]
        [MaxLength(1000)]
        public string Description { get; set; }
        [Required]
        [Range(1.0, 100000.0)]
        public float Price { get; set; }
        [Required]
        public int CustomerCount { get; set; }

    }
}
