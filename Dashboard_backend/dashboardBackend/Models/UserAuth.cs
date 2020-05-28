using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace dashboardBackend.Models
{
    public class UserAuth
    {
        public string EmployeeNumber { get; set; }
        public string Password { get; set; }

        [NotMapped]
        public string Token { get; set; }
    }
}
