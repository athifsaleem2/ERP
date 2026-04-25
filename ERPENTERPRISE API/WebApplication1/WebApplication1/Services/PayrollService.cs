using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class PayrollService : IPayrollService
    {
        private readonly IPayrollRepository _repo;
        public PayrollService(IPayrollRepository repo) { _repo = repo; }

        public async Task<IEnumerable<PayrollRecord>> GetAllPayrollAsync() => await _repo.GetAllAsync();
        public async Task<IEnumerable<PayrollRecord>> GetPayrollByMonthYearAsync(int month, int year) => await _repo.GetByMonthYearAsync(month, year);
        public async Task<PayrollRecord?> GetPayrollByIdAsync(int id) => await _repo.GetByIdAsync(id);
        public async Task DeletePayrollAsync(int id) => await _repo.DeleteAsync(id);

        public async Task<PayrollRecord> GeneratePayrollAsync(PayrollRecord record)
        {
            // Auto-compute net salary
            record.NetSalary = record.BasicSalary + record.HRA + record.DA + record.Bonus
                              - record.PFDeduction - record.TaxDeduction - record.OtherDeductions;
            record.GeneratedDate = DateTime.Now;
            record.Status = "Generated";
            return await _repo.CreateAsync(record);
        }

        public async Task MarkAsPaidAsync(int id)
        {
            var record = await _repo.GetByIdAsync(id);
            if (record != null)
            {
                record.Status = "Paid";
                await _repo.UpdateAsync(record);
            }
        }
    }
}
