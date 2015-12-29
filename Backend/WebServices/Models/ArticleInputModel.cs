namespace WebServices.Models
{
    public class ArticleInputModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Image { get; set; }

        public string Content { get; set; }

        public int StatusId { get; set; }

        public int CategoryId { get; set; }
    }
}