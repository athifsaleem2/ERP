using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface ISalesInvoiceService
    {
        Task<IEnumerable<SalesInvoice>> GetInvoicesAsync();
        Task<SalesInvoice?> GetInvoiceByIdAsync(int id);
        Task<SalesInvoice> CreateInvoiceAsync(SalesInvoice invoice);
        Task UpdateInvoiceAsync(SalesInvoice invoice);
        Task DeleteInvoiceAsync(int id);
        Task<bool> InvoiceExistsAsync(string invoiceNumber);
    }
}
