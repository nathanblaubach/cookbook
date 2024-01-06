using Cookbook.Domain.Interfaces;
using Cookbook.Infrastructure.Repositories;

namespace Cookbook.Tests.Infrastructure.Repositories.CategoryRepositoryTests;

public class GetAllAsyncTests
{
    private readonly ICategoryRepository _categoryRepository = new CategoryRepository();
    
    [Fact]
    public async Task SuccessfullyLoadsCategories()
    {
        // Act
        var categories = await _categoryRepository.GetAllAsync();
        
        // Assert
        Assert.NotNull(categories);
        Assert.NotEmpty(categories);
    }
}