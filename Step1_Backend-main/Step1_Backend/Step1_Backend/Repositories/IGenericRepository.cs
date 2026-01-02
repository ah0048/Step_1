namespace Step1_Backend.Repositories
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        Task<List<TEntity>> GetAllAsync();
        Task<TEntity?> GetByIdAsync(int id);
        Task AddAsync(TEntity obj);
        Task EditAsync(TEntity obj);
        Task DeleteAsync(int id);
    }
}
