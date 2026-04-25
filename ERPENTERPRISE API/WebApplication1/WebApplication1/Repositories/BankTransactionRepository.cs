using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class BankTransactionRepository : IBankTransactionRepository
    {
        private readonly AppDbContext _context;

        public BankTransactionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BankTransaction>> GetAllAsync()
        {
            return await _context.BankTransactions.OrderByDescending(t => t.TransactionDate).ToListAsync();
        }

        public async Task<BankTransaction?> GetByIdAsync(int id)
        {
            return await _context.BankTransactions.FindAsync(id);
        }

        public async Task<BankTransaction> CreateAsync(BankTransaction transaction)
        {
            _context.BankTransactions.Add(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }

        public async Task UpdateAsync(BankTransaction transaction)
        {
            _context.Entry(transaction).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var transaction = await _context.BankTransactions.FindAsync(id);
            if (transaction != null)
            {
                _context.BankTransactions.Remove(transaction);
                await _context.SaveChangesAsync();
            }
        }
    }
}
