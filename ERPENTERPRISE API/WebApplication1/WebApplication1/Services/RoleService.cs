using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public interface IRoleService
    {
        Task<IEnumerable<Role>> GetRolesAsync();
        Task<Role?> GetRoleByIdAsync(int id);
        Task<Role> CreateRoleAsync(Role role);
        Task UpdateRoleAsync(Role role);
        Task DeleteRoleAsync(int id);
    }

    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _repo;
        public RoleService(IRoleRepository repo) { _repo = repo; }

        public async Task<IEnumerable<Role>> GetRolesAsync() => await _repo.GetAllAsync();
        public async Task<Role?> GetRoleByIdAsync(int id) => await _repo.GetByIdAsync(id);
        public async Task<Role> CreateRoleAsync(Role role) => await _repo.CreateAsync(role);
        public async Task UpdateRoleAsync(Role role) => await _repo.UpdateAsync(role);
        public async Task DeleteRoleAsync(int id) => await _repo.DeleteAsync(id);
    }
}
