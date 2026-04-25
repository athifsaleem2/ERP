using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class StockEntry
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        [StringLength(255)]
        public string ProductName { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string Type { get; set; } = string.Empty; // 'IN', 'OUT', 'TRANSFER'

        [Required]
        public int Quantity { get; set; }

        [Required]
        public DateTime Date { get; set; } = DateTime.UtcNow;

        [StringLength(255)]
        public string? Reference { get; set; } // Supplier name, reason, etc

        [StringLength(255)]
        public string? FromLocation { get; set; }

        [StringLength(255)]
        public string? ToLocation { get; set; }

        public string? Notes { get; set; }
    }
}
