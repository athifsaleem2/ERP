using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public interface ITaxRuleService
    {
        Task<IEnumerable<TaxRule>> GetTaxRulesAsync();
        Task<TaxRule?> GetTaxRuleByIdAsync(int id);
        Task<TaxRule> CreateTaxRuleAsync(TaxRule rule);
        Task UpdateTaxRuleAsync(TaxRule rule);
        Task DeleteTaxRuleAsync(int id);
    }

    public class TaxRuleService : ITaxRuleService
    {
        private readonly ITaxRuleRepository _repo;
        public TaxRuleService(ITaxRuleRepository repo) { _repo = repo; }

        public async Task<IEnumerable<TaxRule>> GetTaxRulesAsync() => await _repo.GetAllAsync();
        public async Task<TaxRule?> GetTaxRuleByIdAsync(int id) => await _repo.GetByIdAsync(id);
        public async Task<TaxRule> CreateTaxRuleAsync(TaxRule rule) => await _repo.CreateAsync(rule);
        public async Task UpdateTaxRuleAsync(TaxRule rule) => await _repo.UpdateAsync(rule);
        public async Task DeleteTaxRuleAsync(int id) => await _repo.DeleteAsync(id);
    }
}
