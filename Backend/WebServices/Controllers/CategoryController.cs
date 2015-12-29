using System.Web.Http;
using WebServices.Models;

namespace WebServices.Controllers
{
    [RoutePrefix("api/Category")]
    //[Authorize]
    public class CategoryController : BaseApiController
    {
        [HttpGet]
        [Route("GetAllCategories")]
        public IHttpActionResult GetAllCategories()
        {
            //Return BasicModel
            return Ok();
        }

        [HttpPost]
        [Route("CreateCategory")]
        public IHttpActionResult CreateCategory(BasicModel category)
        {
            // Return CategoryId
            return Ok();
        }

        [HttpPut]
        [Route("UpdateCategory")]
        public IHttpActionResult UpdateCategory(BasicModel category)
        {
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteCategory/{categoryId}")]
        public IHttpActionResult DeleteCategory(int categoryId)
        {
            return Ok();
        }
    }
}