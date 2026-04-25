using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuotationsController : ControllerBase
    {
        private readonly IQuotationService _quotationService;

        public QuotationsController(IQuotationService quotationService)
        {
            _quotationService = quotationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetQuotations()
        {
            var quotations = await _quotationService.GetQuotationsAsync();
            return Ok(quotations);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuotation(int id)
        {
            var quotation = await _quotationService.GetQuotationByIdAsync(id);
            if (quotation == null)
            {
                return NotFound();
            }
            return Ok(quotation);
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuotation([FromBody] Quotation quotation)
        {
            if (await _quotationService.QuotationExistsAsync(quotation.QuotationNumber))
            {
                return BadRequest(new { message = "Quotation number already exists" });
            }

            var createdQuotation = await _quotationService.CreateQuotationAsync(quotation);
            return CreatedAtAction(nameof(GetQuotation), new { id = createdQuotation.Id }, createdQuotation);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuotation(int id, [FromBody] Quotation quotation)
        {
            if (id != quotation.Id)
            {
                return BadRequest();
            }

            await _quotationService.UpdateQuotationAsync(quotation);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuotation(int id)
        {
            await _quotationService.DeleteQuotationAsync(id);
            return NoContent();
        }
    }
}
