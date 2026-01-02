using System.ComponentModel.DataAnnotations;

namespace Step1_Backend.DTOs.TrainerDTOs
{
    public class RateTrainerDTO
    {
        [Required]
        public int TrainerId { get; set; }
        [Required, Range(1, 5)]
        public float Rating { get; set; }
    }
}
