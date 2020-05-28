using System.Collections.Generic;

namespace dashboardBackend.Models
{
    public class Site
    {
        public long SiteID { get; set; }
        public string Name { get; set; }

        public Company Company { get; set; }
        public ICollection<Camera> Cameras { get; set; }

    }
}