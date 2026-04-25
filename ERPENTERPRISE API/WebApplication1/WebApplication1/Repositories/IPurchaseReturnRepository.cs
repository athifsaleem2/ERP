using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IPurchaseReturnRepository
    {
        Task<IEnumerable<PurchaseReturn>> GetAllAsync();
        Task<PurchaseReturn?> GetByIdAsync(int id);
        Task<PurchaseReturn> AddAsync(PurchaseReturn purchaseReturn);
        Task UpdateAsync(PurchaseReturn purchaseReturn);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(string returnNumber);
    }
}
