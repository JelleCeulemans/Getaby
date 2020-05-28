using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace dashboardBackend.Models
{
    public class User
    {
        public long UserID { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string EmployeeNumber { get; set; }

        public Role Role { get; set; }
        public Company Company { get; set; }

        [NotMapped]
        public string Token { get; set; }
    }
}
