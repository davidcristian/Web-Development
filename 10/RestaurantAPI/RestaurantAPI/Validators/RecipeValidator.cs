using RestaurantAPI.Models;

namespace RestaurantAPI.Validators
{
    public class RecipeValidator
    {
        public RecipeValidator() { }

        public string Validate(RecipeDTO recipe)
        {
            List<string> errors = new List<string>();

            if (recipe == null)
                return "Recipe must not be null.";

            if (recipe.Author == null || recipe.Author.Trim().Length < 3)
                errors.Add("Author name must be at least 3 characters long.");

            if (recipe.Name == null || recipe.Name.Trim().Length < 3)
                errors.Add("Recipe name must be at least 3 characters long.");

            if (recipe.Type == null || recipe.Type.Trim().Length < 3)
                errors.Add("Recipe type must be at least 3 characters long.");

            if (recipe.Recipe == null || recipe.Recipe.Trim().Length < 10)
                errors.Add("The actual recipe must be at least 10 characters long.");

            return string.Join("\n", errors);
        }
    }
}
