namespace RestaurantAPI.Models
{
    public class User
    {
        public virtual long Id { get; set; }
        public virtual string? Name { get; set; }
        public virtual string? Password { get; set; }
    }
}
