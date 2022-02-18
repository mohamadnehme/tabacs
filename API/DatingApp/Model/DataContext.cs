using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Model
{
    public class DataContext : IdentityDbContext<User, Role, string,
        IdentityUserClaim<string>, UserRole,
        IdentityUserLogin<string>, IdentityRoleClaim<string>,
        IdentityUserToken<string>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<Tabac> Tabacs { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Value> Values { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<Depositor> Depositors { get; set; }
        public DbSet<Deposit> Deposits { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Charge> Charges { get; set; }
        public DbSet<OrderPayment> OrderPayments { get; set; }
        public DbSet<Customer> Customers { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });
                userRole.HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

                userRole.HasOne(ur => ur.User)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
            });

            builder
            .Entity<User>()
            .Property(e => e.Id)
            .ValueGeneratedOnAdd();

            builder
            .Entity<Role>()
            .Property(e => e.Id)
            .ValueGeneratedOnAdd();

            builder
            .Entity<Tabac>()
            .Property(e => e.Id)
            .ValueGeneratedOnAdd();
        }
    }
}
