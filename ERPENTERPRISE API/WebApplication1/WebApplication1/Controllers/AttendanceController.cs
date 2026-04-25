using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceService _service;
        public AttendanceController(IAttendanceService service) { _service = service; }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAttendanceAsync());

        [HttpGet("date/{date}")]
        public async Task<IActionResult> GetByDate(DateTime date) =>
            Ok(await _service.GetAttendanceByDateAsync(date));

        [HttpGet("employee/{empId}")]
        public async Task<IActionResult> GetByEmployee(int empId) =>
            Ok(await _service.GetAttendanceByEmployeeAsync(empId));

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Attendance attendance)
        {
            var created = await _service.CreateAttendanceAsync(attendance);
            return Ok(created);
        }

        [HttpPost("bulk")]
        public async Task<IActionResult> BulkCreate([FromBody] IEnumerable<Attendance> records)
        {
            var created = await _service.BulkCreateAsync(records);
            return Ok(created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Attendance attendance)
        {
            if (id != attendance.Id) return BadRequest();
            await _service.UpdateAttendanceAsync(attendance);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAttendanceAsync(id);
            return NoContent();
        }
    }
}
