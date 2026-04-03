using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _repository;

        public SupplierService(ISupplierRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Supplier>> GetAllSuppliersAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Supplier?> GetSupplierByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Supplier> CreateSupplierAsync(Supplier supplier)
        {
            return await _repository.AddAsync(supplier);
        }

        public async Task UpdateSupplierAsync(Supplier supplier)
        {
            await _repository.UpdateAsync(supplier);
        }

        public async Task DeleteSupplierAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
