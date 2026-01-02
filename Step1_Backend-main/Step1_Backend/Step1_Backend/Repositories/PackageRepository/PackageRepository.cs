using Microsoft.EntityFrameworkCore;
using Step1_Backend.Models;

namespace Step1_Backend.Repositories.PackageRepository
{
    public class PackageRepository : IPackageRepository
    {
        private readonly AppDbContext _dbContext;
        public PackageRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddAsync(Package obj)
        {
            await _dbContext.Packages.AddAsync(obj);
        }

        public async Task DeleteAsync(int id)
        {
            Package? package = await GetByIdAsync(id);
            if (package != null)
            {
                _dbContext.Packages.Remove(package);
            }
        }

        public Task EditAsync(Package obj)
        {
            if (obj != null)
            {
                _dbContext.Attach(obj);
                _dbContext.Entry(obj).State = EntityState.Modified;
            }
            return Task.CompletedTask;
        }

        public async Task<List<Package>> GetAllAsync()
        {
            return await _dbContext.Packages.ToListAsync();
        }

        public async Task<List<Package>> GetAllSortedAsync()
        {
            return await _dbContext.Packages.OrderByDescending(p=> p.CustomerCount).ToListAsync();
        }

        public async Task<Package?> GetByIdAsync(int id)
        {
            return await _dbContext.Packages.FindAsync(id);
        }
    }
}
