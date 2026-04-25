using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PayrollController : ControllerBase
    {
        private readonly IPayrollService _service;
        public PayrollController(IPayrollService service) { _service = service; }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllPayrollAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var rec = await _service.GetPayrollByIdAsync(id);
            return rec == null ? NotFound() : Ok(rec);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetByMonthYear([FromQuery] int month, [FromQuery] int year) =>
            Ok(await _service.GetPayrollByMonthYearAsync(month, year));

        [HttpPost]
        public async Task<IActionResult> Generate([FromBody] PayrollRecord record)
        {
            var created = await _service.GeneratePayrollAsync(record);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPatch("{id}/mark-paid")]
        public async Task<IActionResult> MarkPaid(int id)
        {
            await _service.MarkAsPaidAsync(id);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeletePayrollAsync(id);
            return NoContent();
        }
    }
}
