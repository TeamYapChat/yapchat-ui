import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { isTokenValid } from '../ultils/tokenUltils'; 
import { AuthResponse, LoginDataType } from '../../types/authType';
import authApis from '../../api/authApis';

// Type definitions
interface AuthState {
    isAuthenticated: boolean;
    user: {id: string; email: string} | null;
    isLoading: boolean;
    error: string | null;
}

// Initial state
const initialState : AuthState = {
    isAuthenticated: isTokenValid(localStorage.getItem('token')) ? true : false,
    user: null,
    isLoading: false,
    error: null,
}

// Async thunk for login
export const fetchAsyncLoginUsers = createAsyncThunk<AuthResponse,LoginDataType>(
    'auth/login',
    async (loginData: LoginDataType) => {
        const response = await authApis.login(loginData) as AuthResponse;
        return response;
    }
)

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout:(state) => {
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncLoginUsers.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAsyncLoginUsers.fulfilled, (state, action:  PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            if (action.payload.dataResult?.accessToken) {
                localStorage.setItem('token', action.payload.dataResult.accessToken);
                state.isAuthenticated = true;
            } else {
                state.error = "Access token is missing";
            }
        });
        builder.addCase(fetchAsyncLoginUsers.rejected, (state, action) => {
            state.error = action.error.message || 'Failed to login';
            state.isLoading = false;
            state.isAuthenticated = false;
        });
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;