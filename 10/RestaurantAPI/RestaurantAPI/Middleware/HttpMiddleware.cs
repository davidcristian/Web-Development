using Azure.Core;
using Microsoft.AspNetCore.Http;
using RestaurantAPI.Models;
using RestaurantAPI.Validators;
using System.Collections.Concurrent;
using System.Diagnostics.Metrics;
using System.Net;
using System.Net.Http;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;

namespace RestaurantAPI.Middleware
{
    public class HttpMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly RecipeValidator _validator;

        public HttpMiddleware(RequestDelegate next)
        {
            _next = next;
            _validator = new RecipeValidator();
        }

        public async Task InvokeAsync(HttpContext context)
        {
            bool skip = false;
            var request = context.Request ?? throw new Exception("Request is null");

            if (request.Path.Value.ToLower().Contains("api/recipes"))
                skip = true;
            if (context.Request.Method != HttpMethods.Post && context.Request.Method != HttpMethods.Put)
                skip = true;

            if (skip)
            {
                await _next(context);
                return;
            }

            request.EnableBuffering();
            var buffer = new byte[Convert.ToInt32(request.ContentLength)];
            await request.Body.ReadAsync(buffer, 0, buffer.Length);
            var requestContent = Encoding.UTF8.GetString(buffer);
            request.Body.Position = 0;

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            };

            RecipeDTO recipe = JsonSerializer.Deserialize<RecipeDTO>(requestContent, options)!;

            var validationResult = _validator.Validate(recipe);
            if (validationResult != string.Empty)
            {
                context.Response.Clear();
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                await context.Response.WriteAsync(validationResult);
                return;
            }

            await _next(context);
        }
    }
}
