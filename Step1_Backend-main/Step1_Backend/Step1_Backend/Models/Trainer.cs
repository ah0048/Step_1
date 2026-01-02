using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Step1_Backend.Models
{
    public class Trainer
    {
        public int Id { get; set; }
        [Required]
        public string PictureUrl { get; set; }
        [Required, MaxLength(500)]
        public string ArabicName { get; set; }
        [Required, MaxLength(500)]
        public string EnglishName { get; set; }
        [Required, MaxLength(200)]
        public string Major { get; set; }
        [Required, MaxLength(200)]
        public string Specilization { get; set; }
        [Required]
        public string PicPublicId { get; set; }
        public float AverageRating { get; set; }
        public int RatingCount { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
    }
}
