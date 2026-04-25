using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class SalesReturnRepository : ISalesReturnRepository
    {
        private readonly AppDbContext _context;

        public SalesReturnRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SalesReturn>> GetAllAsync()
        {
            return await _context.SalesReturns
                .Include(r => r.Items)
                .OrderByDescending(r => r.ReturnDate)
                .ToListAsync();
        }

        public async Task<SalesReturn?> GetByIdAsync(int id)
        {
            return await _context.SalesReturns
                .Include(r => r.Items)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<SalesReturn?> GetByReturnNumberAsync(string returnNumber)
        {
            return await _context.SalesReturns
                .Include(r => r.Items)
                .FirstOrDefaultAsync(r => r.ReturnNumber == returnNumber);
        }

        public async Task<SalesReturn> AddAsync(SalesReturn salesReturn)
        {
            _context.SalesReturns.Add(salesReturn);
            await _context.SaveChangesAsync();
            return salesReturn;
        }

        public async Task UpdateAsync(SalesReturn salesReturn)
        {
            _context.Entry(salesReturn).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var salesReturn = await _context.SalesReturns.FindAsync(id);
            if (salesReturn != null)
            {
                _context.SalesReturns.Remove(salesReturn);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(string returnNumber)
        {
            return await _context.SalesReturns.AnyAsync(r => r.ReturnNumber == returnNumber);
        }
    }
}
