using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly AppDbContext _ctx;
        public RoleRepository(AppDbContext ctx) { _ctx = ctx; }

        public async Task<IEnumerable<Role>> GetAllAsync() => await _ctx.Roles.ToListAsync();
        public async Task<Role?> GetByIdAsync(int id) => await _ctx.Roles.FindAsync(id);

        public async Task<Role> CreateAsync(Role role)
        {
            role.CreatedAt = DateTime.Now;
            _ctx.Roles.Add(role);
            await _ctx.SaveChangesAsync();
            return role;
        }

        public async Task UpdateAsync(Role role) { _ctx.Roles.Update(role); await _ctx.SaveChangesAsync(); }

        public async Task DeleteAsync(int id)
        {
            var r = await _ctx.Roles.FindAsync(id);
            if (r != null) { _ctx.Roles.Remove(r); await _ctx.SaveChangesAsync(); }
        }
    }
}
