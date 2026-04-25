using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IPaymentRepository
    {
        Task<IEnumerable<Payment>> GetAllAsync();
        Task<Payment?> GetByIdAsync(int id);
        Task<Payment> AddAsync(Payment payment);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(string paymentNumber);
    }
}
