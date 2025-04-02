import {FilterItem} from "../../components/Filter/Filter.tsx";

export function mapCategoryToFilterItem(category: string): FilterItem {
    return {
        id: category,
        name: category,
        checked: false
    };
}
