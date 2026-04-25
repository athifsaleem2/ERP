using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _context;
        public EmployeeRepository(AppDbContext context) { _context = context; }

        public async Task<IEnumerable<Employee>> GetAllAsync() =>
            await _context.Employees.OrderBy(e => e.Department).ThenBy(e => e.Name).ToListAsync();

        public async Task<Employee?> GetByIdAsync(int id) =>
            await _context.Employees.FindAsync(id);

        public async Task<Employee?> GetByEmpCodeAsync(string empCode) =>
            await _context.Employees.FirstOrDefaultAsync(e => e.EmpCode == empCode);

        public async Task<Employee> CreateAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task UpdateAsync(Employee employee)
        {
            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp != null) { _context.Employees.Remove(emp); await _context.SaveChangesAsync(); }
        }

        public async Task<bool> EmpCodeExistsAsync(string empCode) =>
            await _context.Employees.AnyAsync(e => e.EmpCode == empCode);
    }
}
