using WebApplication1.Repositories;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
    public class StockService : IStockService
    {
        private readonly IProductRepository _productRepository;

        public StockService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task UpdateStockAsync(int productId, int quantityChange)
        {
            var product = await _productRepository.GetByIdAsync(productId);
            if (product != null)
            {
                product.StockQuantity += quantityChange;
                await _productRepository.UpdateAsync(product);
            }
        }
    }
}
