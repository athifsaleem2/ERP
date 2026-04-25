using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Repositories
{
    public class StockEntryRepository : IStockEntryRepository
    {
        private readonly AppDbContext _context;

        public StockEntryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<StockEntry>> GetAllAsync()
        {
            return await _context.StockEntries
                .OrderByDescending(e => e.Date)
                .ToListAsync();
        }

        public async Task<IEnumerable<StockEntry>> GetByTypeAsync(string type)
        {
            return await _context.StockEntries
                .Where(e => e.Type == type)
                .OrderByDescending(e => e.Date)
                .ToListAsync();
        }

        public async Task<StockEntry?> GetByIdAsync(int id)
        {
            return await _context.StockEntries.FindAsync(id);
        }

        public async Task<StockEntry> AddAsync(StockEntry entry)
        {
            entry.Date = entry.Date == default ? DateTime.UtcNow : entry.Date;
            _context.StockEntries.Add(entry);
            await _context.SaveChangesAsync();
            return entry;
        }

        public async Task DeleteAsync(int id)
        {
            var entry = await _context.StockEntries.FindAsync(id);
            if (entry != null)
            {
                _context.StockEntries.Remove(entry);
                await _context.SaveChangesAsync();
            }
        }
    }
}
