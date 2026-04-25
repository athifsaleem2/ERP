using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface ISalesReturnRepository
    {
        Task<IEnumerable<SalesReturn>> GetAllAsync();
        Task<SalesReturn?> GetByIdAsync(int id);
        Task<SalesReturn?> GetByReturnNumberAsync(string returnNumber);
        Task<SalesReturn> AddAsync(SalesReturn salesReturn);
        Task UpdateAsync(SalesReturn salesReturn);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(string returnNumber);
    }
}
