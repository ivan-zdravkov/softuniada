using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebServices.Controllers
{
    [RoutePrefix("api/tag")]
    [Authorize]
    public class TagController : BaseApiController
    {
        [HttpGet]
        [Route("getAll")]
        [AllowAnonymous]
        public IHttpActionResult GetAllTags()
        {
            IEnumerable<BasicModel> allTags = this.SoftuniadaDAL.GetAllTags();

            return Ok(allTags);
        }
    }
}