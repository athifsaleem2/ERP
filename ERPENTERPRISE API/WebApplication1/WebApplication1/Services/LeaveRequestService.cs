using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class LeaveRequestService : ILeaveRequestService
    {
        private readonly ILeaveRequestRepository _repo;
        public LeaveRequestService(ILeaveRequestRepository repo) { _repo = repo; }

        public async Task<IEnumerable<LeaveRequest>> GetAllLeaveRequestsAsync() => await _repo.GetAllAsync();
        public async Task<IEnumerable<LeaveRequest>> GetLeaveRequestsByStatusAsync(string status) => await _repo.GetByStatusAsync(status);
        public async Task<LeaveRequest?> GetLeaveRequestByIdAsync(int id) => await _repo.GetByIdAsync(id);
        public async Task<LeaveRequest> CreateLeaveRequestAsync(LeaveRequest request) => await _repo.CreateAsync(request);
        public async Task DeleteLeaveRequestAsync(int id) => await _repo.DeleteAsync(id);

        public async Task ApproveLeaveAsync(int id, string remarks)
        {
            var req = await _repo.GetByIdAsync(id);
            if (req != null) { req.Status = "Approved"; req.Remarks = remarks; await _repo.UpdateAsync(req); }
        }

        public async Task RejectLeaveAsync(int id, string remarks)
        {
            var req = await _repo.GetByIdAsync(id);
            if (req != null) { req.Status = "Rejected"; req.Remarks = remarks; await _repo.UpdateAsync(req); }
        }
    }
}
