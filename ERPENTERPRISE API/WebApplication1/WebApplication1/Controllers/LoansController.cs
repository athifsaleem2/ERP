using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoansController : ControllerBase
    {
        private readonly ILoanService _loanService;

        public LoansController(ILoanService loanService)
        {
            _loanService = loanService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Loan>>> GetLoans()
        {
            var loans = await _loanService.GetAllLoansAsync();
            return Ok(loans);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Loan>> GetLoan(int id)
        {
            var loan = await _loanService.GetLoanByIdAsync(id);
            if (loan == null) return NotFound();
            return Ok(loan);
        }

        [HttpPost]
        public async Task<ActionResult<Loan>> ApplyForLoan(Loan loan)
        {
            var created = await _loanService.ApplyForLoanAsync(loan);
            return CreatedAtAction(nameof(GetLoan), new { id = created.Id }, created);
        }

        [HttpPut("{id}/approve")]
        public async Task<IActionResult> ApproveLoan(int id)
        {
            var approved = await _loanService.ApproveLoanAsync(id);
            if (approved == null) return BadRequest(new { message = "Loan not found or already processed." });
            return Ok(approved);
        }

        [HttpPut("{id}/reject")]
        public async Task<IActionResult> RejectLoan(int id)
        {
            var rejected = await _loanService.RejectLoanAsync(id);
            if (rejected == null) return BadRequest(new { message = "Loan not found or already processed." });
            return Ok(rejected);
        }

        [HttpGet("{id}/emis")]
        public async Task<ActionResult<IEnumerable<LoanEmi>>> GetLoanEmis(int id)
        {
            var emis = await _loanService.GetEmisByLoanIdAsync(id);
            return Ok(emis);
        }

        [HttpPut("emis/{emiId}/pay")]
        public async Task<IActionResult> PayEmi(int emiId)
        {
            var paidEmi = await _loanService.PayEmiAsync(emiId);
            if (paidEmi == null) return BadRequest(new { message = "EMI not found or already paid." });
            return Ok(paidEmi);
        }

        [HttpPut("emis/{emiId}/penalty")]
        public async Task<IActionResult> AddPenalty(int emiId, [FromBody] decimal penaltyAmount)
        {
            var penalizedEmi = await _loanService.AddPenaltyAsync(emiId, penaltyAmount);
            if (penalizedEmi == null) return BadRequest(new { message = "EMI not found or already paid." });
            return Ok(penalizedEmi);
        }
    }
}
