using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dashboardBackend.Models
{
    public class Trespass
    {
        public long TrespassID { get; set; }
        public DateTime Moment { get; set; }
        public string Path { get; set; }
        public bool Archive { get; set; }
        public Camera Camera { get; set; }
    }
}
