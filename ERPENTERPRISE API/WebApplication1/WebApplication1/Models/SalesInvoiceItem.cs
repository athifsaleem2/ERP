using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApplication1.Models
{
    [Table("SalesInvoiceItems")]
    public class SalesInvoiceItem
    {
        [Key]
        public int Id { get; set; }

        public int? InvoiceId { get; set; }
        public int? ProductId { get; set; }

        [Required]
        [StringLength(100)]
        public string ProductName { get; set; } = string.Empty;

        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TaxPercentage { get; set; }
        public decimal Total { get; set; }

        [ForeignKey("InvoiceId")]
        [JsonIgnore]
        public SalesInvoice? SalesInvoice { get; set; }

        [ForeignKey("ProductId")]
        [JsonIgnore]
        public Product? Product { get; set; }
    }
}
