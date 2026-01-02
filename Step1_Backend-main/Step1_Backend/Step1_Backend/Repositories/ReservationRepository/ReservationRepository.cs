using Microsoft.EntityFrameworkCore;
using Step1_Backend.Models;

namespace Step1_Backend.Repositories.ReservationRepository
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly AppDbContext _dbContext;
        public ReservationRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddAsync(Reservation obj)
        {
            await _dbContext.Reservations.AddAsync(obj);
        }

        public async Task DeleteAsync(int id)
        {
            Reservation? reservation = await GetByIdAsync(id);
            if (reservation != null)
            {
                _dbContext.Reservations.Remove(reservation);
            }
        }

        public Task EditAsync(Reservation obj)
        {
            if (obj != null)
            {
                _dbContext.Attach(obj);
                _dbContext.Entry(obj).State = EntityState.Modified;
            }
            return Task.CompletedTask;
        }

        public async Task<List<Reservation>> GetAllAsync()
        {
            return await _dbContext.Reservations.OrderBy(r => r.CreationDate).Reverse().ToListAsync();
        }

        public async Task<Reservation?> GetByIdAsync(int id)
        {
            return await _dbContext.Reservations.FindAsync(id);
        }
    }
}
