using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Step1_Backend.Models
{
    public class AppDbContext: IdentityDbContext<ApplicationUser>
    {
        public virtual DbSet<Trainer> Trainers { get; set; }
        public virtual DbSet<Reservation> Reservations { get; set; }
        public virtual DbSet<Package> Packages { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
