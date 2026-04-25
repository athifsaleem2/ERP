using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IExpenseService
    {
        Task<IEnumerable<Expense>> GetExpensesAsync();
        Task<Expense?> GetExpenseByIdAsync(int id);
        Task<Expense> CreateExpenseAsync(Expense expense);
        Task UpdateExpenseAsync(Expense expense);
        Task DeleteExpenseAsync(int id);
        Task<bool> ExpenseExistsAsync(string expenseNumber);
        Task<decimal> GetTotalExpensesAsync();
    }
}
