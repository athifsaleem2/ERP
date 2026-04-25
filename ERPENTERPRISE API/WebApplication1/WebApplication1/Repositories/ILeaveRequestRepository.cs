using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface ILeaveRequestRepository
    {
        Task<IEnumerable<LeaveRequest>> GetAllAsync();
        Task<IEnumerable<LeaveRequest>> GetByStatusAsync(string status);
        Task<IEnumerable<LeaveRequest>> GetByEmployeeAsync(int employeeId);
        Task<LeaveRequest?> GetByIdAsync(int id);
        Task<LeaveRequest> CreateAsync(LeaveRequest request);
        Task UpdateAsync(LeaveRequest request);
        Task DeleteAsync(int id);
    }
}
