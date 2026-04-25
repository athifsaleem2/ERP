using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _repo;

        public ExpenseService(IExpenseRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Expense>> GetExpensesAsync() =>
            await _repo.GetAllAsync();

        public async Task<Expense?> GetExpenseByIdAsync(int id) =>
            await _repo.GetByIdAsync(id);

        public async Task<Expense> CreateExpenseAsync(Expense expense) =>
            await _repo.CreateAsync(expense);

        public async Task UpdateExpenseAsync(Expense expense) =>
            await _repo.UpdateAsync(expense);

        public async Task DeleteExpenseAsync(int id) =>
            await _repo.DeleteAsync(id);

        public async Task<bool> ExpenseExistsAsync(string expenseNumber) =>
            await _repo.ExistsAsync(expenseNumber);

        public async Task<decimal> GetTotalExpensesAsync()
        {
            var expenses = await _repo.GetAllAsync();
            return expenses.Sum(e => e.Amount);
        }
    }
}
