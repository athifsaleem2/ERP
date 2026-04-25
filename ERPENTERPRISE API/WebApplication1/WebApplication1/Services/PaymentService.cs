using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _repository;

        public PaymentService(IPaymentRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Payment>> GetPaymentsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Payment?> GetPaymentByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Payment> CreatePaymentAsync(Payment payment)
        {
            return await _repository.AddAsync(payment);
        }

        public async Task DeletePaymentAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<bool> PaymentExistsAsync(string paymentNumber)
        {
            return await _repository.ExistsAsync(paymentNumber);
        }
    }
}
