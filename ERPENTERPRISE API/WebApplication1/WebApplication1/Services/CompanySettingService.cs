using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public interface ICompanySettingService
    {
        Task<CompanySetting?> GetSettingAsync();
        Task<CompanySetting> SaveSettingAsync(CompanySetting setting);
    }

    public class CompanySettingService : ICompanySettingService
    {
        private readonly ICompanySettingRepository _repo;
        public CompanySettingService(ICompanySettingRepository repo) { _repo = repo; }

        public async Task<CompanySetting?> GetSettingAsync() => await _repo.GetAsync();
        public async Task<CompanySetting> SaveSettingAsync(CompanySetting setting) => await _repo.UpsertAsync(setting);
    }
}
