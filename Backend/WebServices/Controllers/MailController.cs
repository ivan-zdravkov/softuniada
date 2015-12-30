using System.Web.Http;
using WebServices.Models;

namespace WebServices.Controllers
{
    [RoutePrefix("api/mail")]
    [Authorize]
    public class MailController : BaseApiController
    {
        [HttpPost]
        [Route("sendMail")]
        public IHttpActionResult SendMail(SimpleMailModel mail)
        {
            return Ok();
        }
    }
}