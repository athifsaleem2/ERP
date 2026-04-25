using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _service;
        public EmployeesController(IEmployeeService service) { _service = service; }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetEmployeesAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var emp = await _service.GetEmployeeByIdAsync(id);
            return emp == null ? NotFound() : Ok(emp);
        }

        [HttpGet("generate-code")]
        public async Task<IActionResult> GenerateCode()
        {
            var code = await _service.GenerateEmpCodeAsync();
            return Ok(new { empCode = code });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Employee employee)
        {
            if (await _service.EmpCodeExistsAsync(employee.EmpCode))
                return BadRequest(new { message = "Employee code already exists" });
            var created = await _service.CreateEmployeeAsync(employee);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Employee employee)
        {
            if (id != employee.Id) return BadRequest();
            await _service.UpdateEmployeeAsync(employee);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteEmployeeAsync(id);
            return NoContent();
        }
    }
}
