using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface ISalesReturnService
    {
        Task<IEnumerable<SalesReturn>> GetReturnsAsync();
        Task<SalesReturn?> GetReturnByIdAsync(int id);
        Task<SalesReturn> CreateReturnAsync(SalesReturn salesReturn);
        Task UpdateReturnAsync(SalesReturn salesReturn);
        Task DeleteReturnAsync(int id);
        Task<bool> ReturnExistsAsync(string returnNumber);
    }
}
