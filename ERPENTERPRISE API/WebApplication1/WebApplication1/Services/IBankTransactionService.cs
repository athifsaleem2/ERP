using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IBankTransactionService
    {
        Task<IEnumerable<BankTransaction>> GetTransactionsAsync();
        Task<BankTransaction?> GetTransactionByIdAsync(int id);
        Task<BankTransaction> CreateTransactionAsync(BankTransaction transaction);
        Task UpdateTransactionAsync(BankTransaction transaction);
        Task DeleteTransactionAsync(int id);
        Task<decimal> GetTotalDepositsAsync();
        Task<decimal> GetTotalWithdrawalsAsync();
    }
}
