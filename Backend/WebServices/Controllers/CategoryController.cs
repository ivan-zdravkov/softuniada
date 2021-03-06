using DAL.Models;
using System.Collections;
using System.Collections.Generic;
using System.Web.Http;
using WebServices.Models;

namespace WebServices.Controllers
{
    [RoutePrefix("api/category")]
    [Authorize]
    public class CategoryController : BaseApiController
    {
        [HttpGet]
        [Route("getAll")]
        public IHttpActionResult GetAllCategories()
        {
            IEnumerable<BasicModel> allCategories = this.SoftuniadaDAL.GetAllCategories();

            return Ok(allCategories);
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult CreateCategory(string categoryName)
        {
            int categoryId = this.SoftuniadaDAL.CreateCategory(categoryName);

            return Ok(categoryId);
        }

        [HttpPut]
        [Route("update")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult UpdateCategory(BasicModel category)
        {
            this.SoftuniadaDAL.UpdateCategory(category);

            return Ok();
        }

        [HttpDelete]
        [Route("delete/{categoryId}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteCategory(int categoryId)
        {
            this.SoftuniadaDAL.DeleteCategory(categoryId);

            return Ok();
        }
    }
}