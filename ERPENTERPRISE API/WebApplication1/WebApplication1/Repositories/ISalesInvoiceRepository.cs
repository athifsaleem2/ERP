using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface ISalesInvoiceRepository
    {
        Task<IEnumerable<SalesInvoice>> GetAllAsync();
        Task<SalesInvoice?> GetByIdAsync(int id);
        Task<SalesInvoice> AddAsync(SalesInvoice invoice);
        Task UpdateAsync(SalesInvoice invoice);
        Task DeleteAsync(int id);
        Task<bool> InvoiceExistsAsync(string invoiceNumber);
    }
}
