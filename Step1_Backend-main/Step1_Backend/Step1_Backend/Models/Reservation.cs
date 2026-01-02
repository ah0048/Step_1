using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Step1_Backend.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        [Required]
        public string ParentName { get; set; }
        [Required]
        public string ChildName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public float ChildAge { get; set; }
        [Required]
        public DateTime CreationDate { get; set; }
        [Required]
        [ForeignKey(nameof(Trainer))]
        public int TrainerId { get; set; }
        public virtual Trainer Trainer { get; set; }
        public SubscriptionPlan Subscription { get; set; }
    }

    public enum SubscriptionPlan
    {
        [Display(Name = "تاسيس عربي")]
        ArabicFoundation = 1,

        [Display(Name = "تاسيس انجليزي")]
        EnglishFoundation = 2,

        [Display(Name = "تنمية مهارات")]
        SkillsDevelopment = 3
    }
}
