using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class TaxRuleRepository : ITaxRuleRepository
    {
        private readonly AppDbContext _ctx;
        public TaxRuleRepository(AppDbContext ctx) { _ctx = ctx; }

        public async Task<IEnumerable<TaxRule>> GetAllAsync() => await _ctx.TaxRules.ToListAsync();
        public async Task<TaxRule?> GetByIdAsync(int id) => await _ctx.TaxRules.FindAsync(id);

        public async Task<TaxRule> CreateAsync(TaxRule rule)
        {
            rule.CreatedAt = DateTime.Now;
            _ctx.TaxRules.Add(rule);
            await _ctx.SaveChangesAsync();
            return rule;
        }

        public async Task UpdateAsync(TaxRule rule) { _ctx.TaxRules.Update(rule); await _ctx.SaveChangesAsync(); }

        public async Task DeleteAsync(int id)
        {
            var r = await _ctx.TaxRules.FindAsync(id);
            if (r != null) { _ctx.TaxRules.Remove(r); await _ctx.SaveChangesAsync(); }
        }
    }
}
