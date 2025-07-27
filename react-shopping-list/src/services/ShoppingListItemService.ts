import { useMemo } from "react";
import { useHTTPClient } from "../hooks/useHTTPClient"
import { ShoppingItem } from "../types";

export type CreateShoppingItem = Omit<ShoppingItem, 'id'>
export type UpdateShoppingItem = CreateShoppingItem

export function useShoppingListItemService() {
    const client = useHTTPClient();

    return useMemo(() => ({
        getShoppingListItems: (listId: number) => {
            return client.get<ShoppingItem[]>(`/api/v1/shopping-lists/${listId}/items`);
        },
        createShoppingListItem: (listId: number, body: CreateShoppingItem) => {
            return client.post<ShoppingItem, CreateShoppingItem>(`/api/v1/shopping-lists/${listId}/items`, body);
        },
        updateShoppingListItem: (listId: number, itemId: number, body: UpdateShoppingItem) => {
            return client.put<ShoppingItem, UpdateShoppingItem>(`/api/v1/shopping-lists/${listId}/items/${itemId}`, body);
        },
        deleteShoppingListItem: (listId: number, itemId: number) => {
            return client.delete(`/api/v1/shopping-lists/${listId}/items/${itemId}`);
        }
    }), [client])
}