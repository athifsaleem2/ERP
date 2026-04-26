using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class CompanySettingRepository : ICompanySettingRepository
    {
        private readonly AppDbContext _ctx;
        public CompanySettingRepository(AppDbContext ctx) { _ctx = ctx; }

        public async Task<CompanySetting?> GetAsync() => await _ctx.CompanySettings.FirstOrDefaultAsync();

        public async Task<CompanySetting> UpsertAsync(CompanySetting setting)
        {
            var existing = await _ctx.CompanySettings.FirstOrDefaultAsync();
            if (existing == null)
            {
                setting.UpdatedAt = DateTime.Now;
                _ctx.CompanySettings.Add(setting);
            }
            else
            {
                existing.CompanyName    = setting.CompanyName;
                existing.Address        = setting.Address;
                existing.Phone          = setting.Phone;
                existing.Email          = setting.Email;
                existing.Website        = setting.Website;
                existing.TaxNumber      = setting.TaxNumber;
                existing.Currency       = setting.Currency;
                existing.CurrencySymbol = setting.CurrencySymbol;
                existing.DateFormat     = setting.DateFormat;
                existing.LogoUrl        = setting.LogoUrl;
                existing.UpdatedAt      = DateTime.Now;
                _ctx.CompanySettings.Update(existing);
            }
            await _ctx.SaveChangesAsync();
            return setting;
        }
    }
}
