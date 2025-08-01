import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/auth-slice";
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineSlices(authSlice)

export const store = configureStore({
    reducer: rootReducer
})

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();