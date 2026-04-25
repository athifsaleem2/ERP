using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IPurchaseReturnService
    {
        Task<IEnumerable<PurchaseReturn>> GetReturnsAsync();
        Task<PurchaseReturn?> GetReturnByIdAsync(int id);
        Task<PurchaseReturn> CreateReturnAsync(PurchaseReturn purchaseReturn);
        Task UpdateReturnAsync(PurchaseReturn purchaseReturn);
        Task DeleteReturnAsync(int id);
        Task<bool> ReturnExistsAsync(string returnNumber);
    }
}
