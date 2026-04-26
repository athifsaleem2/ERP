using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("TaxRules")]
    public class TaxRule
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string RuleName { get; set; } = string.Empty;

        [StringLength(50)]
        public string? TaxType { get; set; } = "Percentage"; // Percentage | Fixed

        public decimal TaxPercentage { get; set; } = 0;

        public decimal? MinSalary { get; set; }

        public decimal? MaxSalary { get; set; }

        [StringLength(50)]
        public string? AppliesTo { get; set; } = "All"; // All | Sales | Purchase | Payroll

        [StringLength(20)]
        public string Status { get; set; } = "Active";

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
