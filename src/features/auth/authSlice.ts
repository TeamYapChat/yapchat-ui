import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: {id: string; email: string} | null;
    token: string | null;
}

const initialState : AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{user: {id: string; email: string}; token: string}>) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
        setUser(state, action: PayloadAction<{user: {id: string; email: string}; token: string}>) {
            state.user = action.payload.user;
        },
        setToken(state, action: PayloadAction<{user: {id: string; email: string}; token: string}>) {
            state.token = action.payload.token;
        },
    }
})

export const { login, logout, setUser, setToken } = authSlice.actions;

export default authSlice.reducer;