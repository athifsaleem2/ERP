using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("PurchaseReturns")]
    public class PurchaseReturn
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string ReturnNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string InvoiceNumber { get; set; } = string.Empty;

        public int? SupplierId { get; set; }

        [ForeignKey("SupplierId")]
        public Supplier? Supplier { get; set; }

        public DateTime ReturnDate { get; set; } = DateTime.Now;

        [StringLength(255)]
        public string? Reason { get; set; }

        public decimal TotalAmount { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }

        public ICollection<PurchaseReturnItem> Items { get; set; } = new List<PurchaseReturnItem>();
    }
}
