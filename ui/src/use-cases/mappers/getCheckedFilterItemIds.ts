import {FilterItem} from "../../components/Filter/Filter.tsx";

export function getCheckedFilterItemIds(filterItems: FilterItem[]): string[] {
    return filterItems.reduce(
        (checkedIds: string[], filterItem: FilterItem): string[] => {
            if (filterItem.checked) {
                checkedIds.push(filterItem.id);
            }
            return checkedIds;
        },
        []
    );
}
