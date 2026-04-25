using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BankTransactionsController : ControllerBase
    {
        private readonly IBankTransactionService _service;

        public BankTransactionsController(IBankTransactionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var txns = await _service.GetTransactionsAsync();
            return Ok(txns);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var txn = await _service.GetTransactionByIdAsync(id);
            if (txn == null) return NotFound();
            return Ok(txn);
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var deposits = await _service.GetTotalDepositsAsync();
            var withdrawals = await _service.GetTotalWithdrawalsAsync();
            return Ok(new { deposits, withdrawals, netBalance = deposits - withdrawals });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BankTransaction transaction)
        {
            var created = await _service.CreateTransactionAsync(transaction);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] BankTransaction transaction)
        {
            if (id != transaction.Id) return BadRequest();
            await _service.UpdateTransactionAsync(transaction);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteTransactionAsync(id);
            return NoContent();
        }
    }
}
