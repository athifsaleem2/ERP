using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class LoanRepository : ILoanRepository
    {
        private readonly AppDbContext _context;

        public LoanRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Loan>> GetAllLoansAsync()
        {
            return await _context.Loans.Include(l => l.Emis).OrderByDescending(l => l.CreatedAt).ToListAsync();
        }

        public async Task<Loan?> GetLoanByIdAsync(int id)
        {
            return await _context.Loans.Include(l => l.Emis).FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task<Loan> AddLoanAsync(Loan loan)
        {
            _context.Loans.Add(loan);
            await _context.SaveChangesAsync();
            return loan;
        }

        public async Task UpdateLoanAsync(Loan loan)
        {
            _context.Entry(loan).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteLoanAsync(int id)
        {
            var loan = await _context.Loans.FindAsync(id);
            if (loan != null)
            {
                _context.Loans.Remove(loan);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<LoanEmi>> GetEmisByLoanIdAsync(int loanId)
        {
            return await _context.LoanEmis.Where(e => e.LoanId == loanId).OrderBy(e => e.DueDate).ToListAsync();
        }

        public async Task<LoanEmi?> GetEmiByIdAsync(int id)
        {
            return await _context.LoanEmis.FindAsync(id);
        }

        public async Task<LoanEmi> AddEmiAsync(LoanEmi emi)
        {
            _context.LoanEmis.Add(emi);
            await _context.SaveChangesAsync();
            return emi;
        }

        public async Task UpdateEmiAsync(LoanEmi emi)
        {
            _context.Entry(emi).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
