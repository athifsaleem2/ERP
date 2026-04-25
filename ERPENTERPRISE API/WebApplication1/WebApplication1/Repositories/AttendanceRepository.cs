using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class AttendanceRepository : IAttendanceRepository
    {
        private readonly AppDbContext _context;
        public AttendanceRepository(AppDbContext context) { _context = context; }

        public async Task<IEnumerable<Attendance>> GetAllAsync() =>
            await _context.Attendances
                .Include(a => a.Employee)
                .OrderByDescending(a => a.Date).ToListAsync();

        public async Task<IEnumerable<Attendance>> GetByDateAsync(DateTime date) =>
            await _context.Attendances
                .Include(a => a.Employee)
                .Where(a => a.Date.Date == date.Date).ToListAsync();

        public async Task<IEnumerable<Attendance>> GetByEmployeeAsync(int employeeId) =>
            await _context.Attendances
                .Include(a => a.Employee)
                .Where(a => a.EmployeeId == employeeId)
                .OrderByDescending(a => a.Date).ToListAsync();

        public async Task<Attendance> CreateAsync(Attendance attendance)
        {
            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();
            return attendance;
        }

        public async Task UpdateAsync(Attendance attendance)
        {
            _context.Entry(attendance).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var att = await _context.Attendances.FindAsync(id);
            if (att != null) { _context.Attendances.Remove(att); await _context.SaveChangesAsync(); }
        }
    }
}
