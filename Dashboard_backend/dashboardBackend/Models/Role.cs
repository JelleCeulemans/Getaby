using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace dashboardBackend.Models
{
    public class Role
    {
        public long RoleID { get; set; }
        public string Name { get; set; }

        public ICollection<User> Users { get; set; }
    }
}