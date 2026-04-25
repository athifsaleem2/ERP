using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("Employees")]
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string EmpCode { get; set; } = string.Empty;

        [Required]
        [StringLength(150)]
        public string Name { get; set; } = string.Empty;

        [StringLength(150)]
        public string? Email { get; set; }

        [StringLength(20)]
        public string? Phone { get; set; }

        [Required]
        [StringLength(100)]
        public string Department { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Designation { get; set; }

        public decimal BasicSalary { get; set; } = 0;

        public DateTime JoiningDate { get; set; } = DateTime.Now;

        [StringLength(20)]
        public string Status { get; set; } = "Active"; // Active, Inactive, On Leave

        [StringLength(250)]
        public string? Address { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; }
    }
}
