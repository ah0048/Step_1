using Step1_Backend.Models;
using Step1_Backend.Repositories.PackageRepository;
using Step1_Backend.Repositories.ReservationRepository;
using Step1_Backend.Repositories.TrainerRepository;

namespace Step1_Backend.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _dbContext;
        private ITrainerRepository? trainerRepo;
        private IReservationRepository? reservationRepo;
        private IPackageRepository? packageRepo;

        public UnitOfWork(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ITrainerRepository TrainerRepo
        {
            get
            {
                if (trainerRepo == null)
                {
                    trainerRepo = new TrainerRepository(_dbContext);
                }
                return trainerRepo;
            }
        }

        public IReservationRepository ReservationRepo
        {
            get
            {
                if (reservationRepo == null)
                {
                    reservationRepo = new ReservationRepository(_dbContext);
                }
                return reservationRepo;
            }
        }

        public IPackageRepository PackageRepo
        {
            get
            {
                if (packageRepo == null)
                {
                    packageRepo = new PackageRepository(_dbContext);
                }
                return packageRepo;
            }
        }

        public async Task SaveAsync()
        {
            await _dbContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _dbContext.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
