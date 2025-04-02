import {describe, expect, it} from "vitest";
import {getCheckedFilterItemIds} from "./getCheckedFilterItemIds.ts";
import {FilterItem} from "../../components/Filter/Filter.tsx";

describe('getCheckedFilterItemIds', () => {

    it('should contain the ids of all checked items', () => {
        // Arrange
        const checkedFilterItems: FilterItem[] = [
            {
                id: "filterItemId1",
                name: "filterItemName1",
                checked: true
            },
            {
                id: "filterItemId2",
                name: "filterItemName2",
                checked: true
            },
            {
                id: "filterItemId3",
                name: "filterItemName3",
                checked: true
            },
            {
                id: "filterItemId4",
                name: "filterItemName4",
                checked: true
            },
        ];

        // Act
        const checkedFilterItemIds = getCheckedFilterItemIds(checkedFilterItems);

        // Assert
        expect(checkedFilterItemIds.length).toBe(checkedFilterItems.length);
        checkedFilterItems.forEach(checkedFilter => {
            expect(checkedFilterItemIds).toContain(checkedFilter.id);
        });
    });

    it('should not contain the ids of unchecked filter items', () => {
        // Arrange
        const uncheckedFilterItems: FilterItem[] = [
            {
                id: "filterItemId1",
                name: "filterItemName1",
                checked: false
            },
            {
                id: "filterItemId2",
                name: "filterItemName2",
                checked: false
            },
            {
                id: "filterItemId3",
                name: "filterItemName3",
                checked: false
            },
            {
                id: "filterItemId4",
                name: "filterItemName4",
                checked: false
            },
        ];

        // Act
        const checkedFilterItemIds = getCheckedFilterItemIds(uncheckedFilterItems);

        // Assert
        expect(checkedFilterItemIds.length).toBe(0);
    });

});
