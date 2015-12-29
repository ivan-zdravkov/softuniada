using System.Web.Http;
using WebServices.Models;

namespace WebServices.Controllers
{
    [RoutePrefix("api/Mail")]
    //[Authorize]
    public class MailController : BaseApiController
    {
        [HttpPost]
        [Route("SendMail")]
        public IHttpActionResult SendMail(MailModel mail)
        {
            return Ok();
        }
    }
}