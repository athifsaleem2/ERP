using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("Quotations")]
    public class Quotation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string QuotationNumber { get; set; } = string.Empty;

        public int? CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public Customer? Customer { get; set; }

        [Required]
        [StringLength(100)]
        public string CustomerName { get; set; } = string.Empty;

        public DateTime Date { get; set; } = DateTime.Now;

        public DateTime? ExpiryDate { get; set; }

        [StringLength(100)]
        public string? Reference { get; set; }

        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public decimal Tax { get; set; }
        public decimal GrandTotal { get; set; }

        public string? Notes { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }

        public ICollection<QuotationItem> Items { get; set; } = new List<QuotationItem>();
    }
}
