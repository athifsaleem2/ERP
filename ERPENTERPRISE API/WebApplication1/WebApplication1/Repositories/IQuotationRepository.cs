using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IQuotationRepository
    {
        Task<IEnumerable<Quotation>> GetAllAsync();
        Task<Quotation?> GetByIdAsync(int id);
        Task<Quotation> AddAsync(Quotation quotation);
        Task UpdateAsync(Quotation quotation);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(string quotationNumber);
    }
}
