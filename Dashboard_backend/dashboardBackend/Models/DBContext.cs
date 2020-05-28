using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dashboardBackend.Models
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Site> Sites { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Trespass> Trespasses { get; set; }

        public DbSet<Camera> Cameras { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Site>().ToTable("Site");
            modelBuilder.Entity<Trespass>().ToTable("Trespass");
            modelBuilder.Entity<Company>().ToTable("Company");
            modelBuilder.Entity<Role>().ToTable("Role");
            modelBuilder.Entity<Camera>().ToTable("Camera");
        }
    }
}
