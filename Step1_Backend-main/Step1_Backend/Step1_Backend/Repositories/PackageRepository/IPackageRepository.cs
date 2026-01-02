using Step1_Backend.Models;

namespace Step1_Backend.Repositories.PackageRepository
{
    public interface IPackageRepository:IGenericRepository<Package>
    {
        Task<List<Package>> GetAllSortedAsync();
    }
}
