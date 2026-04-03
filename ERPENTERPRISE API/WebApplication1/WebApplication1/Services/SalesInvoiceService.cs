using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class SalesInvoiceService : ISalesInvoiceService
    {
        private readonly ISalesInvoiceRepository _repository;
        private readonly IStockService _stockService;

        public SalesInvoiceService(ISalesInvoiceRepository repository, IStockService stockService)
        {
            _repository = repository;
            _stockService = stockService;
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
            var createdInvoice = await _repository.AddAsync(invoice);

            // Decrement stock for each item
            foreach (var item in createdInvoice.Items)
            {
                if (item.ProductId.HasValue)
                {
                    await _stockService.UpdateStockAsync(item.ProductId.Value, -item.Quantity);
                }
            }

            return createdInvoice;
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
