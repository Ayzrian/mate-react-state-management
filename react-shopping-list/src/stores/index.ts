import { create } from "zustand";
import { createShoppingListsSlice, ShoppingLilstsSlice } from "./slices/shoppingListsSlice";

export type AppState = ShoppingLilstsSlice;

export const useAppStore = create<AppState>((...args) => ({
    ...createShoppingListsSlice(...args),
}))