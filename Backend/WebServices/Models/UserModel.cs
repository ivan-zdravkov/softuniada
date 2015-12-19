using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using WebServices.Infrastructure;

namespace WebServices.Controllers.Models
{
    public class UserModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }        
        public DateTime? Birthday { get; set; }
        public IEnumerable<string> RoleIds { get; set; }

        public string CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedAt { get; set; }

        public UserModel(ApplicationUser user)
        {
            this.Id = user.Id;
            this.Email = user.Email;
            this.UserName = user.UserName;
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.Birthday = user.Birthday;
            this.RoleIds = user.Roles.Select(r => r.RoleId).ToList();
            this.CreatedBy = user.CreatedBy;
            this.CreatedAt = user.CreatedAt;
            this.LastModifiedBy = user.LastModifiedBy;
            this.LastModifiedAt = user.LastModifiedAt;
        }
    }
}