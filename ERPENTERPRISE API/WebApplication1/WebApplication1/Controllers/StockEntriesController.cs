using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockEntriesController : ControllerBase
    {
        private readonly IStockEntryService _stockEntryService;

        public StockEntriesController(IStockEntryService stockEntryService)
        {
            _stockEntryService = stockEntryService;
        }

        // GET: api/StockEntries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockEntry>>> GetAll()
        {
            var entries = await _stockEntryService.GetAllEntriesAsync();
            return Ok(entries);
        }

        // GET: api/StockEntries/stock-in  (Stock In entries)
        [HttpGet("stock-in")]
        public async Task<ActionResult<IEnumerable<StockEntry>>> GetStockIn()
        {
            var entries = await _stockEntryService.GetStockInAsync();
            return Ok(entries);
        }

        // GET: api/StockEntries/stock-out  (Stock Out entries)
        [HttpGet("stock-out")]
        public async Task<ActionResult<IEnumerable<StockEntry>>> GetStockOut()
        {
            var entries = await _stockEntryService.GetStockOutAsync();
            return Ok(entries);
        }

        // GET: api/StockEntries/stock-transfer  (Transfer entries)
        [HttpGet("stock-transfer")]
        public async Task<ActionResult<IEnumerable<StockEntry>>> GetStockTransfers()
        {
            var entries = await _stockEntryService.GetStockTransfersAsync();
            return Ok(entries);
        }

        // GET: api/StockEntries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StockEntry>> GetById(int id)
        {
            var entry = await _stockEntryService.GetEntryByIdAsync(id);
            if (entry == null)
                return NotFound();
            return Ok(entry);
        }

        // POST: api/StockEntries
        [HttpPost]
        public async Task<ActionResult<StockEntry>> Create(StockEntry entry)
        {
            var created = await _stockEntryService.CreateEntryAsync(entry);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // DELETE: api/StockEntries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _stockEntryService.DeleteEntryAsync(id);
            return NoContent();
        }
    }
}
