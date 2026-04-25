using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class SalesReturnService : ISalesReturnService
    {
        private readonly ISalesReturnRepository _repository;

        public SalesReturnService(ISalesReturnRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<SalesReturn>> GetReturnsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<SalesReturn?> GetReturnByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<SalesReturn> CreateReturnAsync(SalesReturn salesReturn)
        {
            // Here you could add logic to update stock levels if necessary
            return await _repository.AddAsync(salesReturn);
        }

        public async Task UpdateReturnAsync(SalesReturn salesReturn)
        {
            await _repository.UpdateAsync(salesReturn);
        }

        public async Task DeleteReturnAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<bool> ReturnExistsAsync(string returnNumber)
        {
            return await _repository.ExistsAsync(returnNumber);
        }
    }
}
