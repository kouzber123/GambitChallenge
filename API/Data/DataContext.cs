using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole { Name = "Member", NormalizedName = "Member" },
                new IdentityRole { Name = "Member", NormalizedName = "Admin" }
            );

            // builder.Entity<UserManager<User>>()
            // .HasData(
            //     new User { UserName = "Jakob", Email = "Jakob@hotmail.com" }

            // );
  

        }

    }
}
