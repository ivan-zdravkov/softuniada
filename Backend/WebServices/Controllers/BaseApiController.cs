using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebServices.Infrastructure;
using System.Data.Entity;
using WebServices.Filters;

namespace WebServices.Controllers
{
    [GlobalExceptionFilterAttribute]
    public class BaseApiController : ApiController
    {
        private ApplicationUserManager appUserManager = null;
        private ApplicationRoleManager appRoleManager = null;
        private DbContext context;

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

        protected ApplicationRoleManager AppRoleManager
        {
            get
            {
                return this.appRoleManager ?? Request.GetOwinContext().GetUserManager<ApplicationRoleManager>();
            }
        }
    }
}