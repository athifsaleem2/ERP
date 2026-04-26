using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanySettingsController : ControllerBase
    {
        private readonly ICompanySettingService _service;
        public CompanySettingsController(ICompanySettingService service) { _service = service; }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var setting = await _service.GetSettingAsync();
            return setting == null ? Ok(new CompanySetting()) : Ok(setting);
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] CompanySetting setting)
        {
            var saved = await _service.SaveSettingAsync(setting);
            return Ok(saved);
        }
    }
}
