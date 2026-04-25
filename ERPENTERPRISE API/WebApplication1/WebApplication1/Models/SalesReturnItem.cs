using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApplication1.Models
{
    [Table("SalesReturnItems")]
    public class SalesReturnItem
    {
        [Key]
        public int Id { get; set; }

        public int? SalesReturnId { get; set; }
        public int? ProductId { get; set; }

        [Required]
        [StringLength(100)]
        public string ProductName { get; set; } = string.Empty;

        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TaxPercentage { get; set; }
        public decimal Total { get; set; }

        [ForeignKey("SalesReturnId")]
        [JsonIgnore]
        public SalesReturn? SalesReturn { get; set; }

        [ForeignKey("ProductId")]
        [JsonIgnore]
        public Product? Product { get; set; }
    }
}
