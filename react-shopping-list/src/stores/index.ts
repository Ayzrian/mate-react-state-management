import { create } from "zustand";
import { createShoppingListsSlice, ShoppingLilstsSlice } from "./slices/shoppingListsSlice";
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

export type AppState = ShoppingLilstsSlice;

export const useAppStore = create<
    AppState,
    [["zustand/devtools", never], ["zustand/immer", never]]
>(
    devtools(
        immer((...args) => ({
            ...createShoppingListsSlice(...args),
        }))
    )
)