﻿using Cookbook.Domain.Interfaces;
using Cookbook.Application.Queries;

namespace Cookbook.Tests;

public class GetByParams
{
    private readonly IRecipeQueries queries;

    public GetByParams()
    {
        queries = new RecipeQueries(new TestDatabase());
    }

    [Fact]
    public async Task EmptyParamsDoNotLimitResults()
    {
        // Arrange
        const string searchTerm = "";
        var categoryIds = new List<long>();

        // Act
        var queryResults = await queries.GetByParamsAsync(searchTerm, categoryIds);

        // Assert
        Assert.NotEmpty(queryResults);
    }
}
