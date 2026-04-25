using WebApplication1.Repositories;
using WebApplication1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
    public class StockEntryService : IStockEntryService
    {
        private readonly IStockEntryRepository _repository;

        public StockEntryService(IStockEntryRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<StockEntry>> GetAllEntriesAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<IEnumerable<StockEntry>> GetStockInAsync()
        {
            return await _repository.GetByTypeAsync("IN");
        }

        public async Task<IEnumerable<StockEntry>> GetStockOutAsync()
        {
            return await _repository.GetByTypeAsync("OUT");
        }

        public async Task<IEnumerable<StockEntry>> GetStockTransfersAsync()
        {
            return await _repository.GetByTypeAsync("TRANSFER");
        }

        public async Task<StockEntry?> GetEntryByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<StockEntry> CreateEntryAsync(StockEntry entry)
        {
            return await _repository.AddAsync(entry);
        }

        public async Task DeleteEntryAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
