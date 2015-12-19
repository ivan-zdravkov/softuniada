using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using WebServices.Controllers.Models;

namespace WebServices.Controllers
{
    [RoutePrefix("api/accounts")]
    public class AccountsController : BaseApiController
    {
        [Route("users")]
        public IHttpActionResult GetUsers()
        {
            try
            {
                List<UserModel> users = this.AppUserManager.Users.ToList()
                    .Select(u => new UserModel(u))
                    .ToList();

                return Ok(users);
            }
            catch (Exception ex)
            {
                return InternalServerError();
            }
        }
    }
}