using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaxRulesController : ControllerBase
    {
        private readonly ITaxRuleService _service;
        public TaxRulesController(ITaxRuleService service) { _service = service; }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetTaxRulesAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var r = await _service.GetTaxRuleByIdAsync(id);
            return r == null ? NotFound() : Ok(r);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaxRule rule)
        {
            var created = await _service.CreateTaxRuleAsync(rule);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TaxRule rule)
        {
            if (id != rule.Id) return BadRequest();
            await _service.UpdateTaxRuleAsync(rule);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteTaxRuleAsync(id);
            return NoContent();
        }
    }
}
