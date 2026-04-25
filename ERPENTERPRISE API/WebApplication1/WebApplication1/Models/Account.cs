using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("Accounts")]
    public class Account
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string AccountName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string AccountType { get; set; } = "Asset"; // Asset, Liability, Income, Expense

        public decimal OpeningBalance { get; set; } = 0;

        public decimal CurrentBalance { get; set; } = 0;

        [StringLength(250)]
        public string? Notes { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }
    }
}
