using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseInvoicesController : ControllerBase
    {
        private readonly IPurchaseInvoiceService _service;

        public PurchaseInvoicesController(IPurchaseInvoiceService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PurchaseInvoice>>> GetInvoices()
        {
            var invoices = await _service.GetAllInvoicesAsync();
            return Ok(invoices);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PurchaseInvoice>> GetInvoice(int id)
        {
            var invoice = await _service.GetInvoiceByIdAsync(id);
            if (invoice == null) return NotFound();
            return Ok(invoice);
        }

        [HttpPost]
        public async Task<ActionResult<PurchaseInvoice>> CreateInvoice(PurchaseInvoice invoice)
        {
            if (await _service.InvoiceExistsAsync(invoice.InvoiceNumber))
            {
                return BadRequest("Invoice number already exists.");
            }

            var createdInvoice = await _service.CreateInvoiceAsync(invoice);
            return CreatedAtAction(nameof(GetInvoice), new { id = createdInvoice.Id }, createdInvoice);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            await _service.DeleteInvoiceAsync(id);
            return NoContent();
        }
    }
}
