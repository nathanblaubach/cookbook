using System.ComponentModel.DataAnnotations;
using Cookbook.Application.Queries;
using Cookbook.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Cookbook.Api.Controllers;

[Route("recipes")]
public class RecipesController(ISender sender) : Controller
{
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Recipe>), StatusCodes.Status202Accepted)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Index(string? searchTerm, long[]? categoryIds)
        => Ok(await sender.Send(new GetRecipesBySearchTermAndCategories(searchTerm, categoryIds)));
    
    [HttpGet("{recipeId}")]
    [ProducesResponseType(typeof(Recipe), StatusCodes.Status202Accepted)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Get(long? recipeId)
    {
        if (!recipeId.HasValue)
        {
            throw new ValidationException($"Invalid {nameof(recipeId)} provided");
        }
        return Ok(await sender.Send(new GetRecipeById(recipeId.Value)));
    }
}