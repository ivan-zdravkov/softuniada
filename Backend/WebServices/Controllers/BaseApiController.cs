using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Routing;
using WebServices.Infrastructure;

namespace WebServices.Controllers
{
    public class BaseApiController : ApiController
    {
        private ApplicationUserManager appUserManager = null;

        public BaseApiController()
        {
        }

        protected ApplicationUserManager AppUserManager
        {
            get
            {
                return this.appUserManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
        }
    }
}