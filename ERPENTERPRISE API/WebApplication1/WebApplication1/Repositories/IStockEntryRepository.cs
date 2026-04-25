using WebApplication1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Repositories
{
    public interface IStockEntryRepository
    {
        Task<IEnumerable<StockEntry>> GetAllAsync();
        Task<IEnumerable<StockEntry>> GetByTypeAsync(string type); // 'IN', 'OUT', 'TRANSFER'
        Task<StockEntry?> GetByIdAsync(int id);
        Task<StockEntry> AddAsync(StockEntry entry);
        Task DeleteAsync(int id);
    }
}
