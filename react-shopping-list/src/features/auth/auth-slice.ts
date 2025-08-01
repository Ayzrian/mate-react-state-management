import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticate } from "../../services/AuthService";

export const login = createAsyncThunk<
    { token: string },
    { username: string, password: string }
>('auth/login', async ({ username, password }) => {
    const { token } = await authenticate(username, password);
    localStorage.setItem('token', token);

    return { token };
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        error: '',
        token: localStorage.getItem('token') || '',
    },
    reducers: {},
    selectors: {
        selectLoggedIn: (state) => !!state.token,
        selectToken: (state) => state.token,
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.loading = false;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false; 
                state.error = 'Login failed!'
            });
    }
});

export const { selectLoggedIn, selectToken } = authSlice.selectors;