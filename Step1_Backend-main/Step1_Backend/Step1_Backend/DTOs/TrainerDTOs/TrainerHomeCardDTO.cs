using System.ComponentModel.DataAnnotations;

namespace Step1_Backend.DTOs.TrainerDTOs
{
    public class TrainerHomeCardDTO
    {
        public int Id { get; set; }
        public string PictureUrl { get; set; }
        public string ArabicName { get; set; }
        public string EnglishName { get; set; }
        public string Major { get; set; }
        public string Specilization { get; set; }
        public float AverageRating { get; set; }
    }
}
