using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IQuotationService
    {
        Task<IEnumerable<Quotation>> GetQuotationsAsync();
        Task<Quotation?> GetQuotationByIdAsync(int id);
        Task<Quotation> CreateQuotationAsync(Quotation quotation);
        Task UpdateQuotationAsync(Quotation quotation);
        Task DeleteQuotationAsync(int id);
        Task<bool> QuotationExistsAsync(string quotationNumber);
    }
}
