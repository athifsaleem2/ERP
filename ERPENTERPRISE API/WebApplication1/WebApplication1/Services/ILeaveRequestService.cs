using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface ILeaveRequestService
    {
        Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestsAsync();
        Task<IEnumerable<LeaveRequest>> GetLeaveRequestsByStatusAsync(string status);
        Task<LeaveRequest?> GetLeaveRequestByIdAsync(int id);
        Task<LeaveRequest> CreateLeaveRequestAsync(LeaveRequest request);
        Task ApproveLeaveAsync(int id, string remarks);
        Task RejectLeaveAsync(int id, string remarks);
        Task DeleteLeaveRequestAsync(int id);
    }
}
