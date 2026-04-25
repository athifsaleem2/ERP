using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IAttendanceService
    {
        Task<IEnumerable<Attendance>> GetAllAttendanceAsync();
        Task<IEnumerable<Attendance>> GetAttendanceByDateAsync(DateTime date);
        Task<IEnumerable<Attendance>> GetAttendanceByEmployeeAsync(int employeeId);
        Task<Attendance> CreateAttendanceAsync(Attendance attendance);
        Task<IEnumerable<Attendance>> BulkCreateAsync(IEnumerable<Attendance> records);
        Task UpdateAttendanceAsync(Attendance attendance);
        Task DeleteAttendanceAsync(int id);
    }
}
