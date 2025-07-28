import { create } from "zustand";
import { createShoppingListsSlice, ShoppingLilstsSlice } from "./slices/shoppingListsSlice";
import { immer } from 'zustand/middleware/immer'

export type AppState = ShoppingLilstsSlice;

export const useAppStore = create<AppState, [["zustand/immer", never]]>(immer((...args) => ({
    ...createShoppingListsSlice(...args),
})))