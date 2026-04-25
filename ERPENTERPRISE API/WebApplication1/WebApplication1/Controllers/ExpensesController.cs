using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseService _service;

        public ExpensesController(IExpenseService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var expenses = await _service.GetExpensesAsync();
            return Ok(expenses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var expense = await _service.GetExpenseByIdAsync(id);
            if (expense == null) return NotFound();
            return Ok(expense);
        }

        [HttpGet("total")]
        public async Task<IActionResult> GetTotal()
        {
            var total = await _service.GetTotalExpensesAsync();
            return Ok(new { total });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Expense expense)
        {
            if (await _service.ExpenseExistsAsync(expense.ExpenseNumber))
                return BadRequest(new { message = "Expense number already exists" });

            var created = await _service.CreateExpenseAsync(expense);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Expense expense)
        {
            if (id != expense.Id) return BadRequest();
            await _service.UpdateExpenseAsync(expense);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteExpenseAsync(id);
            return NoContent();
        }
    }
}
