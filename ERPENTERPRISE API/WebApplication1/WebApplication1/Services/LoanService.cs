using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class LoanService : ILoanService
    {
        private readonly ILoanRepository _repository;

        public LoanService(ILoanRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Loan>> GetAllLoansAsync()
        {
            return await _repository.GetAllLoansAsync();
        }

        public async Task<Loan?> GetLoanByIdAsync(int id)
        {
            return await _repository.GetLoanByIdAsync(id);
        }

        public async Task<Loan> ApplyForLoanAsync(Loan loan)
        {
            loan.Status = "Pending";
            loan.CreatedAt = DateTime.UtcNow;
            return await _repository.AddLoanAsync(loan);
        }

        public async Task<Loan?> ApproveLoanAsync(int id)
        {
            var loan = await _repository.GetLoanByIdAsync(id);
            if (loan == null || loan.Status != "Pending") return null;

            loan.Status = "Approved";
            loan.ApprovedAt = DateTime.UtcNow;
            await _repository.UpdateLoanAsync(loan);

            // Generate EMI Schedule using Simple Amortization
            decimal p = loan.PrincipalAmount;
            decimal r = loan.InterestRate / 100M / 12M; // monthly rate
            int n = loan.TenureMonths;
            decimal emi = 0;

            if (r > 0) 
            {
                emi = p * r * (decimal)Math.Pow((double)(1 + r), n) / (decimal)(Math.Pow((double)(1 + r), n) - 1);
            }
            else 
            {
                emi = p / n;
            }

            decimal balance = p;
            for (int i = 1; i <= n; i++)
            {
                decimal interest = balance * r;
                decimal principal = emi - interest;
                balance -= principal;

                var loanEmi = new LoanEmi
                {
                    LoanId = loan.Id,
                    DueDate = loan.ApprovedAt.Value.AddMonths(i),
                    PrincipalComponent = Math.Round(principal, 2),
                    InterestComponent = Math.Round(interest, 2),
                    TotalEmi = Math.Round(emi, 2),
                    Status = "Pending",
                    PenaltyAmount = 0
                };
                await _repository.AddEmiAsync(loanEmi);
            }

            return loan;
        }

        public async Task<Loan?> RejectLoanAsync(int id)
        {
            var loan = await _repository.GetLoanByIdAsync(id);
            if (loan == null || loan.Status != "Pending") return null;

            loan.Status = "Rejected";
            await _repository.UpdateLoanAsync(loan);
            return loan;
        }

        public async Task<IEnumerable<LoanEmi>> GetEmisByLoanIdAsync(int loanId)
        {
            return await _repository.GetEmisByLoanIdAsync(loanId);
        }

        public async Task<LoanEmi?> PayEmiAsync(int emiId)
        {
            var emi = await _repository.GetEmiByIdAsync(emiId);
            if (emi == null || emi.Status == "Paid") return null;

            emi.Status = "Paid";
            emi.PaidDate = DateTime.UtcNow;
            await _repository.UpdateEmiAsync(emi);
            return emi;
        }

        public async Task<LoanEmi?> AddPenaltyAsync(int emiId, decimal penaltyAmount)
        {
            var emi = await _repository.GetEmiByIdAsync(emiId);
            if (emi == null || emi.Status == "Paid") return null;

            emi.PenaltyAmount += penaltyAmount;
            await _repository.UpdateEmiAsync(emi);
            return emi;
        }
    }
}
