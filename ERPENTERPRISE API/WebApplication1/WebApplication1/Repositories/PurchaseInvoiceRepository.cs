using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class PurchaseInvoiceRepository : IPurchaseInvoiceRepository
    {
        private readonly AppDbContext _context;

        public PurchaseInvoiceRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PurchaseInvoice>> GetAllAsync()
        {
            return await _context.PurchaseInvoices
                .Include(i => i.Supplier)
                .Include(i => i.Items)
                .ToListAsync();
        }

        public async Task<PurchaseInvoice?> GetByIdAsync(int id)
        {
            return await _context.PurchaseInvoices
                .Include(i => i.Supplier)
                .Include(i => i.Items)
                .FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<PurchaseInvoice> AddAsync(PurchaseInvoice invoice)
        {
            _context.PurchaseInvoices.Add(invoice);
            await _context.SaveChangesAsync();
            return invoice;
        }

        public async Task UpdateAsync(PurchaseInvoice invoice)
        {
            _context.Entry(invoice).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var invoice = await _context.PurchaseInvoices.FindAsync(id);
            if (invoice != null)
            {
                _context.PurchaseInvoices.Remove(invoice);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> InvoiceExistsAsync(string invoiceNumber)
        {
            return await _context.PurchaseInvoices.AnyAsync(i => i.InvoiceNumber == invoiceNumber);
        }
    }
}
