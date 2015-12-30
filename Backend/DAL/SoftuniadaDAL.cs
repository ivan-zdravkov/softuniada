using DAL.Extensions;
using System;
using System.Data;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
using DAL.EntityFramework;

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
            Article article = this.DB.Articles.SingleOrDefault(a => a.Id == model.ArticleId);

            if (article != null)
            {
                article.StatusID = model.StatusId;

                this.DB.SaveChanges();
            }
            else
            {
                throw new ArgumentException("Article not found.");
            }
        }

        public IEnumerable<BasicModel> GetAllStatuses()
        {
            return this.DB.Status
                .AsNoTracking()
                .OrderBy(s => s.Name)
                .Select(s => new BasicModel()
                {
                    Id = s.Id,
                    Name = s.Name
                })
                .ToList();
        }
        #endregion

        #region Categories
        public IEnumerable<BasicModel> GetAllCategories()
        {
            return this.DB.Categories
                .AsNoTracking()
                .OrderBy(c => c.Name)
                .Select(c => new BasicModel()
                {
                    Id = c.Id,
                    Name = c.Name
                })
                .ToList();
        }

        public int CreateCategory(string categoryName)
        {
            Category category = this.DB.Categories.Create();
            category.Name = categoryName;

            this.DB.Categories.Add(category);
            this.DB.SaveChanges();

            return category.Id;
        }

        public void UpdateCategory(BasicModel categoryModel)
        {
            Category category = this.DB.Categories.SingleOrDefault(c => c.Id == categoryModel.Id);

            if (category != null)
            {
                category.Name = categoryModel.Name;

                this.DB.SaveChanges();
            }
            else
            {
                throw new ArgumentException("Category not found.");
            }
        }

        public void DeleteCategory(int categoryId)
        {
            Category category = this.DB.Categories
                .Include(c => c.Articles)
                .SingleOrDefault(c => c.Id == categoryId);

            if (category != null)
            {
                if (!category.Articles.Any())
                {
                    this.DB.Categories.Remove(category);

                    this.DB.SaveChanges();
                }
                else
                {
                    throw new DataException("You cannot delete a Category when there are Articles in that Category.");
                }
            }
            else
            {
                throw new ArgumentException("Category not found.");
            }
        }
        #endregion

        #region Tags
        public IEnumerable<BasicModel> GetAllTags()
        {
            return this.DB.Tags
                .AsNoTracking()
                .Select(t => new BasicModel()
                {
                    Id = t.Id,
                    Name = t.Name
                })
                .ToList();
        }

        public IEnumerable<BasicModel> GetAllTagsLike(string tagName)
        {
            tagName = tagName.ToLower();

            IEnumerable<BasicModel> allTags = this.GetAllTags();

            return allTags
                .Where(t => t.Name.ToLower().Contains(tagName))
                .ToList();
        }
        #endregion
    }
}
