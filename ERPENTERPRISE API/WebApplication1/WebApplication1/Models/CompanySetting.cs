using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("CompanySettings")]
    public class CompanySetting
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string CompanyName { get; set; } = string.Empty;

        [StringLength(200)]
        public string? Address { get; set; }

        [StringLength(20)]
        public string? Phone { get; set; }

        [StringLength(150)]
        public string? Email { get; set; }

        [StringLength(100)]
        public string? Website { get; set; }

        [StringLength(50)]
        public string? TaxNumber { get; set; }

        [StringLength(50)]
        public string? Currency { get; set; } = "INR";

        [StringLength(10)]
        public string? CurrencySymbol { get; set; } = "₹";

        [StringLength(50)]
        public string? DateFormat { get; set; } = "dd-MM-yyyy";

        [StringLength(200)]
        public string? LogoUrl { get; set; }

        public DateTime? UpdatedAt { get; set; } = DateTime.Now;
    }
}
