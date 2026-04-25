using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PurchaseReturnController : ControllerBase
    {
        private readonly IPurchaseReturnService _returnService;

        public PurchaseReturnController(IPurchaseReturnService returnService)
        {
            _returnService = returnService;
        }

        [HttpGet]
        public async Task<IActionResult> GetReturns()
        {
            var returns = await _returnService.GetReturnsAsync();
            return Ok(returns);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReturn(int id)
        {
            var purchaseReturn = await _returnService.GetReturnByIdAsync(id);
            if (purchaseReturn == null)
            {
                return NotFound();
            }
            return Ok(purchaseReturn);
        }

        [HttpPost]
        public async Task<IActionResult> CreateReturn([FromBody] PurchaseReturn purchaseReturn)
        {
            if (await _returnService.ReturnExistsAsync(purchaseReturn.ReturnNumber))
            {
                return BadRequest(new { message = "Return number already exists" });
            }

            var createdReturn = await _returnService.CreateReturnAsync(purchaseReturn);
            return CreatedAtAction(nameof(GetReturn), new { id = createdReturn.Id }, createdReturn);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReturn(int id)
        {
            await _returnService.DeleteReturnAsync(id);
            return NoContent();
        }
    }
}
