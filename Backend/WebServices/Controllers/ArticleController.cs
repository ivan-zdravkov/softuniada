using System.Web.Http;
using WebServices.Models;

namespace WebServices.Controllers
{
    [RoutePrefix("api/Article")]
    //[Authorize]
    public class ArticleController : BaseApiController
    {
        [HttpGet]
        [Route("GetAllArticles")]
        public IHttpActionResult GetAllArticles()
        {
            //Return ArticleOutputModel
            return Ok();
        }

        [HttpGet]
        [Route("GetArticleById/{articleId}")]
        public IHttpActionResult GetArticleById(int articleId)
        {
            //Return ArticleOutputModel
            return Ok();
        }

        [HttpPost]
        [Route("CreateArticle")]
        public IHttpActionResult CreateArticle(ArticleInputModel article)
        {
            return Ok();
        }

        [HttpPut]
        [Route("UpdateArticle")]
        public IHttpActionResult UpdateArticle(ArticleInputModel article)
        {
            return Ok();
        }

        [HttpPut]
        [Route("ChangeArticleStatus")]
        public IHttpActionResult ChangeArticleStatus(ArticleStatusModel model)
        {
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteArticle/{articleId}")]
        public IHttpActionResult DeleteArticles(int articleId)
        {
            return Ok();
        }

        [HttpGet]
        [Route("GetAllStatuses")]
        public IHttpActionResult GetAllStatuses()
        {
            //Return BasicModel
            return Ok();
        }
    }
}