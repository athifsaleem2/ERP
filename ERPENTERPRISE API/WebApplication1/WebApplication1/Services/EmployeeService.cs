using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repo;
        public EmployeeService(IEmployeeRepository repo) { _repo = repo; }

        public async Task<IEnumerable<Employee>> GetEmployeesAsync() => await _repo.GetAllAsync();
        public async Task<Employee?> GetEmployeeByIdAsync(int id) => await _repo.GetByIdAsync(id);
        public async Task UpdateEmployeeAsync(Employee employee) => await _repo.UpdateAsync(employee);
        public async Task DeleteEmployeeAsync(int id) => await _repo.DeleteAsync(id);
        public async Task<bool> EmpCodeExistsAsync(string empCode) => await _repo.EmpCodeExistsAsync(empCode);

        public async Task<string> GenerateEmpCodeAsync()
        {
            var employees = await _repo.GetAllAsync();
            int next = employees.Any() ? employees.Count() + 1 : 1;
            return $"EMP-{next:D4}";
        }

        public async Task<Employee> CreateEmployeeAsync(Employee employee) =>
            await _repo.CreateAsync(employee);
    }
}
