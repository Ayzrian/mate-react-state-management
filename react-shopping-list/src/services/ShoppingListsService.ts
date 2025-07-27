import { ShoppingList } from "../pages/ShoppingListsPage";
import { useHTTPClient } from "../hooks/useHTTPClient";
import { useMemo } from "react";

type CreateShoppingListBody = Omit<ShoppingList, 'id'>;

export function useShoppingListsService() {
    const { get, post } = useHTTPClient();

    return useMemo(() => ({
        getShoppingLists: () => get<ShoppingList[]>('/api/v1/shopping-lists'),
        createShoppingList: (body: CreateShoppingListBody) =>
            post<ShoppingList, CreateShoppingListBody>('/api/v1/shopping-lists', body),
    }), [get, post]);
}