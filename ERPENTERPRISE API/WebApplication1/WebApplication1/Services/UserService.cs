using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task<User> CreateUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);
        Task<bool> UsernameExistsAsync(string username);
    }

    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        public UserService(IUserRepository repo) { _repo = repo; }

        public async Task<IEnumerable<User>> GetUsersAsync() => await _repo.GetAllAsync();
        public async Task<User?> GetUserByIdAsync(int id) => await _repo.GetByIdAsync(id);
        public async Task UpdateUserAsync(User user) => await _repo.UpdateAsync(user);
        public async Task DeleteUserAsync(int id) => await _repo.DeleteAsync(id);
        public async Task<bool> UsernameExistsAsync(string username) => await _repo.GetByUsernameAsync(username) != null;

        public async Task<User> CreateUserAsync(User user)
        {
            // Simple password stored as-is (existing app pattern)
            return await _repo.CreateAsync(user);
        }
    }
}
