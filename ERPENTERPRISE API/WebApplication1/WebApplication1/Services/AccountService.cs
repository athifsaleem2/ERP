using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _repo;

        public AccountService(IAccountRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Account>> GetAccountsAsync() =>
            await _repo.GetAllAsync();

        public async Task<Account?> GetAccountByIdAsync(int id) =>
            await _repo.GetByIdAsync(id);

        public async Task<Account> CreateAccountAsync(Account account) =>
            await _repo.CreateAsync(account);

        public async Task UpdateAccountAsync(Account account) =>
            await _repo.UpdateAsync(account);

        public async Task DeleteAccountAsync(int id) =>
            await _repo.DeleteAsync(id);
    }
}
