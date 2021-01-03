using Santa.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Auth.Data
{
    public static class SeedData
    {
        // this is an extension method to the ModelBuilder class
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                GetParties()
            );
        }

        private static List<User> GetParties()
        {
            var users = new List<User>
            {
                new User()
                {
                    Id = 1,
                    FirstName = "Santa",
                    LastName = "Claus",
                    Username = "santa",
                    Email = "santa@np.com",
                    Password = "P@$$w0rd",
                    Role = Role.Admin
                },
                new User()
                {
                    Id = 2,
                    FirstName = "Tim",
                    LastName = "Mak",
                    Username = "tim",
                    Email = "tim@np.com",
                    Password = "P@$$w0rd",
                    Role = Role.User
                }
                
            };
            return users;
        }

    }
}
