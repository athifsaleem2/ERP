using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesReturnController : ControllerBase
    {
        private readonly ISalesReturnService _returnService;

        public SalesReturnController(ISalesReturnService returnService)
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
            var salesReturn = await _returnService.GetReturnByIdAsync(id);
            if (salesReturn == null)
            {
                return NotFound();
            }
            return Ok(salesReturn);
        }

        [HttpPost]
        public async Task<IActionResult> CreateReturn([FromBody] SalesReturn salesReturn)
        {
            if (await _returnService.ReturnExistsAsync(salesReturn.ReturnNumber))
            {
                return BadRequest(new { message = "Return number already exists" });
            }

            var createdReturn = await _returnService.CreateReturnAsync(salesReturn);
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
