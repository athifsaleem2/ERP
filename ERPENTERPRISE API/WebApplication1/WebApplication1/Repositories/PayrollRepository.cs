using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class PayrollRepository : IPayrollRepository
    {
        private readonly AppDbContext _context;
        public PayrollRepository(AppDbContext context) { _context = context; }

        public async Task<IEnumerable<PayrollRecord>> GetAllAsync() =>
            await _context.PayrollRecords
                .Include(p => p.Employee)
                .OrderByDescending(p => p.Year).ThenByDescending(p => p.Month).ToListAsync();

        public async Task<IEnumerable<PayrollRecord>> GetByMonthYearAsync(int month, int year) =>
            await _context.PayrollRecords
                .Include(p => p.Employee)
                .Where(p => p.Month == month && p.Year == year).ToListAsync();

        public async Task<IEnumerable<PayrollRecord>> GetByEmployeeAsync(int employeeId) =>
            await _context.PayrollRecords
                .Include(p => p.Employee)
                .Where(p => p.EmployeeId == employeeId)
                .OrderByDescending(p => p.Year).ThenByDescending(p => p.Month).ToListAsync();

        public async Task<PayrollRecord?> GetByIdAsync(int id) =>
            await _context.PayrollRecords.Include(p => p.Employee).FirstOrDefaultAsync(p => p.Id == id);

        public async Task<PayrollRecord> CreateAsync(PayrollRecord record)
        {
            _context.PayrollRecords.Add(record);
            await _context.SaveChangesAsync();
            return record;
        }

        public async Task UpdateAsync(PayrollRecord record)
        {
            _context.Entry(record).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var rec = await _context.PayrollRecords.FindAsync(id);
            if (rec != null) { _context.PayrollRecords.Remove(rec); await _context.SaveChangesAsync(); }
        }
    }
}
