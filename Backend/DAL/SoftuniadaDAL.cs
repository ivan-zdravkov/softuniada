using DAL.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;

namespace DAL
{
    public class SoftuniadaDAL
    {
        private ExtendedSoftuniadaEntities db;

        protected ExtendedSoftuniadaEntities DB
        {
            get
            {
                return this.db;
            }
        }

        #region Constructors
        public SoftuniadaDAL(string userId)
        {
            db = new ExtendedSoftuniadaEntities(userId);
        }

        // Use this constructor for unit tests.
        public SoftuniadaDAL(ExtendedSoftuniadaEntities extendedSoftuniadaEntities)
        {
            db = extendedSoftuniadaEntities;
        }
        #endregion

        #region Articles

        public ArticleOutputModel GetArticleById(int articleId)
        {
            throw new NotImplementedException();
        }
      
        public IEnumerable<ArticleOutputModel> GetAllArticles()
        {
            throw new NotImplementedException();
        }

        public ArticleOutputModel CreateArticle(ArticleInputModel article)
        {
            // Always create the article in the Pending status. 
            // Status will be changed at another place.
            // No need for ID in the model. The ID will be generated from the Entity Framework.
            // Return the newly created Article with tags and all!
            // The list of tags will need to be compared with all existing Tags. 
            // If a tag exists, it's Id should be writen in the ArticleTag Table
            // If the tag does not exist, it should be created first and the newly created Tag Id added to the ArticleTag Table.
            // Delete these comments when implemented.
            throw new NotImplementedException();
        }

        public ArticleOutputModel UpdateArticle(int articleId, ArticleInputModel article)
        {
            // Should not be able to change article status here.
            // Return the updated Article with tags and all!
            // The list of tags will need to be compared with all existing Tags. 
            // If a tag exists, it's Id should be writen in the ArticleTag Table
            // If the tag does not exist, it should be created first and the newly created Tag Id added to the ArticleTag Table.
            // Delete these comments when implemented.
            throw new NotImplementedException();
        }

        public void DeleteArticle(int articleId)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Statuses
        public void ChangeArticleStatus(ArticleStatusModel model)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<BasicModel> GetAllStatuses()
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Categories
        public IEnumerable<BasicModel> GetAllCategories()
        {
            throw new NotImplementedException();
        }

        public int CreateCategory(string categoryName)
        {
            throw new NotImplementedException();
        }

        public void UpdateCategory(BasicModel category)
        {
            throw new NotImplementedException();
        }

        public void DeleteCategory(int categoryId)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Tags
        public IEnumerable<BasicModel> GetAllTags()
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
