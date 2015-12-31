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
using DAL.Enums;

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
            Article article = this.DB.Articles
                .AsNoTracking()
                .Include(a => a.ArticleTags)
                .Include(a => a.ArticleTags.Select(at => at.Tag))
                .SingleOrDefault(a => a.Id == articleId);

            if (article != null)
            {
                return new ArticleOutputModel()
                {
                    Id = article.Id,
                    Title = article.Name,
                    Content = article.Text,
                    StatusId = article.StatusID,
                    CategoryId = article.CategoryID,
                    //Image = article.HeaderPicture,
                    Tags = article.ArticleTags
                        .OrderBy(at => at.Tag.Name)
                        .Select(at => new BasicModel()
                        {
                            Id = at.Tag.Id,
                            Name = at.Tag.Name
                        })
                };
            }
            else
            {
                throw new ArgumentException("Article not found.");
            }
        }
      
        public IEnumerable<ArticleOutputModel> GetAllArticles()
        {
            return this.DB.Articles
                .AsNoTracking()
                .Include(a => a.ArticleTags)
                .Include(a => a.ArticleTags.Select(at => at.Tag))
                .OrderBy(a => a.Name)
                .Select(article => new ArticleOutputModel()
                {
                    Id = article.Id,
                    Title = article.Name,
                    Content = article.Text,
                    StatusId = article.StatusID,
                    CategoryId = article.CategoryID,
                    //Image = article.HeaderPicture,
                    Tags = article.ArticleTags
                        .OrderBy(at => at.Tag.Name)
                        .Select(at => new BasicModel()
                        {
                            Id = at.Tag.Id,
                            Name = at.Tag.Name
                        })
                }).ToList();
        }

        public IEnumerable<ArticleOutputModel> GetAllArticlesInCategory(int categoryId)
        {
            return this.DB.Articles
               .AsNoTracking()
               .Include(a => a.ArticleTags)
               .Include(a => a.ArticleTags.Select(at => at.Tag))
               .Where(a => a.CategoryID == categoryId)
               .OrderBy(a => a.Name)
               .Select(article => new ArticleOutputModel()
               {
                   Id = article.Id,
                   Title = article.Name,
                   Content = article.Text,
                   StatusId = article.StatusID,
                   CategoryId = article.CategoryID,
                    //Image = article.HeaderPicture,
                    Tags = article.ArticleTags
                       .OrderBy(at => at.Tag.Name)
                       .Select(at => new BasicModel()
                       {
                           Id = at.Tag.Id,
                           Name = at.Tag.Name
                       })
               }).ToList();
        }

        public IEnumerable<ArticleOutputModel> GetAllArticlesInTag(int tagId)
        {
            return this.DB.Articles
               .AsNoTracking()
               .Include(a => a.ArticleTags)
               .Include(a => a.ArticleTags.Select(at => at.Tag))
               .Where(a => a.ArticleTags.Any(at => at.TagID == tagId))
               .OrderBy(a => a.Name)
               .Select(article => new ArticleOutputModel()
               {
                   Id = article.Id,
                   Title = article.Name,
                   Content = article.Text,
                   StatusId = article.StatusID,
                   CategoryId = article.CategoryID,
                   //Image = article.HeaderPicture,
                   Tags = article.ArticleTags
                       .OrderBy(at => at.Tag.Name)
                       .Select(at => new BasicModel()
                       {
                           Id = at.Tag.Id,
                           Name = at.Tag.Name
                       })
               }).ToList();
        }

        public ArticleOutputModel CreateArticle(ArticleInputModel articleModel)
        {
            Article article = this.DB.Articles.Create();

            article.Name = articleModel.Title;
            article.Text = articleModel.Content;
            article.CategoryID = articleModel.CategoryId;
            article.StatusID = (int)StatusesEnum.Pending;
            //article.HeaderPicture = articleModel.Image;

            IEnumerable<BasicModel> existingTags = this.DB.Tags
                .AsNoTracking()
                .Where(t => articleModel.Tags.Contains(t.Name))
                .Select(t => new BasicModel()
                {
                    Id = t.Id,
                    Name = t.Name
                })
                .ToList();

            IEnumerable<string> notExistingTags = articleModel.Tags
                .Where(t => !existingTags.Select(et => et.Name).Contains(t));

            foreach(string nonExistingTag in notExistingTags)
            {
                Tag tagToCreate = this.DB.Tags.Create();

                tagToCreate.Name = nonExistingTag;

                article.ArticleTags.Add(new ArticleTag()
                {
                    ArticleID = article.Id,
                    TagID = tagToCreate.Id
                });
            }
                
            foreach(BasicModel existingTag in existingTags)
            {
                article.ArticleTags.Add(new ArticleTag()
                {
                    ArticleID = article.Id,
                    TagID = existingTag.Id
                });
            }

            this.DB.Articles.Add(article);
            this.DB.SaveChanges();

            return this.GetArticleById(article.Id);
        }

        public ArticleOutputModel UpdateArticle(int articleId, ArticleInputModel articleModel)
        {
            Article article = this.DB.Articles.SingleOrDefault(a => a.Id == articleId);

            if (article != null)
            {
                article.Name = articleModel.Title;
                article.Text = articleModel.Content;
                article.CategoryID = articleModel.CategoryId;
                //article.HeaderPicture = articleModel.Image;

                this.DB.ArticleTags.RemoveRange(article.ArticleTags);

                IEnumerable<BasicModel> existingTags = this.DB.Tags
                    .AsNoTracking()
                    .Where(t => articleModel.Tags.Contains(t.Name))
                    .Select(t => new BasicModel()
                    {
                        Id = t.Id,
                        Name = t.Name
                    })
                    .ToList();

                IEnumerable<string> notExistingTags = articleModel.Tags
                    .Where(t => !existingTags.Select(et => et.Name).Contains(t));

                foreach (string nonExistingTag in notExistingTags)
                {
                    Tag tagToCreate = this.DB.Tags.Create();

                    tagToCreate.Name = nonExistingTag;

                    article.ArticleTags.Add(new ArticleTag()
                    {
                        ArticleID = article.Id,
                        TagID = tagToCreate.Id
                    });
                }

                foreach (BasicModel existingTag in existingTags)
                {
                    article.ArticleTags.Add(new ArticleTag()
                    {
                        ArticleID = article.Id,
                        TagID = existingTag.Id
                    });
                }

                this.DB.SaveChanges();

                return this.GetArticleById(article.Id);
            }
            else
            {
                throw new ArgumentException("Article not found.");
            }
        }

        public void DeleteArticle(int articleId)
        {
            Article article = this.DB.Articles.SingleOrDefault(a => a.Id == articleId);

            if (article != null)
            {
                this.DB.ArticleTags.RemoveRange(article.ArticleTags);
                this.DB.Articles.Remove(article);

                this.DB.SaveChanges();
            }
            else
            {
                throw new ArgumentException("Article not found.");
            }
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
                .OrderBy(t => t.Name)
                .Select(t => new BasicModel()
                {
                    Id = t.Id,
                    Name = t.Name
                })
                .ToList();
        }

        public IEnumerable<BasicModel> GetAllTagsLike(string tagName)
        {
            IEnumerable<BasicModel> allTags = this.GetAllTags();

            return allTags
                .Where(t => t.Name.ToLower().Contains(tagName.ToLower()))
                .ToList();
        }
        #endregion
    }
}
