using WebApplication1.Repositories;
using WebApplication1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _repository;

        public CustomerService(ICustomerRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Customer>> GetCustomersAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Customer?> GetCustomerByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Customer> CreateCustomerAsync(Customer customer)
        {
            return await _repository.AddAsync(customer);
        }

        public async Task UpdateCustomerAsync(Customer customer)
        {
            await _repository.UpdateAsync(customer);
        }

        public async Task DeleteCustomerAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<bool> CustomerExistsAsync(string phone)
        {
            return await _repository.CustomerExistsAsync(phone);
        }
    }
}
