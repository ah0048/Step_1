using System.ComponentModel.DataAnnotations;

namespace Step1_Backend.DTOs.PackageDTOs
{
    public class PackageHomeCardDTO
    {
        public int Id { get; set; }
        public string PictureUrl { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
    }
}
