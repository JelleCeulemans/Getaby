using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dashboardBackend.Models
{
    public class Camera
    {
        public long CameraID { get; set; }
        public string Name { get; set; }
        public string Ip { get; set; }

        public Site Site { get; set; }
    }
}
