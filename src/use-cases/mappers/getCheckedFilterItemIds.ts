import { FilterItem } from "../../components/Filter/Filter.tsx";

export function getCheckedFilterItemIds(filterItems: FilterItem[]): string[] {
  return filterItems.filter((item) => item.checked).map((item) => item.id);
}
