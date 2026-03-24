using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class SalesInvoiceRepository : ISalesInvoiceRepository
    {
        private readonly AppDbContext _context;

        public SalesInvoiceRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SalesInvoice>> GetAllAsync()
        {
            return await _context.SalesInvoices.Include(i => i.Items).ToListAsync();
        }

        public async Task<SalesInvoice?> GetByIdAsync(int id)
        {
            return await _context.SalesInvoices.Include(i => i.Items).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<SalesInvoice> AddAsync(SalesInvoice invoice)
        {
            _context.SalesInvoices.Add(invoice);
            await _context.SaveChangesAsync();
            return invoice;
        }

        public async Task UpdateAsync(SalesInvoice invoice)
        {
            _context.Entry(invoice).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var invoice = await _context.SalesInvoices.FindAsync(id);
            if (invoice != null)
            {
                _context.SalesInvoices.Remove(invoice);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> InvoiceExistsAsync(string invoiceNumber)
        {
            return await _context.SalesInvoices.AnyAsync(i => i.InvoiceNumber == invoiceNumber);
        }
    }
}
