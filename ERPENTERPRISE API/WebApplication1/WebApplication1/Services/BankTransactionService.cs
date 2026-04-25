using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class BankTransactionService : IBankTransactionService
    {
        private readonly IBankTransactionRepository _repo;

        public BankTransactionService(IBankTransactionRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<BankTransaction>> GetTransactionsAsync() =>
            await _repo.GetAllAsync();

        public async Task<BankTransaction?> GetTransactionByIdAsync(int id) =>
            await _repo.GetByIdAsync(id);

        public async Task<BankTransaction> CreateTransactionAsync(BankTransaction transaction) =>
            await _repo.CreateAsync(transaction);

        public async Task UpdateTransactionAsync(BankTransaction transaction) =>
            await _repo.UpdateAsync(transaction);

        public async Task DeleteTransactionAsync(int id) =>
            await _repo.DeleteAsync(id);

        public async Task<decimal> GetTotalDepositsAsync()
        {
            var txns = await _repo.GetAllAsync();
            return txns.Where(t => t.TransactionType == "Deposit").Sum(t => t.Amount);
        }

        public async Task<decimal> GetTotalWithdrawalsAsync()
        {
            var txns = await _repo.GetAllAsync();
            return txns.Where(t => t.TransactionType == "Withdrawal").Sum(t => t.Amount);
        }
    }
}
