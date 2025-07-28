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
    [],
    [],
    ShoppingLilstsSlice
> = (set, get) => ({
    shoppinListsSlice: {
        shoppingLists: [],
        isLoading: false,
        errorMessage: '',
        reload: false,

        setShoppingLists: (lists) => set((state) => ({
            ...state,
            shoppinListsSlice: { ...state.shoppinListsSlice,  shoppingLists: lists }
        })),
        setLoading: (isLoading) => set((state) => ({
            ...state,
            shoppinListsSlice: { ...state.shoppinListsSlice,  isLoading }
        })),
        setError: (errorMessage) => set((state) => ({
            ...state,
            shoppinListsSlice: { ...state.shoppinListsSlice,  errorMessage }
        })),
        triggerReload: () => set((state) => ({
            ...state,
            shoppinListsSlice: { ...state.shoppinListsSlice,  reload: state.shoppinListsSlice.reload }
        })),
    }
})