using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class SalesInvoiceService : ISalesInvoiceService
    {
        private readonly ISalesInvoiceRepository _repository;

        public SalesInvoiceService(ISalesInvoiceRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<SalesInvoice>> GetInvoicesAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<SalesInvoice?> GetInvoiceByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<SalesInvoice> CreateInvoiceAsync(SalesInvoice invoice)
        {
            return await _repository.AddAsync(invoice);
        }

        public async Task UpdateInvoiceAsync(SalesInvoice invoice)
        {
            await _repository.UpdateAsync(invoice);
        }

        public async Task DeleteInvoiceAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<bool> InvoiceExistsAsync(string invoiceNumber)
        {
            return await _repository.InvoiceExistsAsync(invoiceNumber);
        }
    }
}
