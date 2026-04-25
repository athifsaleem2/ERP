using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("Expenses")]
    public class Expense
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string ExpenseNumber { get; set; } = string.Empty;

        [Required]
        public DateTime ExpenseDate { get; set; } = DateTime.Now;

        [Required]
        [StringLength(100)]
        public string Category { get; set; } = string.Empty;

        [StringLength(250)]
        public string? Description { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        [StringLength(50)]
        public string PaymentMode { get; set; } = "Cash";

        public int? AccountId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }
    }
}
