using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IPayrollRepository
    {
        Task<IEnumerable<PayrollRecord>> GetAllAsync();
        Task<IEnumerable<PayrollRecord>> GetByMonthYearAsync(int month, int year);
        Task<IEnumerable<PayrollRecord>> GetByEmployeeAsync(int employeeId);
        Task<PayrollRecord?> GetByIdAsync(int id);
        Task<PayrollRecord> CreateAsync(PayrollRecord record);
        Task UpdateAsync(PayrollRecord record);
        Task DeleteAsync(int id);
    }
}
