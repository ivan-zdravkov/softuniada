using DAL.Models;
using System.Collections.Generic;
using System.Web.Http;
using WebServices.Models;

namespace WebServices.Controllers
{
    [RoutePrefix("api/article")]
    [Authorize]
    public class ArticleController : BaseApiController
    {
        [HttpGet]
        [Route("getAll")]
        [AllowAnonymous]
        public IHttpActionResult GetAllArticles()
        {
            IEnumerable<ArticleOutputModel> allArticles = this.SoftuniadaDAL.GetAllArticles();

            return Ok(allArticles);
        }

        [HttpGet]
        [Route("getById/{articleId}")]
        [AllowAnonymous]
        public IHttpActionResult GetArticleById(int articleId)
        {
            ArticleOutputModel article = this.SoftuniadaDAL.GetArticleById(articleId);

            return Ok(article);
        }

        [HttpPost]
        [Route("create")]
        public IHttpActionResult CreateArticle(ArticleInputModel article)
        {
            if (ModelState.IsValid)
            { 
                ArticleOutputModel createdArticle = this.SoftuniadaDAL.CreateArticle(article);

                return Ok(createdArticle);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut]
        [Route("update/{articleId}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult UpdateArticle(int articleId, ArticleInputModel article)
        {
            if (ModelState.IsValid)
            {
                ArticleOutputModel updatedArticle = this.SoftuniadaDAL.UpdateArticle(articleId, article);

                return Ok(updatedArticle);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut]
        [Route("changeStatus")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult ChangeArticleStatus(ArticleStatusModel model)
        {
            if (ModelState.IsValid)
            {
                this.SoftuniadaDAL.ChangeArticleStatus(model);

                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete]
        [Authorize(Roles = "Administrator")]
        [Route("delete/{articleId}")]
        public IHttpActionResult DeleteArticle(int articleId)
        {
            this.SoftuniadaDAL.DeleteArticle(articleId);

            return Ok();
        }

        [HttpGet]
        [Route("getAllStatuses")]
        public IHttpActionResult GetAllStatuses()
        {
            IEnumerable<BasicModel> allArticleStatuses = this.SoftuniadaDAL.GetAllStatuses();

            return Ok(allArticleStatuses);
        }
    }
}