using System.Collections.Generic;

namespace dashboardBackend.Models
{
    public class Company
    {
        public long CompanyID { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string StrNumber { get; set; }
        public string Zipcode { get; set; }

        public ICollection<Site> Sites { get; set; }
        public ICollection<User> Users { get; set; }
    }
}