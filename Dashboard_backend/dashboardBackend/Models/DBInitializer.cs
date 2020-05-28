using dashboardBackend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dashboardBackend.Models
{
    public class DBInitializer
    {
        public static void Initialize(DBContext context)
        {
            context.Database.EnsureCreated();
            if (context.Users.Any())
            {
                return;
            }

           context.Companies.AddRange(
                new Company { Name = "Mediasoft", City = "Hasselt", Zipcode = "3333", Street = "Genkersteenweg", StrNumber = "49"},
                new Company { Name = "HP", City = "Geel", Zipcode = "5126", Street = "Kleinhoefstraat", StrNumber = "4"},
                new Company { Name = "Oneplus", City = "Aarschot", Zipcode = "3200", Street = "Aarschotsesteenweg", StrNumber = "235"}
                );
            context.SaveChanges();
            context.Roles.AddRange(
                new Role { Name = "Admin" },
                new Role { Name = "Toezichter" }
                );
            context.SaveChanges();
            context.Sites.AddRange(
                new Site { Name = "Van Heukelom", Company = context.Companies.Single(c => c.Name == "HP")},
                new Site { Name = "Talander", Company = context.Companies.Single(c => c.Name == "Oneplus") },
                new Site { Name = "Aperam", Company = context.Companies.Single(c => c.Name == "Mediasoft") },
                new Site { Name = "Flipper", Company = context.Companies.Single(c => c.Name == "Oneplus") }
                );
            context.SaveChanges();
            context.Users.AddRange(
                new User { 
                    Name = "War Op de Beeck", 
                    Role = context.Roles.Single(r => r.Name == "Toezichter"), 
                    Company = context.Companies.Single(c => c.Name == "Oneplus"),
                    EmployeeNumber = "1111", 
                    Password = Cipher.Encrypt("war", Cipher.secretKey)},
                new User { 
                    Name = "Matthijs Renders",
                    Role = context.Roles.Single(r => r.Name == "Toezichter"),
                    Company = context.Companies.Single(c => c.Name == "HP"),
                    EmployeeNumber = "2222", 
                    Password = Cipher.Encrypt("matthijs", Cipher.secretKey)},
                new User { 
                    Name = "Mathias Van de Water", 
                    Role = context.Roles.Single(r => r.Name == "Admin"), 
                    Company = context.Companies.Single(c => c.Name == "Mediasoft"),
                    EmployeeNumber = "3333", 
                    Password = Cipher.Encrypt("mathias", Cipher.secretKey)
                },
                new User { 
                    Name = "Jelle Ceulemans", 
                    Role = context.Roles.Single(r => r.Name == "Admin"), 
                    Company = context.Companies.Single(c => c.Name == "Mediasoft"), 
                    EmployeeNumber = "4444", 
                    Password = Cipher.Encrypt("jelle", Cipher.secretKey)
                },
                new User { 
                    Name = "Sieben Deproost", 
                    Role = context.Roles.Single(r => r.Name == "Toezichter"), 
                    Company = context.Companies.Single(c => c.Name == "Oneplus"),
                    EmployeeNumber = "5555", 
                    Password = Cipher.Encrypt("sieben", Cipher.secretKey)
                }
                );
            context.SaveChanges();
            context.Cameras.AddRange(
                new Camera { Name = "Lastbalk", Site = context.Sites.Single(v => v.Name == "Aperam"), Ip="192.168.199.100" },
                new Camera { Name = "Loskade", Site = context.Sites.Single(v => v.Name == "Aperam"), Ip = "192.168.199.101" }
                );
            context.SaveChanges();
            context.Trespasses.AddRange(
                new Trespass { Path = "pad/naar/bestand/video.mov", Camera = context.Cameras.Single(v => v.Name == "Lastbalk"), Archive = true, Moment = new DateTime()},
                new Trespass { Path = "ander/pad/naar/bestand/video2.mov", Camera = context.Cameras.Single(v => v.Name == "Lastbalk"), Archive = false, Moment = new DateTime() },
                new Trespass { Path = "C:/Users/samsonEnGert.mov", Camera = context.Cameras.Single(v => v.Name == "Lastbalk"), Archive = true, Moment = new DateTime() },
                new Trespass { Path = "D:/Desktop/K3.mov", Camera = context.Cameras.Single(v => v.Name == "Lastbalk"), Archive = false, Moment = new DateTime() },
                new Trespass { Path = "C:/Users/warop/documents/storror.mov", Camera = context.Cameras.Single(v => v.Name == "Lastbalk"), Archive = true, Moment = new DateTime() }
                );
            context.SaveChanges();
        }
    }
}
