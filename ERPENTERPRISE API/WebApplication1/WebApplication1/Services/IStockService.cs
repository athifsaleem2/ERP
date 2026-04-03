using System.Threading.Tasks;

namespace WebApplication1.Services
{
    public interface IStockService
    {
        Task UpdateStockAsync(int productId, int quantityChange);
    }
}
