using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IPurchaseInvoiceRepository
    {
        Task<IEnumerable<PurchaseInvoice>> GetAllAsync();
        Task<PurchaseInvoice?> GetByIdAsync(int id);
        Task<PurchaseInvoice> AddAsync(PurchaseInvoice invoice);
        Task UpdateAsync(PurchaseInvoice invoice);
        Task DeleteAsync(int id);
        Task<bool> InvoiceExistsAsync(string invoiceNumber);
    }
}
