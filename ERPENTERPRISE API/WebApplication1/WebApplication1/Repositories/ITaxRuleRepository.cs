using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface ITaxRuleRepository
    {
        Task<IEnumerable<TaxRule>> GetAllAsync();
        Task<TaxRule?> GetByIdAsync(int id);
        Task<TaxRule> CreateAsync(TaxRule rule);
        Task UpdateAsync(TaxRule rule);
        Task DeleteAsync(int id);
    }
}
