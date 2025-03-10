import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { isTokenValid } from "../ultils/tokenUltils";
import {
  AuthResponse,
  LoginDataType,
  RegisterDataType,
  RegisterResponse,
} from "../../types/authType";
import authApis from "../../api/authApis";
import { UserCredentialsData } from "../../types/userData";

// Type definitions
interface AuthState {
  isAuthenticated: boolean;
  user: UserCredentialsData | null;
  isLoading: boolean;
  isUploadingProfile: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: isTokenValid(localStorage.getItem("token")) ? true : false,
  user: null,
  isLoading: false,
  isUploadingProfile: false,
  error: null,
};

// Async thunk for login
export const fetchAsyncLoginUsers = createAsyncThunk<
  AuthResponse,
  LoginDataType,
  { rejectValue: { message: string; result: boolean } }
>("auth/login", async (loginData: LoginDataType) => {
  const response = await authApis.login(loginData);
  return response;
});

// Async thunk for register
export const fetchAsyncRegisterUsers = createAsyncThunk<
  RegisterResponse,
  RegisterDataType
>("auth/register", async (registerData: RegisterDataType) => {
  const response = (await authApis.signup(registerData)) as RegisterResponse;
  return response;
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    },
    acceptLogin: (state) => {
      return {
        ...state,
        isAuthenticated: true,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLoginUsers.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(
      fetchAsyncLoginUsers.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.success && "data" in action.payload) {
          const accessToken = action.payload.data;
          if (accessToken) {
            localStorage.setItem("token", accessToken);
            state.isAuthenticated = true;
          } else {
            state.error = "Access token is missing";
          }
        } else {
          state.error = action.payload.message || "Authentication failed";
        }
      }
    );
    builder.addCase(fetchAsyncLoginUsers.rejected, (state, action) => {
      if (
        action.payload &&
        typeof action.payload === "object" &&
        "message" in action.payload
      ) {
        state.error = action.payload.message as string;
      } else {
        state.error = action.error.message || "Failed to authenticate";
      }
      state.isLoading = false;
      state.isAuthenticated = false;
    });
    builder.addCase(fetchAsyncRegisterUsers.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(
      fetchAsyncRegisterUsers.fulfilled,
      (state, action: PayloadAction<RegisterResponse>) => {
        state.isLoading = false;
        if (action.payload.success && "data" in action.payload) {
          const userData = action.payload.data;
          if (userData) {
            state.user = userData;
          } else {
            state.error = "User data is missing";
          }
        } else {
          state.error = action.payload.message || "Registration failed";
        }
      }
    );
    builder.addCase(fetchAsyncRegisterUsers.rejected, (state, action) => {
      state.error = action.error.message || "Failed to register";
      state.isLoading = false;
    });
  },
});

export const { logout, acceptLogin } = authSlice.actions;

export default authSlice.reducer;
