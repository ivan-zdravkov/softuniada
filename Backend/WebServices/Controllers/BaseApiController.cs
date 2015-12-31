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
using Microsoft.AspNet.Identity;
using DAL;

namespace WebServices.Controllers
{
    [GlobalExceptionFilterAttribute]
    public class BaseApiController : ApiController
    {
        private SoftuniadaDAL softuniadaDAL = null;
        private ApplicationUserManager appUserManager = null;
        private ApplicationRoleManager appRoleManager = null;

        public BaseApiController()
        {
            string currentUserId = null;

            if (HttpContext.Current != null && HttpContext.Current.User != null && HttpContext.Current.User.Identity != null)
            {
                currentUserId = HttpContext.Current.User.Identity.GetUserId();
            }

            if (currentUserId == null)
            {
                currentUserId = GlobalConstants.SystemAdministratorId;
            }

            softuniadaDAL = new SoftuniadaDAL(currentUserId);
        }

        protected SoftuniadaDAL SoftuniadaDAL
        {
            get { return this.softuniadaDAL; }
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