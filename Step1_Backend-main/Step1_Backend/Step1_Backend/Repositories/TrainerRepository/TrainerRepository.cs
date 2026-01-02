using Microsoft.EntityFrameworkCore;
using Step1_Backend.Models;

namespace Step1_Backend.Repositories.TrainerRepository
{
    public class TrainerRepository : ITrainerRepository
    {
        private readonly AppDbContext _dbContext;
        public TrainerRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(Trainer obj)
        {
            await _dbContext.Trainers.AddAsync(obj);
        }

        public async Task DeleteAsync(int id)
        {
            Trainer? trainer = await GetByIdAsync(id);
            if (trainer != null)
            {
                _dbContext.Trainers.Remove(trainer);
            }
        }

        public Task EditAsync(Trainer obj)
        {
            if (obj != null)
            {
                _dbContext.Attach(obj);
                _dbContext.Entry(obj).State = EntityState.Modified;
            }
            return Task.CompletedTask;
        }

        public async Task<List<Trainer>> GetAllAsync()
        {
            return await _dbContext.Trainers.OrderBy(t => t.EnglishName).ToListAsync();
        }

        public async Task<Trainer?> GetByIdAsync(int id)
        {
            return await _dbContext.Trainers.FindAsync(id);
        }
    }
}
