using Step1_Backend.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Step1_Backend.DTOs.ReservationDTOs
{
    public class AddReservationDTO
    {
        [Required]
        // Allows Arabic letters, English letters, and spaces (2-200 chars)
        [RegularExpression(@"^[\p{IsArabic}a-zA-Z\s]{2,200}$",
            ErrorMessage = "Name must be in Arabic or English.")]
        public string ParentName { get; set; }

        [Required]
        [RegularExpression(@"^[\p{IsArabic}a-zA-Z\s]{2,200}$",
            ErrorMessage = "Name must be in Arabic or English.")]
        public string ChildName { get; set; }

        [Required]
        // Allows +123456789 or 0123456789 (7-15 digits total)
        [RegularExpression(@"^\+?[0-9]{7,15}$",
            ErrorMessage = "Invalid phone number format.")]
        public string PhoneNumber { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; }

        [Required]
        [Range(0.5, 18.0, ErrorMessage = "Age must be between 0.5 and 18.")]
        public float ChildAge { get; set; }

        [Required]
        public int TrainerId { get; set; }
        [Required]
        [Range(1, 3, ErrorMessage = "Please select a valid subscription plan.")]
        public SubscriptionPlan Subscription { get; set; }
    }
}
