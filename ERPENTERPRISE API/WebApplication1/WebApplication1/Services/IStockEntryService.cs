using WebApplication1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
    public interface IStockEntryService
    {
        Task<IEnumerable<StockEntry>> GetAllEntriesAsync();
        Task<IEnumerable<StockEntry>> GetStockInAsync();
        Task<IEnumerable<StockEntry>> GetStockOutAsync();
        Task<IEnumerable<StockEntry>> GetStockTransfersAsync();
        Task<StockEntry?> GetEntryByIdAsync(int id);
        Task<StockEntry> CreateEntryAsync(StockEntry entry);
        Task DeleteEntryAsync(int id);
    }
}
