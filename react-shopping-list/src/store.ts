import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { shoppingListsApi } from "./features/shopping-lists/shopping-lists-api-slice";

const rootReducer = combineSlices(authSlice, shoppingListsApi);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shoppingListsApi.middleware)
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();