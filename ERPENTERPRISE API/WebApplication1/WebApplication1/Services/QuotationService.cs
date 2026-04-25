using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class QuotationService : IQuotationService
    {
        private readonly IQuotationRepository _repository;

        public QuotationService(IQuotationRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Quotation>> GetQuotationsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Quotation?> GetQuotationByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Quotation> CreateQuotationAsync(Quotation quotation)
        {
            return await _repository.AddAsync(quotation);
        }

        public async Task UpdateQuotationAsync(Quotation quotation)
        {
            await _repository.UpdateAsync(quotation);
        }

        public async Task DeleteQuotationAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<bool> QuotationExistsAsync(string quotationNumber)
        {
            return await _repository.ExistsAsync(quotationNumber);
        }
    }
}
