using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _ctx;
        public UserRepository(AppDbContext ctx) { _ctx = ctx; }

        public async Task<IEnumerable<User>> GetAllAsync() => await _ctx.Users.ToListAsync();
        public async Task<User?> GetByIdAsync(int id) => await _ctx.Users.FindAsync(id);
        public async Task<User?> GetByUsernameAsync(string username) =>
            await _ctx.Users.FirstOrDefaultAsync(u => u.Username == username);
        public async Task<User?> GetByEmailAsync(string email) =>
            await _ctx.Users.FirstOrDefaultAsync(u => u.Email == email);

        public async Task<User> CreateAsync(User user)
        {
            user.CreatedAt = DateTime.Now;
            _ctx.Users.Add(user);
            await _ctx.SaveChangesAsync();
            return user;
        }

        public async Task<User> AddAsync(User user) => await CreateAsync(user);

        public async Task UpdateAsync(User user)
        {
            _ctx.Users.Update(user);
            await _ctx.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var u = await _ctx.Users.FindAsync(id);
            if (u != null) { _ctx.Users.Remove(u); await _ctx.SaveChangesAsync(); }
        }
    }
}
