namespace RestaurantAPI.Models
{
    public class RecipeDTO
    {
        public virtual long Id { get; set; }
        public virtual string? Author { get; set; }
        public virtual string? Name { get; set; }

        public virtual string? Type { get; set; }
        public virtual string? Recipe { get; set; }
    }
}
