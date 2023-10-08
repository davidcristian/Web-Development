using Microsoft.EntityFrameworkCore;

namespace RestaurantAPI.Models
{
    public class RestaurantContext : DbContext
    {
        public RestaurantContext() { }

        public RestaurantContext(DbContextOptions<RestaurantContext> options) : base(options)
        {
            // EnsureDeleted to skip migrations
            // delete to keep data between runs
            //Database.EnsureDeleted();
            //Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Constraints here
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<RecipeDTO> Recipes { get; set; }
    }
}
