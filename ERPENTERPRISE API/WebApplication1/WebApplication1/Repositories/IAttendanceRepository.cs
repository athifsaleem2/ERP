using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IAttendanceRepository
    {
        Task<IEnumerable<Attendance>> GetAllAsync();
        Task<IEnumerable<Attendance>> GetByDateAsync(DateTime date);
        Task<IEnumerable<Attendance>> GetByEmployeeAsync(int employeeId);
        Task<Attendance> CreateAsync(Attendance attendance);
        Task UpdateAsync(Attendance attendance);
        Task DeleteAsync(int id);
    }
}
