using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("PayrollRecords")]
    public class PayrollRecord
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [ForeignKey("EmployeeId")]
        public Employee? Employee { get; set; }

        [Required]
        public int Month { get; set; }

        [Required]
        public int Year { get; set; }

        public decimal BasicSalary { get; set; }
        public decimal HRA { get; set; }
        public decimal DA { get; set; }
        public decimal Bonus { get; set; }
        public decimal PFDeduction { get; set; }
        public decimal TaxDeduction { get; set; }
        public decimal OtherDeductions { get; set; }
        public decimal NetSalary { get; set; }

        public DateTime GeneratedDate { get; set; } = DateTime.Now;

        [StringLength(20)]
        public string Status { get; set; } = "Generated"; // Generated, Paid

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }
    }
}
