using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class PurchaseReturnService : IPurchaseReturnService
    {
        private readonly IPurchaseReturnRepository _repository;

        public PurchaseReturnService(IPurchaseReturnRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<PurchaseReturn>> GetReturnsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<PurchaseReturn?> GetReturnByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<PurchaseReturn> CreateReturnAsync(PurchaseReturn purchaseReturn)
        {
            return await _repository.AddAsync(purchaseReturn);
        }

        public async Task UpdateReturnAsync(PurchaseReturn purchaseReturn)
        {
            await _repository.UpdateAsync(purchaseReturn);
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
