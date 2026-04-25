using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Repositories;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Services
{
    public class AttendanceService : IAttendanceService
    {
        private readonly IAttendanceRepository _repo;
        private readonly AppDbContext _context;

        public AttendanceService(IAttendanceRepository repo, AppDbContext context)
        {
            _repo = repo;
            _context = context;
        }

        public async Task<IEnumerable<Attendance>> GetAllAttendanceAsync() => await _repo.GetAllAsync();
        public async Task<IEnumerable<Attendance>> GetAttendanceByDateAsync(DateTime date) => await _repo.GetByDateAsync(date);
        public async Task<IEnumerable<Attendance>> GetAttendanceByEmployeeAsync(int employeeId) => await _repo.GetByEmployeeAsync(employeeId);
        public async Task<Attendance> CreateAttendanceAsync(Attendance attendance) => await _repo.CreateAsync(attendance);
        public async Task UpdateAttendanceAsync(Attendance attendance) => await _repo.UpdateAsync(attendance);
        public async Task DeleteAttendanceAsync(int id) => await _repo.DeleteAsync(id);

        public async Task<IEnumerable<Attendance>> BulkCreateAsync(IEnumerable<Attendance> records)
        {
            var list = records.ToList();
            _context.Attendances.AddRange(list);
            await _context.SaveChangesAsync();
            return list;
        }
    }
}
