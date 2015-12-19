using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using WebServices.Controllers.Models;
using WebServices.Infrastructure;
using WebServices.Models;

namespace WebServices.Controllers
{
    [RoutePrefix("api/accounts")]
    public class AccountsController : BaseApiController
    {
        [HttpGet]
        [Route("users")]
        public IHttpActionResult GetUsers()
        {
            return Ok(this.AppUserManager.Users.ToList().Select(u => new UserModel(u, this.AppUserManager, this.AppRoleManager)));
        }

        [HttpGet]
        [Route("user/{id:guid}", Name = "GetUser")]
        public async Task<IHttpActionResult> GetUser(string Id)
        {
            var user = await this.AppUserManager.FindByIdAsync(Id);

            if (user != null)
            {
                return Ok(new UserModel(user, this.AppUserManager, this.AppRoleManager));
            }

            return NotFound();
        }

        [HttpDelete]
        [Route("user/{id:guid}")]
        public async Task<IHttpActionResult> DeleteUser(string id)
        {
            var user = await this.AppUserManager.FindByIdAsync(id);

            if (user != null)
            {
                IdentityResult result = await this.AppUserManager.DeleteAsync(user);

                return Ok();
            }

            return NotFound();
        }

        [HttpPost]
        [Route("create")]
        public async Task<IHttpActionResult> CreateUser(RegisterUserModel createUserModel)
        {
            if (ModelState.IsValid)
            {
                if (this.AppUserManager.FindByEmail(createUserModel.Email) == null)
                {
                    ApplicationUser user = new ApplicationUser()
                    {
                        UserName = createUserModel.Email,
                        Email = createUserModel.Email
                    };

                    IdentityResult addUserResult = await this.AppUserManager.CreateAsync(user, createUserModel.Password);

                    if (addUserResult.Succeeded)
                    {
                        this.AppUserManager.AddToRole(user.Id, "User");

                        return Created(new Uri(Url.Link("GetUser", new { id = user.Id })), new UserModel(user, this.AppUserManager, this.AppRoleManager));
                    }
                    else
                    {
                        return InternalServerError();
                    }
                }
                else
                {
                    return BadRequest("This email has already been registered.");
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut]
        [Route("changePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordModel model)
        {
            if (ModelState.IsValid)
            {
                IdentityResult result = await this.AppUserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);

                if (result.Succeeded)
                {
                    return Ok();       
                }
                else
                {
                    return BadRequest("Could not change password.");
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPost]
        [Route("isEmailAvailable")]
        public IHttpActionResult IsEmailAvailable([FromBody]string email)
        {
            if (email != null)
            {
                return Ok(this.AppUserManager.FindByEmail(email) == null);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}