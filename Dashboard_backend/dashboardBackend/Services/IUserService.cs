using dashboardBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dashboardBackend.Services
{
    public interface IUserService
    {
        User Authenticate(string employeenumber, string password);
    }
}
