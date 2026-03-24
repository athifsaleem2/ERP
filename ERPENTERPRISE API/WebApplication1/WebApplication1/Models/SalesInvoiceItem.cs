using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("SalesInvoiceItems")]
    public class SalesInvoiceItem
    {
        [Key]
        public int Id { get; set; }

        public int SalesInvoiceId { get; set; }

        [Required]
        [StringLength(100)]
        public string ProductName { get; set; } = string.Empty;

        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TaxPercentage { get; set; }
        public decimal Total { get; set; }

        [ForeignKey("SalesInvoiceId")]
        public SalesInvoice? SalesInvoice { get; set; }
    }
}
