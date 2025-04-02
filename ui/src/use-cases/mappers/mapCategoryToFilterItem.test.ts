import {describe, expect, it} from "vitest";
import {mapCategoryToFilterItem} from "./mapCategoryToFilterItem.ts";

describe('mapCategoryToFilterItem', () => {

    // Arrange
    const categories: string[] = [
        'category name',
        'another category name'
    ];

    it.each(categories)('should have both an id and name of the category name', (category) => {
        // Act
        const filterItem = mapCategoryToFilterItem(category);

        // Assert
        expect(filterItem.id).toBe(category);
        expect(filterItem.name).toBe(category);
    });

    it.each(categories)('should not be checked', (category) => {
        // Act
        const filterItem = mapCategoryToFilterItem(category);

        // Assert
        expect(filterItem.checked).toBe(false);
    });

});
