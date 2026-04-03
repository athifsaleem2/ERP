using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApplication1.Models
{
    [Table("PurchaseInvoiceItems")]
    public class PurchaseInvoiceItem
    {
        [Key]
        public int Id { get; set; }

        public int PurchaseInvoiceId { get; set; }
        public int ProductId { get; set; }

        [Required]
        [StringLength(100)]
        public string ProductName { get; set; } = string.Empty;

        public int Quantity { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal CostPrice { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Total { get; set; }

        [ForeignKey("PurchaseInvoiceId")]
        [JsonIgnore]
        public PurchaseInvoice? PurchaseInvoice { get; set; }

        [ForeignKey("ProductId")]
        [JsonIgnore]
        public Product? Product { get; set; }
    }
}
