using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebServices.Models;

namespace WebServices.Controllers
{
    [RoutePrefix("api/roles")]
    public class RolesController : BaseApiController
    {
        [HttpGet]
        [Route("all")]
        public IHttpActionResult GetAll()
        {
            return Ok(this.AppRoleManager.Roles.ToList().Select(r => new RoleModel() { Id = r.Id, Name = r.Name }));
        }
    }
}