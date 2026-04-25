using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IBankTransactionRepository
    {
        Task<IEnumerable<BankTransaction>> GetAllAsync();
        Task<BankTransaction?> GetByIdAsync(int id);
        Task<BankTransaction> CreateAsync(BankTransaction transaction);
        Task UpdateAsync(BankTransaction transaction);
        Task DeleteAsync(int id);
    }
}
