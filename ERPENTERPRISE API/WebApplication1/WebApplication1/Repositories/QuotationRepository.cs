using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class QuotationRepository : IQuotationRepository
    {
        private readonly AppDbContext _context;

        public QuotationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Quotation>> GetAllAsync()
        {
            return await _context.Quotations
                .Include(q => q.Items)
                .OrderByDescending(q => q.Date)
                .ToListAsync();
        }

        public async Task<Quotation?> GetByIdAsync(int id)
        {
            return await _context.Quotations
                .Include(q => q.Items)
                .FirstOrDefaultAsync(q => q.Id == id);
        }

        public async Task<Quotation> AddAsync(Quotation quotation)
        {
            _context.Quotations.Add(quotation);
            await _context.SaveChangesAsync();
            return quotation;
        }

        public async Task UpdateAsync(Quotation quotation)
        {
            _context.Entry(quotation).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var quotation = await _context.Quotations.FindAsync(id);
            if (quotation != null)
            {
                _context.Quotations.Remove(quotation);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(string quotationNumber)
        {
            return await _context.Quotations.AnyAsync(q => q.QuotationNumber == quotationNumber);
        }
    }
}
