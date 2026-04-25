using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface ILoanService
    {
        Task<IEnumerable<Loan>> GetAllLoansAsync();
        Task<Loan?> GetLoanByIdAsync(int id);
        Task<Loan> ApplyForLoanAsync(Loan loan);
        Task<Loan?> ApproveLoanAsync(int id);
        Task<Loan?> RejectLoanAsync(int id);

        Task<IEnumerable<LoanEmi>> GetEmisByLoanIdAsync(int loanId);
        Task<LoanEmi?> PayEmiAsync(int emiId);
        Task<LoanEmi?> AddPenaltyAsync(int emiId, decimal penaltyAmount);
    }
}
