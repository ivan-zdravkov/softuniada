using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebServices.Infrastructure
{
    public class ApplicationUser : IdentityUser
    {
        //TODO: Extend this class with additional properties.
        [MaxLength(100)]
        public string FirstName { get; set; }

        [MaxLength(100)]
        public string LastName { get; set; }

        public DateTime? Birthday { get; set; }
    }
}