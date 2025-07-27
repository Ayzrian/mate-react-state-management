import { useState, useMemo, useEffect, useCallback } from "react"
import { ShoppingItem } from "../types";
import { ShoppingListItemFormValues } from "../components/ShoppingListItemForm/ShoppingListItemForm";
import { useSearchParams } from "react-router";
import { useShoppingListItemService } from "../services/ShoppingListItemService";
import debounce from "debounce";

export function useShoppingList(listId: number) {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateSearchParams = (name: string, value: boolean | string) => {
        const newSearchParams = new URLSearchParams(searchParams);
 
 
        if (value) {
            newSearchParams.set(name, String(value));
        } else {
            newSearchParams.delete(name);
        }
 
 
        setSearchParams(newSearchParams);
    } 

    const [list, setList] = useState<ShoppingItem[]>([]);

    const [mustHaveFilter, setMustHaveFilter] = useState(searchParams.get('mustHave') ? Boolean(searchParams.get('mustHave')): false);
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') ? searchParams.get('sortBy'): '');

    const {
        getShoppingListItems,
        deleteShoppingListItem,
        updateShoppingListItem,
    } = useShoppingListItemService();

    const getList = useMemo(() => {
        return debounce((listId) => {
            getShoppingListItems(listId)
                .then(results => setList(results));
        }, 200);
    }, [getShoppingListItems, setList]);

    useEffect(() => {
        getList(listId);
    }, [mustHaveFilter]);

    const deleteItem = useCallback(async (itemId: number) => {
        try {
            const index = list.findIndex((item) => item.id === itemId);

            setList([...list.slice(0, index), ...list.slice(index + 1)]);
    
            await deleteShoppingListItem(listId, itemId);
        } catch (e) {
            setList(list);

            throw e;
        }
    }, [setList, list, deleteShoppingListItem])

    const updateItem = async (itemId: number, update: ShoppingListItemFormValues) => {
        await updateShoppingListItem(listId, itemId, update);

        setList((list) => list.map(item => {
            if (item.id === itemId) {
                return {...item, ...update};
            }

            return item;
        }))
    } 

    const resultingList = useMemo(() => {
        const results = mustHaveFilter ? list.filter((item) => item.mustHave) : list;

        if (!sortBy) {
            return results;
        }

        switch(sortBy) {
            case 'mustHave':
                return [...results].sort((a, b) => {
                if (a.mustHave && b.mustHave) {
                    return 0
                }

                if (a.mustHave && !b.mustHave) {
                    return -1;
                }

                return 1;
                });
            case 'quantity':
                return [...results].sort((a, b) => b.quantity - a.quantity);
            default:
                throw new Error('Unknown field name!');
        }
    }, [list, mustHaveFilter, sortBy]) 

    return {
        list: resultingList,
        deleteItem,
        updateItem,
        mustHaveFilter,
        setMustHaveFilter: (value: boolean) => {
            setMustHaveFilter(value);
            updateSearchParams('mustHave', value);
        },
        setSortBy: (value: string) => {
            setSortBy(value);
            updateSearchParams('sortBy', value);
        }
    }
}