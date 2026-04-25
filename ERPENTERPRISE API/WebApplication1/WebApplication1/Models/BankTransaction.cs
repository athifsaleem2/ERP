using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("BankTransactions")]
    public class BankTransaction
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime TransactionDate { get; set; } = DateTime.Now;

        [Required]
        [StringLength(100)]
        public string BankName { get; set; } = string.Empty;

        [StringLength(50)]
        public string? AccountNo { get; set; }

        [Required]
        [StringLength(50)]
        public string TransactionType { get; set; } = "Deposit"; // Deposit, Withdrawal, Transfer

        [Required]
        public decimal Amount { get; set; }

        [StringLength(100)]
        public string? ReferenceNo { get; set; }

        [StringLength(250)]
        public string? Narration { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }
    }
}
