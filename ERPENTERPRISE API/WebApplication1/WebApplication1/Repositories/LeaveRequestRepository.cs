using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class LeaveRequestRepository : ILeaveRequestRepository
    {
        private readonly AppDbContext _context;
        public LeaveRequestRepository(AppDbContext context) { _context = context; }

        public async Task<IEnumerable<LeaveRequest>> GetAllAsync() =>
            await _context.LeaveRequests
                .Include(l => l.Employee)
                .OrderByDescending(l => l.CreatedAt).ToListAsync();

        public async Task<IEnumerable<LeaveRequest>> GetByStatusAsync(string status) =>
            await _context.LeaveRequests
                .Include(l => l.Employee)
                .Where(l => l.Status == status).ToListAsync();

        public async Task<IEnumerable<LeaveRequest>> GetByEmployeeAsync(int employeeId) =>
            await _context.LeaveRequests
                .Include(l => l.Employee)
                .Where(l => l.EmployeeId == employeeId)
                .OrderByDescending(l => l.CreatedAt).ToListAsync();

        public async Task<LeaveRequest?> GetByIdAsync(int id) =>
            await _context.LeaveRequests.Include(l => l.Employee).FirstOrDefaultAsync(l => l.Id == id);

        public async Task<LeaveRequest> CreateAsync(LeaveRequest request)
        {
            request.TotalDays = (int)(request.ToDate - request.FromDate).TotalDays + 1;
            _context.LeaveRequests.Add(request);
            await _context.SaveChangesAsync();
            return request;
        }

        public async Task UpdateAsync(LeaveRequest request)
        {
            _context.Entry(request).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var req = await _context.LeaveRequests.FindAsync(id);
            if (req != null) { _context.LeaveRequests.Remove(req); await _context.SaveChangesAsync(); }
        }
    }
}
