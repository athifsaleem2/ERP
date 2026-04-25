using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("Attendance")]
    public class Attendance
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [ForeignKey("EmployeeId")]
        public Employee? Employee { get; set; }

        [Required]
        public DateTime Date { get; set; } = DateTime.Today;

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Present"; // Present, Absent, Half Day, Leave

        [StringLength(10)]
        public string? CheckIn { get; set; }

        [StringLength(10)]
        public string? CheckOut { get; set; }

        [StringLength(250)]
        public string? Remarks { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }
    }
}
