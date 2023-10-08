using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantAPI.Models;
using RestaurantAPI.Validators;

namespace RestaurantAPI.Controllers
{
    [Route("api/Recipes")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly RestaurantContext _context;
        //private readonly RecipeValidator _validator;

        public RecipesController(RestaurantContext context)
        {
            _context = context;
            //_validator = new RecipeValidator();
        }

        // GET: api/Recipes/types
        [HttpGet("types")]
        public async Task<ActionResult<IEnumerable<string?>>> GetRecipeTypes()
        {
            if (_context.Recipes == null)
                return NotFound();

            return await _context.Recipes
                .Select(x => x.Type)
                .Distinct()
                .ToListAsync();
        }

        // POST: api/Recipes/types/Breakfast
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpGet("types/{type}")]
        public async Task<ActionResult<IEnumerable<RecipeDTO>>> GetRecipesByType(string type)
        {
            if (_context.Recipes == null)
                return NotFound();

            if (type.Trim().ToLower() == "all")
                return await GetRecipes();

            return await _context.Recipes
                .Where(x => x.Type == type)
                .ToListAsync();
        }

        // GET: api/Recipes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecipeDTO>>> GetRecipes()
        {
            if (_context.Recipes == null)
                return NotFound();

            return await _context.Recipes
                .Select(x => x)
                .ToListAsync();
        }

        // GET: api/Recipes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecipeDTO>> GetRecipe(long id)
        {
            if (_context.Recipes == null)
                return NotFound();

            var recipeDTO = await _context.Recipes
                .FirstOrDefaultAsync(x => x.Id == id);
            if (recipeDTO == null)
                return NotFound();

            return recipeDTO;
        }

        // PUT: api/Recipes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(long id, RecipeDTO recipeDTO)
        {
            if (id != recipeDTO.Id)
                return BadRequest();

            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
                return NotFound();

            //var validationResult = _validator.Validate(recipeDTO);
            //if (validationResult != string.Empty)
            //    return BadRequest(validationResult);

            recipe.Author = recipeDTO.Author;
            recipe.Name = recipeDTO.Name;

            recipe.Type = recipeDTO.Type;
            recipe.Recipe = recipeDTO.Recipe;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!RecipeExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Recipes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RecipeDTO>> PostRecipe(RecipeDTO recipeDTO)
        {
            if (_context.Recipes == null)
                return Problem("Entity set 'RestaurantContext.Recipes' is null.");

            //var validationResult = _validator.Validate(recipeDTO);
            //if (validationResult != string.Empty)
            //    return BadRequest(validationResult);

            var recipe = new RecipeDTO
            {
                Author = recipeDTO.Author,
                Name = recipeDTO.Name,
                Type = recipeDTO.Type,
                Recipe = recipeDTO.Recipe
            };

            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetRecipe),
                new { id = recipe.Id },
                recipe);
        }

        // DELETE: api/Recipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(long id)
        {
            if (_context.Recipes == null)
                return NotFound();
            
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
                return NotFound();

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecipeExists(long id)
        {
            return _context.Recipes.Any(e => e.Id == id);
        }
    }
}
