using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Auth.Models
{
    public class AuthenticateModel
    {
        [Required]
        [DefaultValue("santa")]
        public string Username { get; set; }

        [Required]
        [DefaultValue("P@$$w0rd")]
        public string Password { get; set; }
    }
}