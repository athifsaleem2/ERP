using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaveRequestsController : ControllerBase
    {
        private readonly ILeaveRequestService _service;
        public LeaveRequestsController(ILeaveRequestService service) { _service = service; }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllLeaveRequestsAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var req = await _service.GetLeaveRequestByIdAsync(id);
            return req == null ? NotFound() : Ok(req);
        }

        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetByStatus(string status) =>
            Ok(await _service.GetLeaveRequestsByStatusAsync(status));

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LeaveRequest request)
        {
            var created = await _service.CreateLeaveRequestAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPatch("{id}/approve")]
        public async Task<IActionResult> Approve(int id, [FromBody] string remarks = "")
        {
            await _service.ApproveLeaveAsync(id, remarks);
            return NoContent();
        }

        [HttpPatch("{id}/reject")]
        public async Task<IActionResult> Reject(int id, [FromBody] string remarks = "")
        {
            await _service.RejectLeaveAsync(id, remarks);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteLeaveRequestAsync(id);
            return NoContent();
        }
    }
}
