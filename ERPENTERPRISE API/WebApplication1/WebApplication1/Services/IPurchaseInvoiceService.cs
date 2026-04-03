using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IPurchaseInvoiceService
    {
        Task<IEnumerable<PurchaseInvoice>> GetAllInvoicesAsync();
        Task<PurchaseInvoice?> GetInvoiceByIdAsync(int id);
        Task<PurchaseInvoice> CreateInvoiceAsync(PurchaseInvoice invoice);
        Task UpdateInvoiceAsync(PurchaseInvoice invoice);
        Task DeleteInvoiceAsync(int id);
        Task<bool> InvoiceExistsAsync(string invoiceNumber);
    }
}
