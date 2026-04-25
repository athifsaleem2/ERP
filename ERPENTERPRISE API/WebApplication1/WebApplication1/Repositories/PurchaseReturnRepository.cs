using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class PurchaseReturnRepository : IPurchaseReturnRepository
    {
        private readonly AppDbContext _context;

        public PurchaseReturnRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PurchaseReturn>> GetAllAsync()
        {
            return await _context.PurchaseReturns
                .Include(r => r.Items)
                .OrderByDescending(r => r.ReturnDate)
                .ToListAsync();
        }

        public async Task<PurchaseReturn?> GetByIdAsync(int id)
        {
            return await _context.PurchaseReturns
                .Include(r => r.Items)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<PurchaseReturn> AddAsync(PurchaseReturn purchaseReturn)
        {
            _context.PurchaseReturns.Add(purchaseReturn);
            await _context.SaveChangesAsync();
            return purchaseReturn;
        }

        public async Task UpdateAsync(PurchaseReturn purchaseReturn)
        {
            _context.Entry(purchaseReturn).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var purchaseReturn = await _context.PurchaseReturns.FindAsync(id);
            if (purchaseReturn != null)
            {
                _context.PurchaseReturns.Remove(purchaseReturn);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(string returnNumber)
        {
            return await _context.PurchaseReturns.AnyAsync(r => r.ReturnNumber == returnNumber);
        }
    }
}
