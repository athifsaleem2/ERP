using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class LoanEmi
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int LoanId { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal PrincipalComponent { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal InterestComponent { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalEmi { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal PenaltyAmount { get; set; } = 0;

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Pending"; // Pending, Paid, Overdue

        public DateTime? PaidDate { get; set; }

        // Navigation property
        [ForeignKey("LoanId")]
        public Loan? Loan { get; set; }
    }
}
