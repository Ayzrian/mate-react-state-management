import { StateCreator } from "zustand";
import { ShoppingList } from "../../pages/ShoppingListsPage";
import { AppState } from "..";

export type ShoppingLilstsSlice = {
    shoppinListsSlice: {
        shoppingLists: ShoppingList[];
        isLoading: boolean;
        errorMessage: string;
        reload: boolean;

        setShoppingLists: (lists: ShoppingList[]) => void;
        setLoading: (loading: boolean) => void;
        setError: (error: string) => void;
        triggerReload: () => void;
    }
}

export const createShoppingListsSlice: StateCreator<
    AppState,
    [["zustand/devtools", never], ["zustand/immer", never]],
    [],
    ShoppingLilstsSlice
> = (set, get) => ({
    shoppinListsSlice: {
        shoppingLists: [],
        isLoading: false,
        errorMessage: '',
        reload: false,

        setShoppingLists: (lists) => set((state) => {
            state.shoppinListsSlice.shoppingLists = lists;
        }, undefined, 'setShoppingLists'),
        setLoading: (isLoading) => set((state) => {
            state.shoppinListsSlice.isLoading = isLoading;
        }, undefined, 'setLoading'),
        setError: (errorMessage) => set((state) => {
            state.shoppinListsSlice.errorMessage = errorMessage;
        }, undefined, 'setError'),
        triggerReload: () => set((state) => {
            state.shoppinListsSlice.reload = !state.shoppinListsSlice.reload;
        }, undefined, 'triggerReload'),
    }
})