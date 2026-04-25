using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IPayrollService
    {
        Task<IEnumerable<PayrollRecord>> GetAllPayrollAsync();
        Task<IEnumerable<PayrollRecord>> GetPayrollByMonthYearAsync(int month, int year);
        Task<PayrollRecord?> GetPayrollByIdAsync(int id);
        Task<PayrollRecord> GeneratePayrollAsync(PayrollRecord record);
        Task MarkAsPaidAsync(int id);
        Task DeletePayrollAsync(int id);
    }
}
