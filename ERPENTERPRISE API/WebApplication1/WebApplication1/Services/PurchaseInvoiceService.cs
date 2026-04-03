using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class PurchaseInvoiceService : IPurchaseInvoiceService
    {
        private readonly IPurchaseInvoiceRepository _repository;
        private readonly IStockService _stockService;

        public PurchaseInvoiceService(IPurchaseInvoiceRepository repository, IStockService stockService)
        {
            _repository = repository;
            _stockService = stockService;
        }

        public async Task<IEnumerable<PurchaseInvoice>> GetAllInvoicesAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<PurchaseInvoice?> GetInvoiceByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<PurchaseInvoice> CreateInvoiceAsync(PurchaseInvoice invoice)
        {
            var createdInvoice = await _repository.AddAsync(invoice);

            // Increment stock for each item
            foreach (var item in invoice.Items)
            {
                await _stockService.UpdateStockAsync(item.ProductId, item.Quantity);
            }

            return createdInvoice;
        }

        public async Task UpdateInvoiceAsync(PurchaseInvoice invoice)
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
