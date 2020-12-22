using System;

namespace Assign2.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        //public string Password { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
        public DateTime BirthDate { get; set; }
        public string Street { get; set; }  
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public bool IsNaughty { get; set; }
        public DateTime DateCreated = DateTime.Now;
    }
}        
