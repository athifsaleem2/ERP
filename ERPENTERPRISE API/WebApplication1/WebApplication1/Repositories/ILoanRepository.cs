using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface ILoanRepository
    {
        Task<IEnumerable<Loan>> GetAllLoansAsync();
        Task<Loan?> GetLoanByIdAsync(int id);
        Task<Loan> AddLoanAsync(Loan loan);
        Task UpdateLoanAsync(Loan loan);
        Task DeleteLoanAsync(int id);

        Task<IEnumerable<LoanEmi>> GetEmisByLoanIdAsync(int loanId);
        Task<LoanEmi?> GetEmiByIdAsync(int id);
        Task<LoanEmi> AddEmiAsync(LoanEmi emi);
        Task UpdateEmiAsync(LoanEmi emi);
    }
}
