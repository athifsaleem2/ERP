using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface ICompanySettingRepository
    {
        Task<CompanySetting?> GetAsync();
        Task<CompanySetting> UpsertAsync(CompanySetting setting);
    }
}
