using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IPaymentService
    {
        Task<IEnumerable<Payment>> GetPaymentsAsync();
        Task<Payment?> GetPaymentByIdAsync(int id);
        Task<Payment> CreatePaymentAsync(Payment payment);
        Task DeletePaymentAsync(int id);
        Task<bool> PaymentExistsAsync(string paymentNumber);
    }
}
